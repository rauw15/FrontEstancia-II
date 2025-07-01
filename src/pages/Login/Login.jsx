// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import * as apiService from '../../services/apiService';
import { useAuth } from '../../AuthProvider';
import './Login.css';
import Head from '../../components/Head/Head2';
import Footer from '../../components/Footer';
import LogoUpChiapas from '../../components/LogoUpChiapas';

const op = {
  opacity: '0.5'
};

function Login() {
  // Estados del componente
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Hooks
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await auth.login(usuario, contrasena);
      showAlerta('Inicio de sesión exitoso', 'success');
      
      if (result.roles.includes('ROLE_ADMIN')) {
        navigate('/inicio/tablaAdmin');
      } else if (result.roles.includes('ROLE_MODERATOR')) {
        navigate('/inicio/home');
      } else {
        navigate('/inicio/dashboard'); // Ruta para usuarios normales
      }

    } catch (error) {
      console.error('%c❌ Falló el inicio de sesión:', 'color: red; font-weight: bold;', error);
      
      showAlerta(error.message || 'Usuario o contraseña incorrectos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='todoLogin'>
      {/* AlertaComponente se renderiza aquí y es controlado por showAlert */}
      {AlertaComponente} 
      
      <div className='head' id='head' style={op}><Head /></div>
      
      <div id='logoLogin'>
        {/* ... El resto de tu código JSX no necesita cambios ... */}
        <div className='login'>
          {/* Header del login */}
          <div className='login-header'>
            <div className='login-icon'>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className='login-title'>Bienvenido</h1>
            <p className='login-subtitle'>Universidad Politécnica de Chiapas</p>
          </div>

          <div id='form' className='login-card'>
            <form className='formDatos' onSubmit={handleSubmit}>
              
              {/* Campo Usuario */}
              <div className='input-group'>
                <label htmlFor="usuario">Usuario</label>
                <div className='input-container'>
                  <div className='input-icon'>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    id="usuario"
                    name='usuario' 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    required
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className='input-group'>
                <label htmlFor="contrasena">Contraseña</label>
                <div className='input-container'>
                  <div className='input-icon'>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="contrasena"
                    name='contrasena' 
                    value={contrasena} 
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button 
                    type="button" 
                    className='password-toggle'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className='login-button' disabled={isLoading}>
                {isLoading ? (
                  <div className='button-loading'>
                    <div className='spinner'></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <div className='button-content'>
                    <span>Iniciar Sesión</span>
                    <svg className='button-arrow' viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </button>
            </form>

            {/* Footer de la tarjeta */}
            <div className='login-card-footer'>
              <div className='security-badge'>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Acceso seguro y protegido</span>
              </div>
            </div>
          </div>
        </div>
        
        <LogoUpChiapas />
      </div>
      
      <div className="footer" id="footer" style={op}><Footer /></div>
    </div>
  );
}

export default Login;