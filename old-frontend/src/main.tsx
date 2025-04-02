import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import ReactGA from 'react-ga4';
import './index.css';

ReactGA.initialize(import.meta.env.VITE_APP_GOOGLE_ANALYTICS_ID as string);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
