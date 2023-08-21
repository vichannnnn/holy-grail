import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_APP_GOOGLE_ANALYTICS_ID as string);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
