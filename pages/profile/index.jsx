import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../utils/formatDate';
import { fetchFavoritedArticles } from '../../utils/fetchFavoritedArticles';
import { setFavoritedArticles } from '../../redux/favoritesSlice';

const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const favoritedArticles = useSelector((state) => state.favorites.favoritedArticles);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            fetchFavoritedArticles(currentUser)
                .then((favoritedArticlesArray) => {
                    favoritedArticlesArray.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                    dispatch(setFavoritedArticles(favoritedArticlesArray));
                })
                .catch((error) => {
                    console.error('Error fetching favorited articles:', error);
                    dispatch(setFavoritedArticles([]));
                });
        } else {
            dispatch(setFavoritedArticles([]));
        }
    }, [currentUser]);

    if (!currentUser) {
        return (
            <div className="text-center">
                <h1>Please sign in to view your profile.</h1>
            </div>
        );
    }

    return (
        <div className='dark:bg-gray-900'>
            <div className="container mx-auto py-10 px-4 min-h-screen">
                <h1 className="text-3xl font-semibold mb-8 dark:text-white">Favorited Articles</h1>
                {favoritedArticles.length === 0 ? (
                    <div className="text-center text-xl">
                        You have not favorited any articles yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {favoritedArticles.map((article, index) => (
                            <div
                                key={article.url + index}
                                className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 flex flex-col justify-between"
                            >
                                <div>
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 flex flex-col justify-between">
                                        <h2 className="text-primary dark:text-white text-xl font-semibold mb-2">
                                            {article.title}
                                        </h2>
                                        <p className="dark:text-white">{article.description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between px-4 pb-2">
                                    <p className="text-secondary dark:text-white">
                                        {formatDate(article.publishedAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
