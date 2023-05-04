import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilters, setSearchTerm } from '../redux/filtersSlice';

const Sidebar = ({ onSearch }) => {
    const categories = ['Robotics', 'Artificial Intelligence', 'Machine Learning', 'Automation'];
    const dispatch = useDispatch();
    const activeFilters = useSelector((state) => state.filters.activeFilters);
    const searchTerm = useSelector((state) => state.filters.searchTerm);

    const toggleFilter = (category) => {
        let newActiveFilters = [...activeFilters];
        const index = newActiveFilters.indexOf(category);
        if (index > -1) {
            newActiveFilters.splice(index, 1);
        } else {
            newActiveFilters.push(category);
        }
        dispatch(setActiveFilters(newActiveFilters));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch(setSearchTerm(value));
        onSearch(value);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-primary dark:text-white text-xl font-semibold mb-4">Search & Filters</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            />

            <h3 className="text-primary dark:text-white text-lg font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => toggleFilter(category)}
                        className={`px-3 py-1 m-1 rounded ${activeFilters.includes(category) ? 'bg-primary dark:bg-gray-600 text-white' : 'bg-white text-primary border border-primary'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
