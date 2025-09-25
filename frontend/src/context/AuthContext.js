import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setAuth({ token, user });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setAuth({ token: res.data.token, user: res.data.user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};