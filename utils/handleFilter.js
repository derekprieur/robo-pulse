
export const handleFilter = (articles, setFilteredArticles, activeFilters) => {
    const validArticles = articles.filter(article => article);
    const filteredArticles = validArticles.filter((article) => {
        return activeFilters.length === 0 || activeFilters.some(filter => article?.title?.toLowerCase().includes(filter.toLowerCase()) || article.description.toLowerCase().includes(filter.toLowerCase()));

    });
    setFilteredArticles(filteredArticles);
};
