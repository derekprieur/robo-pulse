import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = window.localStorage.getItem('theme');
        if (currentTheme && currentTheme === 'dark') {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            window.localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            window.localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
