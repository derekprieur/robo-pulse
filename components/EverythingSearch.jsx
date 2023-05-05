import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import FavoriteToggle from './FavoriteToggle';
import { handleFavoriteToggle } from '../utils/favorites';
import { openArticle } from '../utils/openArticle';
import { formatDate } from '../utils/formatDate';
import { showMoreArticles } from '../utils/showMoreArticles';
import { Button } from '.';

const EverythingSearch = () => {
    const [visibleArticles, setVisibleArticles] = useState(4);
    const filteredArticles = useSelector((state) => state.article.filteredArticles);
    const favoritedArticles = useSelector((state) => state.favorites.favoritedArticles);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <div className="w-full">
            <h2 className="text-primary dark:text-white text-3xl font-semibold mb-8">More Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {filteredArticles.slice(6, 6 + visibleArticles).map((article, index) => (
                    <div key={article.url + index} className="col-span-4 md:col-span-1 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 flex flex-col justify-between">
                        <div>
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-48 object-cover cursor-pointer"
                                onClick={() => openArticle(article, router, dispatch)}
                            />
                            <div className="p-4">
                                <h3 className="text-primary dark:text-white text-xl font-semibold mb-2 cursor-pointer" onClick={() => openArticle(article, router, dispatch)}>{article.title}</h3>
                                <p className="dark:text-white">{article.description}</p>
                            </div>
                        </div>
                        <div className="flex justify-between px-4 pb-2">
                            <p className="text-secondary dark:text-white">{formatDate(article.publishedAt)}</p>
                            <FavoriteToggle
                                articleUrl={article.url}
                                favoritedArticles={favoritedArticles}
                                handleFavoriteToggle={(articleUrl) => {
                                    handleFavoriteToggle(articleUrl, dispatch, currentUser, filteredArticles, favoritedArticles);
                                }}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {visibleArticles < filteredArticles.length - 6 && (
                <Button onClick={() => showMoreArticles(setVisibleArticles, 4)} text='Show More' />
            )}
        </div>
    );
};

export default EverythingSearch;
