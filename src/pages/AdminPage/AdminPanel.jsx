// src/pages/AdminPage/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import { 
  Award, 
  Users, 
  ChevronDown, 
  FileText, 
  Download, 
  Trophy, 
  X, 
  Menu, 
  ChevronRight,
  Loader2 
} from 'lucide-react';
import { useAuth } from '../../AuthProvider';
import { useAlerta } from '../../fragments/Alerta';
import BtnSalir from '../../fragments/BtnSalir';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';
import ProyectosAdmin from './ProyectosAdmin';
import TablaUsuarios from './TablaUsuarios';
import CalificacionesAdmin from './CalificacionesAdmin';
import Catalogo from '../EvaluacionDeProyectos/Catalogo';
import Convocatoria from '../EvaluacionDeProyectos/Convocatoria';
import Lineamientos from '../EvaluacionDeProyectos/Lineamientos';

const AdminPanel = () => {
  const { user, isAdmin, isEvaluador, isLoggedIn, loading: authLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [scrollY, setScrollY] = useState(0); // Variable scrollY declarada
  const navigate = useNavigate();

  // 3. USAR el hook useAlerta para obtener el componente y la función
  const [AlertaComponent, showAlerta] = useAlerta();

  // Protección de la ruta
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [authLoading, isLoggedIn, navigate]);

  // Log para verificar información del usuario
  useEffect(() => {
    if (user && !authLoading) {
      console.log('[AdminPanel] Usuario cargado:', {
        username: user.username,
        roles: user.roles,
        isAdmin,
        isEvaluador
      });
    }
  }, [user, authLoading, isAdmin, isEvaluador]);

  // Manejador de scroll para el header
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Doble chequeo de seguridad
  if (authLoading) {
    return <div className="loading-overlay-full-page">Verificando acceso...</div>;
  }
  
  // Verificación de roles mejorada
  console.log('[AdminPanel] Verificando roles:', { 
    isAdmin, 
    isEvaluador, 
    userRoles: user?.roles,
    isLoggedIn 
  });
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin && !isEvaluador) {
    console.log('[AdminPanel] Usuario no tiene permisos de admin o evaluador');
    return <Navigate to="/" replace />;
  }

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  
  return (
    <>
      <div className="main-container">
        {AlertaComponent} {/* 4. Renderizar el componente de alerta */}
        
        {/* Header */}
        <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <img src={logoUpImg} alt="Logo UP Chiapas" />
              </div>
              <div className="logo-text">
                <h1>UP Chiapas</h1>
                <p>Panel de Administración</p>
              </div>
            </div>
            
            {/* Desktop Navigation - MEJORADO */}
            <nav className="desktop-nav">
              {/* Calificar */}
              <button
                className="nav-item"
                onClick={() => navigate('/evaluador/evaluacion')}
              >
                <Award size={18} />
                Calificar
              </button>

              {/* Administrador - MEJORADO */}
              {isAdmin && (
                <div className="dropdown-parent">
                  <button
                    className={`nav-item ${showAdmin ? 'nav-active' : ''}`}
                    onClick={() => setShowAdmin(!showAdmin)}
                    aria-expanded={showAdmin}
                    aria-haspopup="true"
                  >
                    <Users size={18} />
                    Administrador
                    <ChevronDown size={16} className={`transition-transform ${showAdmin ? 'rotate-180' : ''}`} />
                  </button>
                  {showAdmin && (
                    <div className="dropdown">
                      <button 
                        className="dropdown-item" 
                        onClick={() => {
                          navigate('/admin/tablaAdmin');
                          setShowAdmin(false);
                        }}
                      >
                        <Users size={16} className="icon" />
                        Usuarios Registrados
                      </button>
                      <button 
                        className="dropdown-item" 
                        onClick={() => {
                          navigate('/evaluador/calificaciones');
                          setShowAdmin(false);
                        }}
                      >
                        <Trophy size={16} className="icon" />
                        Calificaciones Registradas
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Recursos - MEJORADO */}
              <div className="dropdown-parent">
                <button
                  className={`nav-item ${showRecursos ? 'nav-active' : ''}`}
                  onClick={() => setShowRecursos(!showRecursos)}
                  aria-expanded={showRecursos}
                  aria-haspopup="true"
                >
                  <FileText size={18} />
                  Recursos
                  <ChevronDown size={16} className={`transition-transform ${showRecursos ? 'rotate-180' : ''}`} />
                </button>
                {showRecursos && (
                  <div className="dropdown">
                    <a 
                      className="dropdown-item" 
                      href={'/downloads/CONVOCATORIA 5 FERIA EMPRENDIMIENTO.pdf'} 
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Convocatoria
                    </a>
                    <button 
                      className="dropdown-item" 
                      onClick={() => {
                        navigate('/admin/lineamientos');
                        setShowRecursos(false);
                      }}
                    >
                      <FileText size={16} className="icon" />
                      Lineamientos de participación
                    </button>
                    <a 
                      className="dropdown-item" 
                      href={'/downloads/FICHA Tecnica Emprendimiento e Innovación 2025.docx'} 
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Ficha técnica
                    </a>
                    <a 
                      className="dropdown-item" 
                      href={'/downloads/plantilla-canvas-descargable.pptx'} 
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Plantilla Modelo Canvas
                    </a>
                    <a 
                      className="dropdown-item" 
                      href={'/downloads/MATERIAL APOYO MODELO CANVAS.pdf'} 
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Material Apoyo Modelo Canvas
                    </a>
                    <a 
                      className="dropdown-item" 
                      href={'/downloads/Caracteristicas RESUMEN EJECUTIVO.pdf'} 
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Resumen Ejecutivo
                    </a>
                  </div>
                )}
              </div>
            </nav>

            {/* User Section */}
            <div className="user-section">
              <BtnSalir />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-content">
                {/* Calificar */}
                <button
                  className="mobile-nav-item"
                  onClick={() => {
                    navigate('/evaluador/evaluacion');
                    setIsMenuOpen(false);
                  }}
                >
                  <span>Calificar</span>
                </button>

                {/* Administrador */}
                {isAdmin && (
                  <button
                    className="mobile-nav-item"
                    onClick={() => setShowAdmin(!showAdmin)}
                  >
                    <span>Administrador</span>
                    <ChevronRight size={16} />
                  </button>
                )}
                {showAdmin && isAdmin && (
                  <div className="mobile-dropdown">
                    <button 
                      className="mobile-dropdown-item" 
                      onClick={() => {
                        navigate('/admin/tablaAdmin');
                        setIsMenuOpen(false);
                      }}
                    >
                      Usuarios Registrados
                    </button>
                    <button 
                      className="mobile-dropdown-item" 
                      onClick={() => {
                        navigate('/evaluador/calificaciones');
                        setIsMenuOpen(false);
                      }}
                    >
                      Calificaciones Registradas
                    </button>
                  </div>
                )}

                {/* Recursos */}
                <button
                  className="mobile-nav-item"
                  onClick={() => setShowRecursos(!showRecursos)}
                >
                  <span>Recursos</span>
                  <ChevronRight size={16} />
                </button>
                {showRecursos && (
                  <div className="mobile-dropdown">
                    <a 
                        className="dropdown-item" 
                        href={'/downloads/CONVOCATORIA 5 FERIA EMPRENDIMIENTO.pdf'} 
                        download
                        onClick={() => setShowRecursos(false)}
                      >
                        <Download size={16} className="icon" />
                        Convocatoria
                    </a>
                    <button 
                      className="mobile-dropdown-item" 
                      onClick={() => {
                        navigate('/admin/lineamientos');
                        setIsMenuOpen(false);
                      }}
                    >
                      Lineamientos de participación
                    </button>
                    <a 
                      className="mobile-dropdown-item" 
                      href={'/downloads/FICHA Tecnica Emprendimiento e Innovación 2025.docx'} 
                      download
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Formato ficha técnica
                    </a>
                    <a 
                      className="mobile-dropdown-item" 
                      href={'/downloads/plantilla-canvas-descargable.pptx'} 
                      download
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Plantilla Modelo Canvas
                    </a>
                    <a 
                      className="mobile-dropdown-item" 
                      href={'/downloads/MATERIAL APOYO MODELO CANVAS.pdf'} 
                      download
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Material Apoyo Canvas
                    </a>
                    <a 
                      className="mobile-dropdown-item" 
                      href={'/downloads/Caracteristicas del RESUMEN EJECUTIVO.pdf'} 
                      download
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Plantilla Resumen Ejecutivo
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        {AlertaComponent}
        {authLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <Loader2 className="loading-spinner" size={32} />
              <span className="loading-text">Cargando proyectos...</span>
            </div>
          </div>
        )}
        <Routes>
          <Route path='/' element={<ProyectosAdmin />} />
          <Route path='proyectos' element={<ProyectosAdmin />} />
          <Route path='usuarios' element={<TablaUsuarios />} />
          <Route path='calificaciones' element={<CalificacionesAdmin />} />
          <Route path='catalogo' element={<Catalogo />} />
          <Route path='convocatoria' element={<Convocatoria />} />
          <Route path='lineamientos' element={<Lineamientos />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminPanel;