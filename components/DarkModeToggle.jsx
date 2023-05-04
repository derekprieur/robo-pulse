import React from 'react';
import { FaBatteryFull, FaBatteryEmpty } from 'react-icons/fa';

import { useDarkMode } from '../contexts/darkModeContext';

const DarkModeToggle = () => {
    const { darkMode, setDarkMode } = useDarkMode();

    return (
        <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
                <FaBatteryEmpty className="text-xl" />
            ) : (
                <FaBatteryFull className="text-xl" />
            )}
        </button>
    );
};

export default DarkModeToggle;
