import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { ApiProvider } from './ApiContext';
import { ThemeModeProvider } from './ThemeModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeModeProvider>
    <AuthProvider>
      <ToastProvider>
        <ApiProvider>
          <Router>
            <App />
          </Router>
        </ApiProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeModeProvider>
);
