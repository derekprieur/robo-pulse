import { setFilteredArticles } from '../redux/articleSlice';

export const handleSearch = (searchTerm, articles, dispatch) => {
    searchTerm = searchTerm.toLowerCase();

    const filtered = articles.filter((article) => {
        const title = article.title ? article.title.toLowerCase() : '';
        const description = article.description ? article.description.toLowerCase() : '';

        return title.includes(searchTerm) || description.includes(searchTerm);
    });
    dispatch(setFilteredArticles(filtered));
};