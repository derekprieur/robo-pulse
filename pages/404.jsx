import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
    return (
        <div className='h-screen w-full justify-center items-center flex flex-col dark:bg-gray-900'>
            <h1 className='text-3xl mb-4 dark:text-white'>404 - Page Not Found</h1>
            <Image src='/sad-robot.png' alt='Sad Robot' width={200} height={200} className='mb-4 rounded-xl' />
            <p className='mb-4 dark:text-white'>
                Oops! The page you're looking for doesn't exist. BEEP BOOP!
            </p>
            <Link href='/' className='text-blue-500 hover:text-blue-800'>
                Return to Home
            </Link>
        </div>
    );
};

export default Custom404;
