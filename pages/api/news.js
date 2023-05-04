import fetch from 'node-fetch';

const newsAPIKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export default async function handler(req, res) {
    const { query, sortBy, from } = req.query;

    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&sortBy=${sortBy}&from=${from}&apiKey=${newsAPIKey}&language=en`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
}
