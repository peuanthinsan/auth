import React, { createContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const ToastContext = createContext({ showToast: () => {} });

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  const showToast = useCallback((message, severity = 'info') => {
    setToast({ open: true, message, severity });
  }, []);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast(t => ({ ...t, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
