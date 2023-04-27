import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

export const fetchFavoritedArticles = async (currentUser) => {
    if (!currentUser) return new Set();

    try {
        const userRef = doc(db, 'favoritedArticles', currentUser.email);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const { articles } = userDoc.data();
            const favoritedArticlesSet = new Set();
            articles.forEach((article, index) => {
                favoritedArticlesSet[index] = true;
            });
            return favoritedArticlesSet;
        }
    } catch (error) {
        console.error('Error fetching favorited articles:', error);
    }

    return new Set();
};
