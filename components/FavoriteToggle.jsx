import React from 'react'
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const FavoriteToggle = ({ favoritedArticles, handleFavoriteToggle, index, currentUser }) => {
    return (
        <button
            className="text-primary dark:text-white text-2xl"
            onClick={() => {
                if (currentUser) {
                    handleFavoriteToggle(index);
                } else {
                    toast.error('Please sign in to favorite an article.');
                }
            }}
        >
            {favoritedArticles[index] ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
    )
}

export default FavoriteToggle