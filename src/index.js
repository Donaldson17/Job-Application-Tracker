// Import React core libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import global styles
import './App.css';
// Import main App component
import App from './App';

// Create root element and render App component
const root = ReactDOM.createRoot(document.getElementById('root')); // Get root div from HTML
root.render(<App />); // Render App component into root
