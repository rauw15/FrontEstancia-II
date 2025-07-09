// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as apiService from './services/apiService'; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        const userData = JSON.parse(storedUser);
  
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error al restaurar la sesión:", error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials, onSuccessCallback) => {
    try {
   
      
      const authResult = await apiService.login(credentials);
      console.log('[AUTH LOGIN] Resultado de autenticación:', authResult);
      
      if (!authResult.accessToken || !authResult.id) throw new Error("Autenticación falló.");
      
      console.log('[AUTH LOGIN] Obteniendo roles para usuario ID:', authResult.id);
      const rolesData = await apiService.getUserRoles(authResult.id, authResult.accessToken);
      console.log('[AUTH LOGIN] Datos de roles obtenidos:', rolesData);
      
      const roleNames = rolesData.map(role => role.name);

   
      const completeUserData = {
        id: authResult.id,
        username: authResult.username,
        roles: roleNames,
      };

      localStorage.setItem('token', authResult.accessToken);
      if (authResult.refreshToken) localStorage.setItem('refreshToken', authResult.refreshToken);
      localStorage.setItem('user', JSON.stringify(completeUserData));
      
      setUser(completeUserData);
      setIsLoggedIn(true);

      if (onSuccessCallback) {
        onSuccessCallback(completeUserData);
      }
      
      return completeUserData;
    } catch (error) {
      console.error("[AUTH LOGIN] ERROR en el proceso de login:", error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    console.log('[AUTH LOGOUT] Cerrando sesión...');
    
    // Limpiar todos los datos de autenticación
    localStorage.clear();
    sessionStorage.clear();
    
    // Limpiar el estado
    setUser(null);
    setIsLoggedIn(false);
    
    console.log('[AUTH LOGOUT] Sesión cerrada, redirigiendo al login...');
    
    // Redirigir al login
    window.location.href = '/login';
  };
  

  const value = {
    isLoggedIn,
    user,
    roles: user ? user.roles : [],
    isAdmin: user ? user.roles.includes('admin') : false,
    isEvaluador: user ? user.roles.includes('evaluador') : false,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}