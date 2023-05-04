import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Sidebar, EverythingSearch, FavoriteToggle, ArticleCard } from '../components';
import { fetchArticles } from '../utils/fetchArticles';
import { fetchFavoritedArticles } from '../utils/fetchFavoritedArticles';
import { handleSearch } from '../utils/handleSearch';
import { handleFilter } from '../utils/handleFilter';
import { setFavoritedArticles } from '../redux/favoritesSlice';
import { removeDuplicateTitles } from '../utils/removeDuplicateTitles';
import { setFilteredArticles } from '../redux/articleSlice';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const activeFilters = useSelector((state) => state.filters.activeFilters);
  const filteredArticles = useSelector((state) => state.article.filteredArticles);
  const dispatch = useDispatch();

  const handleSearchWrapper = (searchTerm) => {
    handleSearch(searchTerm, articles, dispatch);
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
    const urlRobot = `/api/news?query=robot&sortBy=publishedAt&from=${fromDateString}`;
    const urlAI = `/api/news?query=artificial+intelligence&sortBy=publishedAt&from=${fromDateString}`;
    const storageKey = 'topHeadlines';

    const storedArticles = JSON.parse(localStorage.getItem(storageKey));
    const fetchTimestamp = localStorage.getItem(`${storageKey}_fetchTimestamp`);

    if (
      storedArticles &&
      fetchTimestamp &&
      Date.now() - parseInt(fetchTimestamp) < 600 * 1000
    ) {
      const filteredStoredArticles = filterByKeywords(storedArticles);
      const uniqueFilteredStoredArticles = removeDuplicateTitles(filteredStoredArticles);
      setArticles(uniqueFilteredStoredArticles);
      dispatch(setFilteredArticles(uniqueFilteredStoredArticles));
    } else {
      fetchArticles([urlRobot, urlAI], storageKey).then((articles) => {
        const filteredFetchedArticles = filterByKeywords(articles);
        const uniqueFilteredFetchedArticles = removeDuplicateTitles(filteredFetchedArticles);
        setArticles(uniqueFilteredFetchedArticles);
        dispatch(setFilteredArticles(uniqueFilteredFetchedArticles));
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
    const filtered = handleFilter(articles, activeFilters);
    dispatch(setFilteredArticles(filtered));
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
                  <ArticleCard article={article} index={index} />
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
