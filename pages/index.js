import React from 'react';
import Image from 'next/image';
import { RecentArticles } from '../components';

const Home = () => {
  return (
    <div>
      <div className="relative w-full h-[50vh] xl:h-[70vh]">
        <Image
          src="/robohero.png"
          alt="Banner image"
          fill
          className='object-cover'
        />
        <div className="absolute inset-0 flex flex-col items-end justify-center text-white px-4 md:px-8 xl:px-44">
          <h1 className="text-4xl xl:text-7xl font-bold mb-4">Robo Pulse</h1>
          <p className="text-xl xl:text-2xl mb-4 w-[40%] text-right text-gray-300">AI-Powered Headlines: The Future of News</p>
          <button className="bg-[#28a8cf] hover:bg-[#28a8cf]/80 px-6 py-2 rounded-lg text-white xl:text-xl">Learn More</button>
        </div>
      </div>
      <RecentArticles />
    </div>
  );
};

export default Home;
