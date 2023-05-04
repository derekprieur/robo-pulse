import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { formatDate } from '../utils/formatDate'
import { FavoriteToggle } from '.'
import { openArticle } from '../utils/openArticle';
import { handleImageError } from '../utils/handleImageError';
import { handleFavoriteToggle } from '../utils/favorites';

const ArticleCard = ({ article, index, categoryArticles }) => {
    const favoritedArticles = useSelector((state) => state.favorites.favoritedArticles);
    const currentUser = useSelector((state) => state.user.currentUser);
    const filteredArticles = useSelector((state) => state.article.filteredArticles);
    const dispatch = useDispatch();
    const router = useRouter();

    const openArticleWrapper = (article) => {
        openArticle(article, router, dispatch);
    };

    const handleImageErrorWrapper = (index) => {
        handleImageError(index, dispatch);
    };

    return (
        <div key={article.url + index} className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 flex flex-col justify-between">
            <div>
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openArticleWrapper(article)}
                    onError={() => handleImageErrorWrapper(index)}
                />
                <div className="p-4 flex flex-col justify-between">
                    <h2 className="text-primary dark:text-white text-xl font-semibold mb-2 cursor-pointer" onClick={() => openArticleWrapper(article)}>
                        {article.title}
                    </h2>
                    <p className="dark:text-white">{article.description}</p>
                </div>
            </div>
            <div className="flex justify-between px-4 pb-2">
                <p className="text-secondary dark:text-white">{formatDate(article.publishedAt)}</p>
                <FavoriteToggle articleUrl={article.url} favoritedArticles={favoritedArticles} handleFavoriteToggle={(articleUrl, dispatch, currentUser, filteredArticles, favoritedArticles) =>
                    handleFavoriteToggle(articleUrl, dispatch, currentUser, filteredArticles, favoritedArticles, categoryArticles)
                }
                    currentUser={currentUser}
                    dispatch={dispatch}
                    filteredArticles={filteredArticles}
                />
            </div>
        </div>
    )
}

export default ArticleCard