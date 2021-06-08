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
  const [render, setRender] = useState(false);
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  const routeUpdate = () => {
    setRender(!render);
    setReRender(!reRender);
  };
  const [seletedVal, setSelectedVal] = useState('');

  return (
    <>
      <ThemeToggler />
      {(render || reRender) && (
        <SavedSearched onSelect={setSelectedVal} onUpdate={routeUpdate} />
      )}
      <GlobalStyle />
      <Routes update={routeUpdate} selectedVal={seletedVal} />
    </>
  );
}

export default App;
