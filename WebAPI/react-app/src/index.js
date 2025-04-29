import React from 'react';
import ReactDOM from 'react-dom';  // ← Not 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 17 rendering (no createRoot)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();