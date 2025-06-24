import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ✅ Registrar Service Worker fuera del render
import { registerSW } from 'virtual:pwa-register';
registerSW();

// ✅ Montar la app normalmente
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
