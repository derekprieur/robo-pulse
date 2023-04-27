import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const saveFavoritedArticles = async (favoritedArticles, currentUser, filteredArticles) => {
    if (!currentUser) return;

    const favoritedArticlesArray = Object.keys(favoritedArticles).map((index) => filteredArticles[index]);

    try {
        const userRef = doc(db, 'favoritedArticles', currentUser.email);
        await setDoc(userRef, { articles: favoritedArticlesArray }, { merge: true });
    } catch (error) {
        console.error('Error saving favorited articles:', error);
    }
};

export const handleFavoriteToggle = (index, favoritedArticles, setFavoritedArticles, currentUser, filteredArticles) => {
    setFavoritedArticles((prevState) => {
        const newState = { ...prevState };
        if (newState[index]) {
            delete newState[index];
        } else {
            newState[index] = true;
        }
        saveFavoritedArticles(newState, currentUser, filteredArticles);
        return newState;
    });
};
