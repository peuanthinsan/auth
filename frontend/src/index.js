import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';
import { GlobalStyles } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <GlobalStyles styles={{ body: { fontSize: '0.875rem' } }} />
    <App />
  </AuthProvider>
);
