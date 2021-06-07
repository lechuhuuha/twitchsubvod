import React, { useEffect, useState } from 'react';

// import { ThemeProvider } from 'styled-components';
// import { darkTheme, lightTheme } from './components/themes';
import GlobalStyle from './GlobalStyle';
import Routes from './routes';
import './components/css-vars.css';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import SavedSearched from './components/savedSearched';
import init, { setLocalStorage } from './services/localStorage';

function App() {
  const [storageUpdate, setStorageUpdate] = useState(false);
  const routeUpdate = () => {
    console.log('user search updated');
    setStorageUpdate(true);
  };
  return (
    <>
      <ThemeToggler />
      {storageUpdate && <SavedSearched />}
      <GlobalStyle />
      <Routes update={routeUpdate} />
    </>
  );
}

export default App;
