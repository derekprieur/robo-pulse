import React, { useEffect, useState } from 'react';

import { fetchArticles } from '../utils/fetchArticles';
import { handleFilter } from '../utils/handleFilter';
import { useSelector } from 'react-redux';

const EverythingSearch = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState(4);
    const activeFilters = useSelector((state) => state.filters);

    const showMoreArticles = () => {
        setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 4);
    };

    useEffect(() => {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 30);
        const fromDateString = fromDate.toISOString().split('T')[0];

        const robotUrl = `https://newsapi.org/v2/everything?q=robot&sortBy=publishedAt&from=${fromDateString}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&language=en`;
        const aiUrl = `https://newsapi.org/v2/everything?q=artificial+intelligence&sortBy=publishedAt&from=${fromDateString}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&language=en`;

        const storageKey = 'everythingSearch';

        const storedArticles = JSON.parse(localStorage.getItem(storageKey));
        const fetchTimestamp = localStorage.getItem(`${storageKey}_fetchTimestamp`);

        if (
            storedArticles &&
            fetchTimestamp &&
            Date.now() - parseInt(fetchTimestamp) < 60 * 1000
        ) {
            setArticles(storedArticles);
        } else {
            console.log('Fetching articles from API');
            fetchArticles([robotUrl, aiUrl], storageKey).then((articles) => {
                localStorage.setItem(`${storageKey}_fetchTimestamp`, Date.now());
                setArticles(articles);
            });
        }
    }, []);


    useEffect(() => {
        handleFilter(articles, setFilteredArticles, activeFilters);
    }, [articles, activeFilters]);


    return (
        <div className="w-full">
            <h2 className="text-primary dark:text-white text-3xl font-semibold mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredArticles.slice(0, visibleArticles).map((article, index) => (
                    <div key={index} className="col-span-4 md:col-span-1 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-48 object-cover cursor-pointer"
                        />
                        <div className="p-4">
                            <h3 className="text-primary dark:text-white text-xl font-semibold mb-2">{article.title}</h3>
                            <p className="dark:text-white">{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {visibleArticles < articles.length && (
                <div className="text-center mt-6">
                    <button
                        onClick={showMoreArticles}
                        className="bg-primary text-white px-6 py-2 rounded font-semibold"
                    >
                        Show more
                    </button>
                </div>
            )}
        </div>
    );
};

export default EverythingSearch;
