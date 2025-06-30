import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken, setRefreshToken, setTokenRefreshHandler } from './api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('token') || '');
  const [refreshToken, setRefreshTokenState] = useState(() => localStorage.getItem('refreshToken') || '');
  const [currentOrg, setCurrentOrgState] = useState(() => localStorage.getItem('currentOrg') || '');

  useEffect(() => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    setRefreshToken(refreshToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [refreshToken]);

  useEffect(() => {
    setTokenRefreshHandler((newToken) => setTokenState(newToken));
  }, []);


  useEffect(() => {
    if (currentOrg) {
      localStorage.setItem('currentOrg', currentOrg);
    } else {
      localStorage.removeItem('currentOrg');
    }
  }, [currentOrg]);

  const login = async (username, password) => {
    const res = await api.post('/login', { username, password });
    setTokenState(res.data.token);
    setRefreshTokenState(res.data.refreshToken);
  };

  const logout = async () => {
    if (refreshToken) {
      try {
        await api.post('/logout', { refreshToken });
      } catch (e) {
        // ignore
      }
    }
    setTokenState('');
    setRefreshTokenState('');
    setCurrentOrgState('');
  };

  const refreshAuth = async () => {
    if (!refreshToken) return;
    const res = await api.post('/refresh', { refreshToken });
    setTokenState(res.data.token);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, refreshAuth, setToken: setTokenState, currentOrg, setCurrentOrg: setCurrentOrgState }}>
      {children}
    </AuthContext.Provider>
  );
}
