import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const saveFavoritedArticles = async (favoritedArticleUrls, currentUser, filteredArticles) => {
    if (!currentUser) return;

    const favoritedArticlesArray = filteredArticles.filter((article) => favoritedArticleUrls.has(article.url));

    try {
        const userRef = doc(db, 'favoritedArticles', currentUser.email);
        await setDoc(userRef, { articles: favoritedArticlesArray }, { merge: true });
    } catch (error) {
        console.error('Error saving favorited articles:', error);
    }
};

export const handleFavoriteToggle = (articleUrl, favoritedArticles, setFavoritedArticles, currentUser, filteredArticles) => {
    setFavoritedArticles((prevState) => {
        const newState = new Set(prevState);
        if (newState.has(articleUrl)) {
            newState.delete(articleUrl);
        } else {
            newState.add(articleUrl);
        }
        console.log('Filtered articles:', filteredArticles);
        saveFavoritedArticles(newState, currentUser, filteredArticles);
        return newState;
    });
};

