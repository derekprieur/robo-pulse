import React, { useEffect, useState } from 'react';

import { categoriesData } from '../../constants/categories';
import { ArticleCard, Button } from '../../components';
import { showMoreArticles } from '../../utils/showMoreArticles';

const Categories = () => {
    const [articles, setArticles] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('Robotics')
    const [visibleArticles, setVisibleArticles] = useState(6);

    const fetchCategoryArticles = async (query) => {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 30);
        const fromDateString = fromDate.toISOString().split('T')[0];
        const url = `/api/news?query=${query}&sortBy=publishedAt&from=${fromDateString}`;

        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.articles);
    };


    useEffect(() => {
        fetchCategoryArticles('robot');
    }, [])

    return (
        <div className="bg-background dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-56 lg:max-h-full overflow-y-scroll lg:overflow-y-visible hide-scrollbar">
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
                                <ArticleCard article={article} index={index} categoryArticles={articles} />
                            ))}
                        </div>
                        {visibleArticles < articles.length && (
                            <Button onClick={() => showMoreArticles(setVisibleArticles, 6)} text='Show More' />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
