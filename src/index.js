import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const rootDiv = document.getElementById('root'); rootDiv.className = 'page-scroll-white-theme white-theme-root';
const root = ReactDOM.createRoot( rootDiv);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
