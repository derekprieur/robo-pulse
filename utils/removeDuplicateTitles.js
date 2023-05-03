export const removeDuplicateTitles = (articles) => {
    const uniqueTitles = new Set();
    return articles.filter((article) => {
        const title = article.title.toLowerCase();
        if (!uniqueTitles.has(title)) {
            uniqueTitles.add(title);
            return true;
        }
        return false;
    });
}
