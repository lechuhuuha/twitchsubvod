import React, { useEffect, useState } from 'react';

const ThemeToggler = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('@pogu: theme');

    if (savedTheme) {
      return savedTheme;
    }
    return 'dark';
  });
  useEffect(() => {
    localStorage.setItem('@pogu: theme', theme);
  }, [theme]);
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  return (
    <button
      style={{
        position: 'absolute',
        margin: 16,
        backgroundColor: 'transparent',
        fontSize: 24,
      }}
      onClick={() => setTheme(nextTheme)}
    >
      {theme === 'dark' ? '🌜' : '🌞'}
    </button>
  );
};

export default ThemeToggler;
