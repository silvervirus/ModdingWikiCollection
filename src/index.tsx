import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import Home from './Home/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ModList from './ModList/ModList';

// Create a root for React to live at based on the "root" div
// Then render Home.tsx in it
// StrictMode is just a wrapper to help highlight issues
ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    { /* /mods/:game defines a pattern of /mods/ANYTHING where ANYTHING will be stored in the .game property of the location */}
                    <Route path="/mods/:game" element={<ModList />} />
                </Routes>
            </HashRouter>
        </StrictMode>
);
