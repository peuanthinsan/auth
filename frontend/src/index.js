import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { ApiProvider } from './ApiContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <ToastProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeProvider>
);
