import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setCurrentArticle } from '../redux/articleSlice';

export const openArticle = (article) => {
    const router = useRouter();
    const dispatch = useDispatch();
    dispatch(setCurrentArticle(article));
    router.push('/article-details');
};
