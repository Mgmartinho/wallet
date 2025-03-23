import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './hooks/themes';

import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>

  </React.StrictMode>
);

reportWebVitals();
