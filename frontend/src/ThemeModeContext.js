import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import themeBase from './theme';

export const ThemeModeContext = createContext({ toggle: () => {} });

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'));
  const theme = useMemo(() => createTheme({ ...themeBase, palette: { ...themeBase.palette, mode } }), [mode]);
  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
