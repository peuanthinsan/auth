import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from './api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('token') || '');
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
    if (currentOrg) {
      localStorage.setItem('currentOrg', currentOrg);
    } else {
      localStorage.removeItem('currentOrg');
    }
  }, [currentOrg]);

  const login = async (username, password) => {
    const res = await api.post('/login', { username, password });
    setTokenState(res.data.token);
  };

  const logout = () => {
    setTokenState('');
    setCurrentOrgState('');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, setToken: setTokenState, currentOrg, setCurrentOrg: setCurrentOrgState }}>
      {children}
    </AuthContext.Provider>
  );
}
