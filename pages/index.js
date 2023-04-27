import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Sidebar, EverythingSearch, FavoriteToggle } from '../components';
import { fetchArticles } from '../utils/fetchArticles';
import { fetchFavoritedArticles } from '../utils/fetchFavoritedArticles';
import { handleFavoriteToggle } from '../utils/favorites';
import { openArticle } from '../utils/openArticle';
import { handleImageError } from '../utils/handleImageError';
import { handleSearch } from '../utils/handleSearch';
import { handleFilter } from '../utils/handleFilter';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [favoritedArticles, setFavoritedArticles] = useState(new Set());
  console.log('articles', articles);
  console.log('filteredArticles', filteredArticles);
  const currentUser = useSelector((state) => state.user.currentUser);
  const activeFilters = useSelector((state) => state.filters);

  const openArticleWrapper = (article) => {
    openArticle(article);
  };

  const handleImageErrorWrapper = (index) => {
    handleImageError(index, setFilteredArticles);
  };

  const handleSearchWrapper = (searchTerm) => {
    handleSearch(searchTerm, articles, setFilteredArticles);
  };

  const handleFavoriteToggleWrapper = (index) => {
    handleFavoriteToggle(index, favoritedArticles, setFavoritedArticles, currentUser, filteredArticles);
  };


  useEffect(() => {
    const urlRobot = `https://newsapi.org/v2/top-headlines?q=robot&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    const urlAI = `https://newsapi.org/v2/top-headlines?q=artificial%20intelligence&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
    const storageKey = 'topHeadlines';

    const storedArticles = JSON.parse(localStorage.getItem(storageKey));
    const fetchTimestamp = localStorage.getItem(`${storageKey}_fetchTimestamp`);

    if (
      storedArticles &&
      fetchTimestamp &&
      Date.now() - parseInt(fetchTimestamp) < 60 * 1000
    ) {
      setArticles(storedArticles);
      setFilteredArticles(storedArticles);
      console.log('articles1', articles)
      console.log('filteredArticles1', filteredArticles)
    } else {
      fetchArticles([urlRobot, urlAI], storageKey).then((articles) => {
        console.log('articles from home fetch', articles);
        setArticles(articles);
        setFilteredArticles(articles);
      });
    }

    if (currentUser) {
      fetchFavoritedArticles(currentUser)
        .then((favoritedArticlesSet) => {
          setFavoritedArticles(favoritedArticlesSet);
        });
    }

  }, [currentUser, activeFilters]);

  useEffect(() => {
    handleFilter(articles, setFilteredArticles, activeFilters);
  }, [activeFilters, articles]);

  return (
    <div className="bg-background dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-3 md:col-span-1">
            <Sidebar onSearch={handleSearchWrapper} />
          </div>
          <div className="col-span-3 md:col-span-2">
            <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">Top Headlines</h1>
            {filteredArticles.length === 0 ? (
              <div className="text-center text-secondary dark:text-white text-xl">
                No articles found for the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredArticles.slice(0, 6).map((article, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => openArticleWrapper(article)}
                      onError={() => handleImageErrorWrapper(index)}
                    />
                    <div className="p-4">
                      <h2 className="text-primary dark:text-white text-xl font-semibold mb-2 cursor-pointer" onClick={() => openArticleWrapper(article)}>
                        {article.title}
                      </h2>
                      <p className="dark:text-white">{article.description}</p>
                      <div className="flex justify-end">
                        <FavoriteToggle index={index} favoritedArticles={favoritedArticles} handleFavoriteToggle={handleFavoriteToggleWrapper} currentUser={currentUser} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='col-span-3'>
            <EverythingSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
