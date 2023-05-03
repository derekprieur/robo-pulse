export const handleFilter = (articles, activeFilters) => {
    const validArticles = articles.filter((article) => article);
    const filteredArticles = validArticles.filter((article) => {
        return activeFilters.length === 0 || activeFilters.some((filter) => {
            const lowerCaseFilter = filter.toLowerCase();
            return (
                article?.title?.toLowerCase().includes(lowerCaseFilter) ||
                article.description.toLowerCase().includes(lowerCaseFilter)
            );
        });
    });
    return filteredArticles;
};
