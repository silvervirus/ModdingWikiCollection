import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home/Home';
import ModList from './ModList/ModList';
import ModderPage from './ModCircle/ModderPage';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mods/:game" element={<ModList />} />
        <Route path="/mods/:game/:Modder" element={<ModderPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
