export const handleSearch = (searchTerm, articles, setFilteredArticles) => {
    const searchResults = articles.filter((article) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            article.title.toLowerCase().includes(searchTermLowerCase) ||
            article.description.toLowerCase().includes(searchTermLowerCase)
        );
    });
    setFilteredArticles(searchResults);
};
