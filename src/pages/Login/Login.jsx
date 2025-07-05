import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import { useAuth } from '../../AuthProvider';
import { Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
// Importar imágenes
import rombosImg from '../../assets/images/rombos.png';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';

const Login = () => {
  // Estados del componente
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fade, setFade] = useState(true);
  
  // Hooks
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Usuario admin predefinido
      if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('role', 'admin');
        sessionStorage.setItem('nameUser', 'admin');
        setError('');
        navigate('/admin');
      } else if (username && password) {
        // Usuario normal
        sessionStorage.setItem('role', 'user');
        sessionStorage.setItem('nameUser', username);
        setError('');
        navigate('/');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('%c❌ Falló el inicio de sesión:', 'color: red; font-weight: bold;', error);
      showAlerta(error.message || 'Usuario o contraseña incorrectos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = `
    /* Estilos consistentes con Alumno */
    :root {
      --color-primary: #0f766e;
      --color-primary-dark: #0d5b52;
      --color-primary-light: #14b8a6;
      --color-secondary: #ec4899;
      --color-white: #ffffff;
      --color-gray-50: #f8fafc;
      --color-gray-100: #f1f5f9;
      --color-gray-200: #e2e8f0;
      --color-gray-300: #cbd5e1;
      --color-gray-400: #94a3b8;
      --color-gray-500: #64748b;
      --color-gray-600: #475569;
      --color-gray-700: #334155;
      --color-gray-800: #1e293b;
      --color-gray-900: #0f172a;
    }

    /* Fondo de rombos decorativos */
    .login-container::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${rombosImg});
      background-repeat: repeat;
      background-size: 300px;
      opacity: 0.15;
      z-index: 0;
      pointer-events: none;
    }

    .login-container {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--color-gray-50);
    }

    /* Header */
    .login-header {
      background: var(--color-white);
      border-bottom: 1px solid var(--color-gray-200);
      padding: 1rem 0;
    }

    .header-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(15, 118, 110, 0.2);
    }

    .logo-icon img {
      width: 2.2rem;
      height: 2.2rem;
      object-fit: contain;
      border-radius: 0.4rem;
    }

    .logo-text h1 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-gray-800);
      line-height: 1.2;
    }

    .logo-text p {
      font-size: 0.75rem;
      color: var(--color-gray-500);
    }

    /* Contenido principal */
    .login-main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-card {
      background: var(--color-white);
      border-radius: 1.5rem;
      padding: 3rem;
      width: 100%;
      max-width: 28rem;
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.1);
      border: 1px solid var(--color-gray-200);
      transition: all 0.3s ease;
    }

    .login-card:hover {
      box-shadow: 0 12px 32px rgba(15, 118, 110, 0.15);
    }

    .login-title {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .login-title h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 0.5rem;
    }

    .login-title p {
      color: var(--color-gray-600);
      font-size: 0.875rem;
    }

    /* Formulario */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-gray-700);
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      color: var(--color-gray-400);
    }

    .input-field {
      width: 100%;
      padding: 0.75rem 3rem 0.75rem 3rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .input-field:focus {
      outline: none;
      border-color: var(--color-primary-light);
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
    }

    .password-toggle {
      position: absolute;
      right: 1rem;
      background: none;
      border: none;
      color: var(--color-gray-400);
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .password-toggle:hover {
      color: var(--color-gray-600);
    }

    /* Error */
    .login-error {
      color: #dc2626;
      font-size: 0.875rem;
      text-align: center;
      margin-top: -0.5rem;
    }

    /* Botón */
    .login-button {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border: none;
      padding: 1rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      box-shadow: 0 4px 16px rgba(15, 118, 110, 0.2);
      margin-top: 1rem;
    }

    .login-button:hover {
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.3);
    }

    .login-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .button-loading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: var(--color-white);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Footer de la tarjeta */
    .login-footer {
      margin-top: 2rem;
      text-align: center;
    }

    .security-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-gray-500);
      font-size: 0.75rem;
    }

    /* Footer */
    .login-page-footer {
      background: var(--color-gray-800);
      color: var(--color-white);
      padding: 2rem;
      text-align: center;
    }

    .footer-text {
      font-size: 0.875rem;
      color: var(--color-gray-400);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .login-card {
        padding: 2rem;
      }

      .header-content {
        padding: 0 1rem;
      }
    }

    @media (max-width: 480px) {
      .login-main {
        padding: 1rem;
      }

      .login-card {
        padding: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
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
            {AlertaComponente}
            
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

              {error && <div className="login-error">{error}</div>}

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
            &copy; 2025 Universidad Politécnica de Chiapas. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Login;