import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

// get the root element from the HTML
const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('Root element not found!');
}