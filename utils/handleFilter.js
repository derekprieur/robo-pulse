import { getCategory } from './getCategory';

export const handleFilter = (activeFilters, articles, setFilteredArticles) => {
    const activeFiltersSet = new Set(Object.values(activeFilters));
    const validArticles = articles.filter(article => article);
    const filterResults = validArticles.filter((article) => {
        const articleCategory = getCategory(article.title, article.description);
        return activeFiltersSet.size === 0 || activeFiltersSet.has(articleCategory);
    });
    setFilteredArticles(filterResults);
};
