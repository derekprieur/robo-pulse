import React, { useState } from 'react';
import Image from 'next/image';

const ArticleCard = ({ title, imageUrl, summary, date }) => {
    return (
        <div className="border rounded-lg p-4">
            <Image src={imageUrl} alt={title} width={250} height={150} className="object-cover rounded w-full" />
            <h3 className="text-xl font-bold mt-4">{title}</h3>
            <p className="text-gray-600 text-sm mb-2">{date}</p>
            <p className="text-gray-800">{summary}</p>
        </div>
    );
};

const RecentArticles = () => {
    const [sortOption, setSortOption] = useState('latest');

    // Sample articles data, replace this with API call or data from props
    const articles = [
        {
            title: 'Article 1',
            imageUrl: '/article-image.png',
            summary: 'This is a summary of Article 1.',
            date: 'April 22, 2023',
        },
        {
            title: 'Article 2',
            imageUrl: '/article-image.png',
            summary: 'This is a summary of Article 2.',
            date: 'April 21, 2023',
        },
        {
            title: 'Article 3',
            imageUrl: '/article-image.png',
            summary: 'This is a summary of Article 3.',
            date: 'April 20, 2023',
        },
    ];

    return (
        <div className="container mx-auto my-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Recent Articles</h2>
                <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2">Sort by:</label>
                    <select
                        name="sort"
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded-lg p-2"
                    >
                        <option value="latest">Latest</option>
                        <option value="popular">Popular</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </div>
            <div className="text-center mt-8">
                <button className="bg-[#28a8cf] hover:bg-[#28a8cf]/80 px-6 py-2 rounded-lg text-white xl:text-xl">Show More</button>
            </div>
        </div>
    );

};

export default RecentArticles;
