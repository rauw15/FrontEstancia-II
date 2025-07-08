import React, { createContext, useContext, useState, useEffect } from 'react';
// Asegúrate de que la ruta a tu servicio API sea correcta
import * as apiService from './services/apiService'; 

// 1. Crear el contexto
const AuthContext = createContext(null);

// 2. Exportar el componente Provider (el que envuelve tu App)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, revisa si hay una sesión guardada en localStorage
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
      console.error("Error al restaurar la sesión desde localStorage:", error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // Función de login: llama a la API y, si tiene éxito, guarda el estado
  const login = async (credentials) => {
    try {
      const result = await apiService.login(credentials);
      
      if (result.accessToken && result.username) {
        const userData = {
          id: result.id,
          username: result.username,
          roles: result.roles || [],
        };

        localStorage.setItem('token', result.accessToken);
        if (result.refreshToken) {
          localStorage.setItem('refreshToken', result.refreshToken);
        }
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
        setIsLoggedIn(true);
        
        return userData;
      }
    } catch (error) {
      console.error("Fallo en el login:", error);
      // Limpia cualquier estado residual si el login falla
      logout();
      throw error;
    }
  };

  // Función de logout: limpia localStorage y el estado de React
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsLoggedIn(false);
  };
  
  const value = {
    isLoggedIn,
    user,
    roles: user ? user.roles : [],
    isAdmin: user ? user.roles.includes('admin') : false,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* No renderizar los hijos hasta que la comprobación inicial de auth termine */}
      {!loading && children} 
    </AuthContext.Provider>
  );
}

// 3. Exportar el hook personalizado `useAuth`
//    ¡ESTA ES LA LÍNEA QUE PROBABLEMENTE FALTABA O ERA INCORRECTA!
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}