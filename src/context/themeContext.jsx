import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("isDarkMode");
        if (savedTheme !== null) {
            setIsDarkMode(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("isDarkMode", isDarkMode);

        if (isDarkMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [isDarkMode]);

    const switchTheme = () => {
        setIsDarkMode((prevTheme) => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}