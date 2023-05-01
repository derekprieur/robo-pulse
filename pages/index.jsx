import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { Sidebar, EverythingSearch, FavoriteToggle } from '../components';
import { fetchArticles } from '../utils/fetchArticles';
import { fetchFavoritedArticles } from '../utils/fetchFavoritedArticles';
import { handleFavoriteToggle } from '../utils/favorites';
import { openArticle } from '../utils/openArticle';
import { handleImageError } from '../utils/handleImageError';
import { handleSearch } from '../utils/handleSearch';
import { handleFilter } from '../utils/handleFilter';
import { setFavoritedArticles } from '../redux/favoritesSlice';
import { formatDate } from '../utils/formatDate';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const favoritedArticles = useSelector((state) => state.favorites.favoritedArticles);
  const currentUser = useSelector((state) => state.user.currentUser);
  const activeFilters = useSelector((state) => state.filters.activeFilters);
  const router = useRouter();
  const dispatch = useDispatch();

  const openArticleWrapper = (article) => {
    openArticle(article, router, dispatch);
  };

  const handleImageErrorWrapper = (index) => {
    handleImageError(index, setFilteredArticles);
  };

  const handleSearchWrapper = (searchTerm) => {
    handleSearch(searchTerm, articles, setFilteredArticles);
  };

  const filterByKeywords = (articles) => {
    const keywords = ['robot', 'robotics', 'artificial intelligence', 'machine learning', 'automation',];

    return articles.filter((article) => {
      const title = article.title ? article.title.toLowerCase() : '';
      const description = article.description ? article.description.toLowerCase() : '';

      return keywords.some((keyword) => title.includes(keyword) || description.includes(keyword));
    });
  };

  useEffect(() => {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    const fromDateString = fromDate.toISOString().split('T')[0];
    const urlRobot = `https://newsapi.org/v2/everything?q=robot&sortBy=publishedAt&from=${fromDateString}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&language=en`;
    const urlAI = `https://newsapi.org/v2/everything?q=artificial+intelligence&sortBy=publishedAt&from=${fromDateString}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&language=en`;
    const storageKey = 'topHeadlines';

    const storedArticles = JSON.parse(localStorage.getItem(storageKey));
    const fetchTimestamp = localStorage.getItem(`${storageKey}_fetchTimestamp`);

    if (
      storedArticles &&
      fetchTimestamp &&
      Date.now() - parseInt(fetchTimestamp) < 600 * 1000
    ) {
      const filteredStoredArticles = filterByKeywords(storedArticles);
      setArticles(filteredStoredArticles);
      setFilteredArticles(filteredStoredArticles);
    } else {
      fetchArticles([urlRobot, urlAI], storageKey).then((articles) => {
        const filteredFetchedArticles = filterByKeywords(articles);
        setArticles(filteredFetchedArticles);
        setFilteredArticles(filteredFetchedArticles);
      });
    }

    if (currentUser) {
      fetchFavoritedArticles(currentUser)
        .then((favoritedArticlesArray) => {
          dispatch(setFavoritedArticles(favoritedArticlesArray));
        })
        .catch((error) => {
          console.error('Error fetching favorited articles:', error);
          dispatch(setFavoritedArticles([]));
        });
    } else {
      dispatch(setFavoritedArticles([]));
    }
  }, [currentUser, activeFilters, dispatch]);


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
            <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">Breaking News</h1>
            {filteredArticles.length === 0 ? (
              <div className="text-center text-secondary dark:text-white text-xl">
                No articles found for the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredArticles.slice(0, 6).map((article, index) => (
                  <div key={article.url + index} className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 flex flex-col justify-between">
                    <div>
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => openArticleWrapper(article)}
                        onError={() => handleImageErrorWrapper(index)}
                      />
                      <div className="p-4 flex flex-col justify-between">
                        <h2 className="text-primary dark:text-white text-xl font-semibold mb-2 cursor-pointer" onClick={() => openArticleWrapper(article)}>
                          {article.title}
                        </h2>
                        <p className="dark:text-white">{article.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-between px-4 pb-2">
                      <p className="text-secondary dark:text-white">{formatDate(article.publishedAt)}</p>
                      <FavoriteToggle articleUrl={article.url} favoritedArticles={favoritedArticles} handleFavoriteToggle={(articleUrl, dispatch, currentUser, filteredArticles, favoritedArticles) =>
                        handleFavoriteToggle(articleUrl, dispatch, currentUser, filteredArticles, favoritedArticles)
                      }
                        currentUser={currentUser}
                        dispatch={dispatch}
                        filteredArticles={filteredArticles}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='col-span-3'>
            <EverythingSearch favoritedArticles={favoritedArticles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
