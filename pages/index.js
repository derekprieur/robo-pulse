import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setCurrentArticle } from '../redux/articleSlice';

import { Sidebar, EverythingSearch } from '../components';
import { fetchArticles } from '../utils/fetchArticles';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [favoritedArticles, setFavoritedArticles] = useState(new Set());
  const router = useRouter();
  const dispatch = useDispatch();

  console.log('articles', articles);

  const openArticle = (article) => {
    dispatch(setCurrentArticle(article));
    router.push('/article-details');
  };

  const handleImageError = (index) => {
    setFilteredArticles((prevState) => prevState.filter((_, i) => i !== index));
  };

  const getCategory = (title, description) => {
    const titleLowerCase = title.toLowerCase();
    const descriptionLowerCase = description.toLowerCase();
    const categories = ['Robotics', 'Artificial Intelligence', 'Machine Learning', 'Automation'];

    for (const category of categories) {
      const categoryLowerCase = category.toLowerCase();
      if (titleLowerCase.includes(categoryLowerCase) || descriptionLowerCase.includes(categoryLowerCase)) {
        return category;
      }
    }
    return null;
  };

  const handleSearch = (searchTerm) => {
    const searchResults = articles.filter((article) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchTermLowerCase) ||
        article.description.toLowerCase().includes(searchTermLowerCase)
      );
    });
    setFilteredArticles(searchResults);
  };


  const handleFilter = (activeFilters) => {
    const filterResults = articles.filter((article) => {
      const articleCategory = getCategory(article.title, article.description);
      return activeFilters.size === 0 || activeFilters.has(articleCategory);
    });
    setFilteredArticles(filterResults);
  };

  const handleFavoriteToggle = (index) => {
    setFavoritedArticles((prevState) => {
      const newState = { ...prevState };
      if (newState[index]) {
        delete newState[index];
      } else {
        newState[index] = true;
      }
      return newState;
    });
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
    } else {
      fetchArticles([urlRobot, urlAI], storageKey).then((articles) => {
        setArticles(articles);
        setFilteredArticles(articles);
      });
    }
  }, []);

  return (
    <div className="bg-background dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-3 md:col-span-1">
            <Sidebar onSearch={handleSearch} onFilter={handleFilter} />
          </div>
          <div className="col-span-3 md:col-span-2">
            <h1 className="text-primary dark:text-white text-3xl font-semibold mb-8">Top Headlines</h1>
            {filteredArticles.length === 0 ? (
              <div className="text-center text-secondary dark:text-white text-xl">
                No articles found for the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800" onClick={() => openArticle(article)}>
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onError={() => handleImageError(index)}
                    />
                    <div className="p-4">
                      <h2 className="text-primary dark:text-white text-xl font-semibold mb-2 cursor-pointer">{article.title}</h2>
                      <p className="dark:text-white">{article.description}</p>
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
