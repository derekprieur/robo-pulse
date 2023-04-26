import React, { useState } from 'react';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            setComments([...comments, commentText]);
            setCommentText('');
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-primary dark:text-white text-2xl font-semibold mb-4">Comments</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded"
                    rows="4"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="bg-primary dark:bg-secondary text-white font-semibold px-4 py-2 rounded">
                    Submit
                </button>
            </form>
            <ul className="mt-6 space-y-4">
                {comments.map((comment, index) => (
                    <li key={index} className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-white dark:bg-gray-800">
                        {comment}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
