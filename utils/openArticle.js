import { setCurrentArticle } from '../redux/articleSlice';

export const openArticle = (article, router, dispatch) => {
    dispatch(setCurrentArticle(article));
    router.push('/article-details');
};

