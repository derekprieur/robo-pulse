import React, { useEffect, useState } from 'react';

import { categoriesData } from '../../constants/categories';
import { ShowMoreButton } from '../../components';

const Categories = () => {
    const [articles, setArticles] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('Robotics')
    const [visibleArticles, setVisibleArticles] = useState(6);

    const fetchCategoryArticles = async (query) => {
        const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.articles);
    };

    useEffect(() => {
        fetchCategoryArticles('robot');
    }, [])

    const showMoreArticles = () => {
        setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 6);
    };

    return (
        <div className="bg-background dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoriesData.map((category) => (
                        <div
                            key={category.id + category.name}
                            className={`rounded-lg overflow-hidden shadow-md p-4 cursor-pointer ${currentCategory === category.name ? 'bg-primary dark:bg-gray-600 text-white dark:text-gray-200' : 'bg-white dark:bg-gray-800 text-primary dark:text-white'
                                }`}
                            onClick={() => {
                                setCurrentCategory(category.name);
                                fetchCategoryArticles(category.query)
                            }}
                        >
                            <h2 className="dark:text-white text-xl font-semibold mb-2">{category.name}</h2>
                        </div>
                    ))}
                </div>
                {articles?.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-primary dark:text-white text-2xl font-semibold mb-4">Articles for {currentCategory}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.slice(0, visibleArticles).map((article, index) => (
                                <div key={index} className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-primary dark:text-white text-xl font-semibold mb-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-secondary dark:text-white">{article.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {visibleArticles < articles.length && (
                            <ShowMoreButton onClick={showMoreArticles} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
