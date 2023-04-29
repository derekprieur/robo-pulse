import React, { useState } from 'react';

const Categories = () => {
    const categoriesData = [
        {
            id: 1,
            name: 'Robotics',
            query: 'robot',
        },
        {
            id: 2,
            name: 'Artificial Intelligence',
            query: 'artificial%20intelligence',
        },
        {
            id: 3,
            name: 'Machine Learning',
            query: 'machine%20learning',
        },
        {
            id: 4,
            name: 'Automation',
            query: 'automation',
        },
    ];

    const [articles, setArticles] = useState([]);

    const fetchCategoryArticles = async (query) => {
        const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        setArticles(data.articles);
    };

    return (
        <div className="bg-background dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoriesData.map((category) => (
                        <div
                            key={category.id}
                            className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-4 cursor-pointer"
                            onClick={() => fetchCategoryArticles(category.query)}
                        >
                            <h2 className="text-primary dark:text-white text-xl font-semibold mb-2">{category.name}</h2>
                        </div>
                    ))}
                </div>
                {articles?.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-primary dark:text-white text-2xl font-semibold mb-4">Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, index) => (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
