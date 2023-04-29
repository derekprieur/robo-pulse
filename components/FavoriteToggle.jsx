import React from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const FavoriteToggle = ({ articleUrl, favoritedArticles, handleFavoriteToggle, currentUser }) => {
    return (
        <button
            className="text-primary dark:text-white text-2xl"
            onClick={() => {
                if (currentUser) {
                    handleFavoriteToggle(articleUrl);
                } else {
                    toast.error('Please sign in to favorite an article.');
                }
            }}
        >
            {favoritedArticles.has(articleUrl) ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
    );
};

export default FavoriteToggle;
