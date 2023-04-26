import axios from 'axios';

export const fetchArticles = async (urls, storageKey) => {
    try {
        const responses = await Promise.all(urls.map((url) => axios.get(url)));

        const combinedArticles = responses.flatMap((response) => response.data.articles);
        const sortedArticles = combinedArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        const validArticles = sortedArticles.filter((article) => article.urlToImage && article.urlToImage !== '');

        localStorage.setItem(storageKey, JSON.stringify(validArticles));
        localStorage.setItem(`${storageKey}_fetchTimestamp`, Date.now());

        return validArticles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};
