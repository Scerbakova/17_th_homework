import React, { createContext, useState } from 'react';
import {
  HashRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import ReactSwitch from 'react-switch';
import './App.scss';
import Header from './components/Header/Header';
import CharacterPage from './Pages/Characters/CharacterPage';
import CharactersPage from './Pages/Characters/CharactersPage';
import EpisodePage from './Pages/Episodes/EpisodePage';
import EpisodesPage from './Pages/Episodes/EpisodesPage';
import HomePage from './Pages/Home/HomePage';
import LocationPage from './Pages/Locations/LocationPage';
import LocationsPage from './Pages/Locations/LocationsPage';
import Page404 from './Pages/Page404/Page404';

export const ThemeContext = createContext(null as any);

const App = () => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="wrapper" id={theme}>
        <div className="container">
          <Router>
            <Header />
            <div className="switch text-center">
              <span className="theme__title">Light </span>
              <ReactSwitch checked={theme === 'dark'} onChange={toggleTheme} />
              <span className="theme__title"> Dark </span>
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/characters/:id" element={<CharacterPage />} />
              <Route path="/episodes" element={<EpisodesPage />} />
              <Route path="/episodes/:id" element={<EpisodePage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/locations/:id" element={<LocationPage />} />
              <Route path="404" element={<Page404 />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
export default App;
