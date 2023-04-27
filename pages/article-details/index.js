import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaHeadphones } from 'react-icons/fa';

import { Comments } from '../../components';

const ArticleDetails = () => {
    const article = useSelector((state) => state.article.currentArticle);
    const [isPlaying, setIsPlaying] = useState(false);
    console.log(article, 'article')

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    const stopSpeaking = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
    };

    const readArticle = () => {
        if (isPlaying) {
            stopSpeaking();
        } else {
            const contentToRead = `${article.title}. ${article.content.split('…')[0]}`;
            speak(contentToRead);
        }
        setIsPlaying(!isPlaying);
    };

    console.log(article.content.split('..')[0], 'article')

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-background dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">{article.title}</h1>
                <div className="flex flex-col lg:flex-row">
                    <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 lg:w-1/2 lg:mr-4">
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-48 object-cover md:h-64 lg:h-80"
                        />
                        <div className="p-4 md:p-6">
                            <p className="text-secondary dark:text-white mb-2">Author: {article.author}</p>
                            <p className="text-secondary dark:text-white mb-2">Published at: {article.publishedAt}</p>
                            <p className="text-secondary dark:text-white mb-4">Source: {article.source.name}</p>
                            <p className="text-secondary dark:text-white mb-4">{article.content.split('…')[0]}...</p>
                            <div className='flex items-center justify-between'>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary font-semibold">
                                    Read more at {article.source.name}
                                </a>
                                <FaHeadphones className='text-xl text-primary cursor-pointer' onClick={readArticle} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0 lg:w-1/2">
                        <Comments />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ArticleDetails;
