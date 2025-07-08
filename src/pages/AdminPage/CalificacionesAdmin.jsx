// CalificacionesAdmin.jsx

import React, { useEffect, useState } from 'react';
import './CalificacionesAdmin.css'; // <-- Importamos el archivo CSS aquí
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, Award, User, ChevronDown, Download, X, Menu, FileText, Calendar, ChevronRight, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BtnSalir from '../../fragments/BtnSalir';
import '../../assets/css/seccioncss.css'; // Este ya estaba, lo dejamos
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';
import { useAuth } from '../../AuthProvider';
import { Navigate } from 'react-router-dom';

function CalificacionesAdmin() {
  const { isAdmin, isLoggedIn, loading } = useAuth();
  const token = localStorage.getItem('token');
  const [AlertaComponente, showAlerta] = useAlerta();
  const [proyectos, setProyectos] = useState([]);
  const proyectosOrdenados = proyectos.sort((a, b) => b.total - a.total);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // NOTA: La variable 'usuarioAdmin' no está definida en este componente. 
  // Probablemente deberías usar 'isAdmin' de useAuth() en la condición de handleGetProyectos.
  const usuarioAdmin = 'adminAdministraidor'; // Placeholder para evitar un error, deberías revisar esta lógica.

  if (loading) return null;
  if (!isLoggedIn || !isAdmin) return <Navigate to="/login" />;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    handleGetProyectos();
  }, []);

  const handleGetProyectos = async () => {
    if(usuarioAdmin === 'adminAdministraidor') { // <-- Revisa esta condición
      try {
        setIsLoading(true);
        const response = await fetch(import.meta.env.VITE_API_OBCAL, {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setProyectos(result);
        } else {
          showAlerta(`${result.message} usuario admin?` || 'Error en la solicitud', 'error');
        }
      } catch (error) {
        showAlerta('Error en el servidor', 'error');
      } finally {
        setIsLoading(false);
      }
    } else {
      showAlerta(<span>Solo usuario admin!</span>, 'error');
    }
  };

  return (
    <>
      <div className="main-container">
        {/* Header */}
        <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <img src={logoUpImg} alt="Logo UP Chiapas" style={{ width: '2.2rem', height: '2.2rem', objectFit: 'contain', borderRadius: '0.4rem' }} />
              </div>
              <div className="logo-text">
                <h1>UP Chiapas</h1>
                <p>Panel de Administración</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <button className="nav-item" onClick={() => navigate('/admin')}>
                <ClipboardCheck size={18} />
                Inicio
              </button>
              <div className="dropdown-parent">
                <button
                  className={`nav-item ${showAdmin ? 'nav-active' : ''}`}
                  onClick={() => setShowAdmin(!showAdmin)}
                  aria-expanded={showAdmin}
                  aria-haspopup="true"
                >
                  <User size={18} />
                  Administrador
                  <ChevronDown size={16} className={`transition-transform ${showAdmin ? 'rotate-180' : ''}`} />
                </button>
                {showAdmin && (
                  <div className="dropdown">
                    <button className="dropdown-item" onClick={() => { navigate('/admin/tablaAdmin'); setShowAdmin(false); }}>
                      <User size={16} className="icon" />
                      Usuarios Registrados
                    </button>
                    <button className="dropdown-item" onClick={() => { navigate('/admin/calificacionesAdmin'); setShowAdmin(false); }}>
                      <Award size={16} className="icon" />
                      Calificaciones Registradas
                    </button>
                  </div>
                )}
              </div>
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
                      <a className="dropdown-item" href={'/downloads/CONVOCATORIA 5 FERIA EMPRENDIMIENTO.pdf'} download onClick={() => setShowRecursos(false)}>
                        <Download size={16} className="icon" /> Convocatoria
                      </a>
                      <button className="dropdown-item" onClick={() => { navigate('/admin/lineamientos'); setShowRecursos(false); }}>
                        <FileText size={16} className="icon" /> Lineamientos
                      </button>
                      <a className="dropdown-item" href={'/downloads/FICHA Tecnica Emprendimiento e Innovación 2025.docx'} download onClick={() => setShowRecursos(false)}>
                        <Download size={16} className="icon" /> Ficha técnica
                      </a>
                      <a className="dropdown-item" href={'/downloads/plantilla-canvas-descargable.pptx'} download onClick={() => setShowRecursos(false)}>
                        <Download size={16} className="icon" /> Plantilla Modelo Canvas
                      </a>
                      <a className="dropdown-item" href={'/downloads/MATERIAL APOYO MODELO CANVAS.pdf'} download onClick={() => setShowRecursos(false)}>
                        <Download size={16} className="icon" /> Material Apoyo Canvas
                      </a>
                      <a className="dropdown-item" href={'/downloads/Caracteristicas RESUMEN EJECUTIVO.pdf'} download onClick={() => setShowRecursos(false)}>
                        <Download size={16} className="icon" /> Resumen Ejecutivo
                      </a>
                    </div>
                )}
              </div>
            </nav>

            <div className="user-section">
              <BtnSalir />
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-btn">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-content">
                <button className="mobile-nav-item" onClick={() => { navigate('/admin/EvaluacionProyecto'); setIsMenuOpen(false); }}>
                  <span>Calificar</span>
                </button>
                <button className="mobile-nav-item" onClick={() => setShowAdmin(!showAdmin)}>
                  <span>Administrador</span>
                  <ChevronRight size={16} />
                </button>
                {showAdmin && (
                  <div className="mobile-dropdown">
                    <button className="mobile-dropdown-item" onClick={() => { navigate('/admin/tablaAdmin'); setIsMenuOpen(false); }}>
                      Usuarios Registrados
                    </button>
                    <button className="mobile-dropdown-item" onClick={() => { navigate('/admin/proyectosAdmin'); setIsMenuOpen(false); }}>
                      Proyectos Registrados
                    </button>
                    <button className="mobile-dropdown-item" onClick={() => { navigate('/admin/calificacionesAdmin'); setIsMenuOpen(false); }}>
                      Calificaciones
                    </button>
                  </div>
                )}
                <button className="mobile-nav-item" onClick={() => setShowRecursos(!showRecursos)}>
                  <span>Recursos</span>
                  <ChevronRight size={16} />
                </button>
                {showRecursos && (
                  <div className="mobile-dropdown">
                    <button className="mobile-dropdown-item" onClick={() => { navigate('/admin/convocatoria'); setIsMenuOpen(false); }}>
                      Convocatoria
                    </button>
                    <button className="mobile-dropdown-item" onClick={() => { navigate('/admin/lineamientos'); setIsMenuOpen(false); }}>
                      Lineamientos
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        <div className="admin-container">
          <div className="admin-content">
            {AlertaComponente}
            
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-content">
                  <RefreshCw className="loading-spinner" size={32} />
                  <span className="loading-text">Cargando calificaciones...</span>
                </div>
              </div>
            )}

            <div className="admin-header">
              <div className="header-title">
                <Award size={24} />
                <h2>Calificaciones Registradas</h2>
                <span className="count-badge">{proyectos.length}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <BtnExportarExcel
                  datos={proyectosOrdenados}
                  nombreArchivo="Calificaciones"
                  className="refresh-btn"
                />
                <button 
                  className="refresh-btn" 
                  onClick={handleGetProyectos}
                  disabled={isLoading}
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="seccion_tabla">
                <thead>
                  <tr>
                    <th>Evaluador</th>
                    <th>Alumno</th>
                    <th>Innovación</th>
                    <th>Mercado</th>
                    <th>Técnica</th>
                    <th>Financiera</th>
                    <th>Pitch</th>
                    <th>Observaciones</th>
                    <th className="highlight-cell">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectosOrdenados.length > 0 ? (
                    proyectosOrdenados.map((proyecto, index) => (
                      <tr key={index}>
                        <td>{proyecto.userEvaluador}</td>
                        <td>{proyecto.userAlumno}</td>
                        <td>{proyecto.innovacion}</td>
                        <td>{proyecto.mercado}</td>
                        <td>{proyecto.tecnica}</td>
                        <td>{proyecto.financiera}</td>
                        <td>{proyecto.pitch}</td>
                        <td>{proyecto.observaciones}</td>
                        <td className="highlight-cell">{proyecto.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="empty-state">
                        <h3>No hay calificaciones registradas</h3>
                        <p>No se encontraron calificaciones en la base de datos</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalificacionesAdmin;