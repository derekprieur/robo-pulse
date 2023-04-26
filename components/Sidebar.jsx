import React, { useState } from 'react';

const Sidebar = ({ onSearch, onFilter }) => {
    const categories = ['Robotics', 'Artificial Intelligence', 'Machine Learning', 'Automation'];
    const [activeFilters, setActiveFilters] = useState(new Set());

    const toggleFilter = (category) => {
        const newActiveFilters = new Set(activeFilters);
        if (newActiveFilters.has(category)) {
            newActiveFilters.delete(category);
        } else {
            newActiveFilters.add(category);
        }
        setActiveFilters(newActiveFilters);
        onFilter(newActiveFilters);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-primary dark:text-white text-xl font-semibold mb-4">Search & Filters</h2>

            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            />

            <h3 className="text-primary dark:text-white text-lg font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => toggleFilter(category)}
                        className={`px-3 py-1 m-1 rounded ${activeFilters.has(category) ? 'bg-primary dark:bg-gray-900 text-white' : 'bg-white text-primary border border-primary'
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
