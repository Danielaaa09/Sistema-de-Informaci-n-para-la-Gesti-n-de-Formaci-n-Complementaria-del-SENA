import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ✅ PWA
import { registerSW } from 'virtual:pwa-register';
registerSW();

// ✅ Importar el contexto de autenticación
import { AuthProvider } from './context/AuthContext';

// ✅ Montar App envuelta en el AuthProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
