import React from 'react';

const ShowMoreButton = ({ onClick }) => {
    return (
        <div className="text-center mt-6">
            <button
                onClick={onClick}
                className="bg-primary dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-primary/80 dark:hover:bg-gray-400 px-6 py-2 rounded font-semibold transition-colors duration-300"
            >
                Show more
            </button>
        </div>
    );
};

export default ShowMoreButton;