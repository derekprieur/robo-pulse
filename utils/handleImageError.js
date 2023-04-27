export const handleImageError = (index, setFilteredArticles) => {
    setFilteredArticles((prevState) => prevState.filter((_, i) => i !== index));
};
