import React from 'react'

const CommentCard = ({ key, comment }) => {
    return (
        <li key={key} className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-2 mb-2">
                <img src={comment.photoURL} alt={comment.displayName} className="w-8 h-8 rounded-full" />
                <span className="font-semibold dark:text-white">{comment.displayName}</span>
            </div>
            <p className='dark:text-white'>{comment.text}</p>
        </li>
    )
}

export default CommentCard