import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const FavoriteToggle = ({ articleUrl, favoritedArticles, handleFavoriteToggle, currentUser, dispatch, filteredArticles }) => {
    const isFavorited = Array.isArray(favoritedArticles) && favoritedArticles.some((article) => article.url === articleUrl);

    return (
        <button
            className="text-primary dark:text-white text-2xl"
            onClick={() => {
                if (currentUser) {
                    handleFavoriteToggle(articleUrl, dispatch, currentUser, filteredArticles, favoritedArticles);
                } else {
                    toast.error('Please sign in to favorite an article.');
                }
            }}
        >
            {isFavorited ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
    );
};

export default FavoriteToggle;
