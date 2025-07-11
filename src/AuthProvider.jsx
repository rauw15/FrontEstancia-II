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
      
      // Limpiar roles si tienen prefijos ROLE_
      const cleanRoles = authResult.roles ? apiService.cleanRoleNames(authResult.roles) : [];
      
      // Usar directamente los roles que devuelve el backend (ya limpios)
      const completeUserData = {
        id: authResult.id,
        username: authResult.username,
        email: authResult.email,
        nombre: authResult.nombre,
        carrera: authResult.carrera,
        cuatrimestre: authResult.cuatrimestre,
        categoria: authResult.categoria,
        roles: cleanRoles, // Usar los roles limpios
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

  // Función para actualizar el usuario (útil cuando se cambian roles)
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  // Función para verificar permisos usando las nuevas funciones de utilidad
  const hasPermission = (permission) => {
    if (!user || !user.roles) return false;
    
    switch (permission) {
      case 'admin':
        return apiService.isUserAdmin(user);
      case 'evaluador':
        return apiService.isUserEvaluador(user);
      case 'moderator':
        return apiService.isUserModerator(user);
      case 'user':
        return true; // Todos los usuarios autenticados tienen permisos básicos
      default:
        return user.roles.some(role => 
          role.toLowerCase() === permission.toLowerCase()
        );
    }
  };

  // Función para obtener el rol más alto del usuario
  const getHighestRole = () => {
    return apiService.getUserHighestRole(user);
  };

  const value = {
    isLoggedIn,
    user,
    roles: user ? user.roles : [],
    isAdmin: user ? apiService.isUserAdmin(user) : false,
    isEvaluador: user ? apiService.isUserEvaluador(user) : false,
    isModerator: user ? apiService.isUserModerator(user) : false,
    loading,
    login,
    logout,
    updateUser,
    hasPermission,
    getHighestRole,
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