import React, { createContext, useContext, useState, useEffect } from 'react';
import * as apiService from './services/apiService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Checa si hay token y usuario al cargar
    const token = localStorage.getItem('token');
    const username = sessionStorage.getItem('nameUser');
    setIsLoggedIn(!!token);
    setUser(username || null);
    setLoading(false);
  }, []);

  // Login usando el backend
  const login = async (username, password) => {
    const result = await apiService.login({ username, password });
    if (result.accessToken) {
      setIsLoggedIn(true);
      setUser(result.username);
    }
    return result;
  };

  // Logout usando el backend
  const logout = () => {
    apiService.logout(); // Esto limpia tokens y redirige
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
