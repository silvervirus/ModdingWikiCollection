import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'

import Legacy from './Legacy/Legacy';

// Create a root for React to live at based on the "root" div
// Then render Home.tsx in it
// StrictMode is just a wrapper to help highlight issues
ReactDOM.createRoot(document.getElementById('test')!)
    .render(
        <StrictMode>
            <Legacy />
        </StrictMode>
);
