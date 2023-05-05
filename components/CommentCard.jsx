import React from 'react'

import { formatDate } from '../utils/formatDate'

const CommentCard = ({ key, comment }) => {
    const unixTimestamp = 1683210582;
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    const isoString = date.toISOString();

    return (
        <li key={key} className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-2 mb-2">
                <img src={comment.photoURL} alt={comment.displayName} className="w-8 h-8 rounded-full" />
                <span className="font-semibold dark:text-white">{comment.displayName}</span>
            </div>
            {comment.timestamp && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {formatDate(isoString)}
                </p>
            )}
            <p className='dark:text-white'>{comment.text}</p>
        </li>
    )
}

export default CommentCard