import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import { db } from '../firebaseConfig';
import { Button, CommentCard } from '.';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const user = useSelector((state) => state.user.currentUser);
    const article = useSelector((state) => state.article.currentArticle);
    const articleTitle = article.title;

    const fetchComments = async () => {
        const q = query(collection(db, 'comments'), where('articleTitle', '==', articleTitle));
        const querySnapshot = await getDocs(q);
        const fetchedComments = [];
        querySnapshot.forEach((doc) => { fetchedComments.push(doc.data()); });
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
                    userId: user.email, text: commentText, displayName: user.displayName, photoURL: user.photoURL, articleTitle: articleTitle,
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
                    <CommentCard key={index} comment={comment} />
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <textarea className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded" rows="4" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                <Button text='Submit' btnPosition='text-left' />
            </form>
        </div>
    );
};

export default Comments;
