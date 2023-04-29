import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import { auth, db } from '../firebaseConfig';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const user = useSelector((state) => state.user.currentUser);
    const article = useSelector((state) => state.article.currentArticle);
    const articleTitle = article.title;

    const fetchComments = async () => {
        const q = query(
            collection(db, 'comments'),
            where('articleTitle', '==', articleTitle)
        );
        const querySnapshot = await getDocs(q);
        const fetchedComments = [];
        querySnapshot.forEach((doc) => {
            fetchedComments.push(doc.data());
        });
        setComments(fetchedComments);
    };

    useEffect(() => {
        fetchComments();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim() && user) {
            try {
                await addDoc(collection(db, 'comments'), {
                    userId: user.email,
                    text: commentText,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    articleTitle: articleTitle,
                });
                setCommentText('');
                fetchComments();
            } catch (e) {
                console.error('Error adding comment:', e);
            }
        }
        else {
            console.log('no user')
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-primary dark:text-white text-2xl font-semibold mb-4">Comments</h2>
            <ul className="mb-6 space-y-4">
                {comments.map((comment, index) => (
                    <li key={index} className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-white dark:bg-gray-800">
                        <div className="flex items-center space-x-2 mb-2">
                            <img src={comment.photoURL} alt={comment.displayName} className="w-8 h-8 rounded-full" />
                            <span className="font-semibold">{comment.displayName}</span>
                        </div>
                        <p>{comment.text}</p>
                    </li>
                ))}
            </ul>
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
        </div>
    );
};

export default Comments;
