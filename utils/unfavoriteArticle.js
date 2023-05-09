import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const unfavoriteArticle = async (currentUser, article) => {
    if (!currentUser) return;

    try {
        const userRef = doc(db, 'favoritedArticles', currentUser.email);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const { articles } = userDoc.data();
            const updatedArticles = articles.filter(item => item.url !== article.url);

            await updateDoc(userRef, { articles: updatedArticles });
        }
    } catch (error) {
        console.error('Error unfavoriting article:', error);
    }
};
