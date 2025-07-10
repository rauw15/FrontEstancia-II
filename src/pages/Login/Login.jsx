import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import { useAuth } from '../../AuthProvider';
import { Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import './Login.css'; 
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [AlertaComponent, showAlerta] = useAlerta();
  const { login, isLoggedIn, user, loading } = useAuth();

  // Verificar si hay un mensaje de redirección en la URL
  const [showInscriptionButton, setShowInscriptionButton] = useState(false);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const message = urlParams.get('message');
    const action = urlParams.get('action');
    
    if (message) {
      showAlerta(message, 'info');
      
      // Si hay una acción específica de inscripción, mostrar el botón
      if (action === 'inscription') {
        setShowInscriptionButton(true);
      }
    }
  }, [location.search, showAlerta]);

  // useEffect para redirigir si el usuario YA ESTÁ logueado al cargar la página
  useEffect(() => {
    if (!loading && isLoggedIn && user?.roles) {
      if (user.roles.includes('admin')) {
        navigate('/admin', { replace: true });
      } else if (user.roles.includes('evaluador')) {
        navigate('/evaluador/evaluacion', { replace: true });
      } else {
        navigate('/alumno', { replace: true });
      }
    }
  }, [isLoggedIn, user, loading, navigate]);

  // --- FUNCIÓN handleSubmit SIMPLIFICADA ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Función de callback que se ejecutará DESPUÉS de un login exitoso.
    const handleRedirect = (userData) => {
      showAlerta(`Bienvenido, ${userData.username}`, 'success');
      if (userData.roles.includes('admin')) {
        navigate('/admin');
      } else if (userData.roles.includes('evaluador')) {
        navigate('/evaluador/evaluacion'); 
      } else {
        navigate('/alumno');
      }
    };

    try {
      // Pasamos las credenciales Y la función de redirección como callback.
      await login({ username, password }, handleRedirect);
    } catch (err) {
      console.error('❌ Falló el inicio de sesión:', err);
      const errorMessage = err.message || 'Usuario o contraseña incorrectos.';
      setError(errorMessage);
      showAlerta(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (loading) {
    return <div className="loading-overlay-full-page">Verificando sesión...</div>;
  }


  return (
    <div className="login-container">

        {/* Header */}
      <header className="login-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <img src={logoUpImg} alt="Logo UP Chiapas" />
            </div>
            <div className="logo-text">
              <h1>UP Chiapas</h1>
              <p>Emprendimiento e Innovación</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-card">
          {AlertaComponent}
          
          <div className="login-title">
            <h1>Bienvenido</h1>
            <p>Inicia sesión para acceder al sistema</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Campo Usuario */}
            <div className="input-group">
              <label htmlFor="username">Usuario</label>
              <div className="input-container">
                <div className="input-icon">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="username"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  required
                  style={{paddingLeft: '3rem'}}
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-container">
                <div className="input-icon">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  style={{paddingLeft: '3rem'}}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="login-error">{error}</div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="button-loading">
                  <div className="spinner"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer de la tarjeta */}
          <div className="login-footer">
            <div className="security-badge">
              <Shield size={14} />
              <span>Acceso seguro y protegido</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="login-page-footer">
        <p className="footer-text">
          © 2025 Universidad Politécnica de Chiapas. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Login;