// CalificacionesAdmin.jsx

import React, { useEffect, useState } from 'react';
import './CalificacionesAdmin.css';
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, Award, User, ChevronDown, Download, X, Menu, FileText, Calendar, ChevronRight, ClipboardCheck } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import BtnSalir from '../../fragments/BtnSalir';
import '../../assets/css/seccioncss.css';
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';
import { useAuth } from '../../AuthProvider';
import * as apiService from '../../services/apiService'; // 1. Importar el apiService

function CalificacionesAdmin() {
  // Hooks y estado (sin cambios significativos)
  const { isAdmin, isLoggedIn, loading: authLoading } = useAuth();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [calificaciones, setCalificaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // Ordena las calificaciones por el total, de mayor a menor
  const calificacionesOrdenadas = [...calificaciones].sort((a, b) => (b.total || 0) - (a.total || 0));

  // Protección de la ruta
  if (authLoading) return <div className="loading-overlay">Cargando...</div>;
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // --- FUNCIÓN PARA OBTENER DATOS REFACTORIZADA ---
  const handleGetCalificaciones = async () => {
    // La condición ahora usa el 'isAdmin' del contexto, que es dinámico y fiable.
    if (!isAdmin) {
      showAlerta('Acceso denegado. Solo los administradores pueden ver esta sección.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // 2. Usamos la función de nuestro apiService. ¡Más limpio y seguro!
      const result = await apiService.getAllCalificaciones();
      
      // El apiService ya parsea el JSON, así que el resultado está listo para usarse.
      setCalificaciones(result || []);
      if (result && result.length > 0) {
        console.log('Ejemplo de calificación:', result[0]);
      }

    } catch (error) {
      // El apiService ya maneja los errores, aquí solo mostramos la alerta.
      showAlerta('Error al cargar calificaciones: ' + error.message, 'error');
      setCalificaciones([]); // Limpiamos los datos en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar las calificaciones cuando el componente se monta por primera vez.
  useEffect(() => {
    handleGetCalificaciones();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar.

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="main-container">
        {/* Header (se mantiene igual) */}
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

            <nav className="desktop-nav">
              <button className="nav-item" onClick={() => navigate('/admin')}>
                <ClipboardCheck size={18} /> Inicio
              </button>
              <div className="dropdown-parent">
                <button
                  className={`nav-item ${showAdmin ? 'nav-active' : ''}`}
                  onClick={() => setShowAdmin(!showAdmin)}
                >
                  <User size={18} /> Administrador <ChevronDown size={16} className={`transition-transform ${showAdmin ? 'rotate-180' : ''}`} />
                </button>
                {showAdmin && (
                  <div className="dropdown">
                    <button className="dropdown-item" onClick={() => { navigate('/admin/tablaAdmin'); setShowAdmin(false); }}>
                      <User size={16} className="icon" /> Usuarios Registrados
                    </button>
                    <button className="dropdown-item" onClick={() => { navigate('/admin/calificacionesAdmin'); setShowAdmin(false); }}>
                      <Award size={16} className="icon" /> Calificaciones
                    </button>
                  </div>
                )}
              </div>
              <div className="dropdown-parent">
                <button
                  className={`nav-item ${showRecursos ? 'nav-active' : ''}`}
                  onClick={() => setShowRecursos(!showRecursos)}
                >
                  <FileText size={18} /> Recursos <ChevronDown size={16} className={`transition-transform ${showRecursos ? 'rotate-180' : ''}`} />
                </button>
                {showRecursos && (
                    <div className="dropdown">
                      <a className="dropdown-item" href={'/downloads/CONVOCATORIA 5 FERIA EMPRENDIMIENTO.pdf'} download>
                        <Download size={16} className="icon" /> Convocatoria
                      </a>
                      {/* ... otros recursos */}
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

          {isMenuOpen && (
            <div className="mobile-menu">
              {/* ... tu menú móvil ... */}
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
                <span className="count-badge">{calificaciones.length}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <BtnExportarExcel
                  datos={calificacionesOrdenadas}
                  nombreArchivo="Calificaciones"
                  className="refresh-btn"
                />
                <button 
                  className="refresh-btn" 
                  onClick={handleGetCalificaciones}
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
                    <th>Proyecto</th>
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
                  {calificacionesOrdenadas.length > 0 ? (
                    calificacionesOrdenadas.map((calificacion) => {
                      return (
                        <tr key={calificacion.id}>
                          {/* 3. Asegúrate que los nombres de las propiedades coincidan con tu API */}
                          <td>{calificacion.evaluador ? calificacion.evaluador.username : 'N/A'}</td>
                          <td>{calificacion.proyecto ? calificacion.proyecto.name : 'N/A'}</td>
                          <td>{calificacion.innovacion}</td>
                          <td>{calificacion.mercado}</td>
                          <td>{calificacion.tecnica}</td>
                          <td>{calificacion.financiera}</td>
                          <td>{calificacion.pitch}</td>
                          <td>{calificacion.observaciones}</td>
                          <td className="highlight-cell">{calificacion.total}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" className="empty-state">
                        <h3>No hay calificaciones registradas</h3>
                        <p>No se encontraron calificaciones en la base de datos.</p>
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