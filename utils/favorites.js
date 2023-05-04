import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { addFavoritedArticle, removeFavoritedArticle } from '../redux/favoritesSlice';

export const saveFavoritedArticles = async (article, currentUser, add) => {
    if (!currentUser) return;

    try {
        const userRef = doc(db, 'favoritedArticles', currentUser.email);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(userRef, { articles: [] });
        }

        if (add) {
            await updateDoc(userRef, {
                articles: arrayUnion(article)
            });
        } else {
            const articles = userDoc.data().articles;
            const updatedArticles = articles.filter(
                (favArticle) => favArticle.url !== article.url
            );
            await updateDoc(userRef, {
                articles: updatedArticles
            });
        }
    } catch (error) {
        console.error('Error saving favorited articles:', error);
    }
};



export const handleFavoriteToggle = (articleUrl, dispatch, currentUser, filteredArticles, favoritedArticles, categoryArticles) => {
    let article;
    if (categoryArticles) {
        article = categoryArticles.find((article) => article.url === articleUrl);
    } else {
        article = filteredArticles.find((article) => article.url === articleUrl);
    }
    console.log('article', article)
    if (!article) return;
    console.log('test')

    if (currentUser) {

        const userFavoritedArticles = favoritedArticles ?? [];
        const articleExistsInFavorites = userFavoritedArticles.some(
            (favArticle) => favArticle.url === articleUrl
        );

        if (articleExistsInFavorites) {
            const articleToRemove = userFavoritedArticles.find((favArticle) => favArticle.url === articleUrl);
            dispatch(removeFavoritedArticle(articleToRemove));
            saveFavoritedArticles(articleToRemove, currentUser, false);
        } else {
            dispatch(addFavoritedArticle(article));
            saveFavoritedArticles(article, currentUser, true);
        }
    }
};