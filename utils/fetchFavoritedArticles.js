import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const fetchFavoritedArticles = async (currentUser) => {
    if (!currentUser) return [];

    try {
        const userRef = doc(db, 'favoritedArticles', currentUser.email);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const { articles } = userDoc.data();
            return articles;
        }
    } catch (error) {
        console.error('Error fetching favorited articles:', error);
    }

    return [];
};
