// AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import './AdminPanel.css'; // <-- Importamos el archivo CSS aquí
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, FileText, Video, Download, Loader2, Search, ChevronRight, Menu, X, Users, Trophy, Calendar, ChevronDown, Award, Lightbulb, Upload, Star, Target, Heart, Zap, BarChart3, Settings, Shield, UserCheck, TrendingUp, Activity } from 'lucide-react';
import BtnSalir from '../../fragments/BtnSalir';
import descargaSVG from '../../assets/images/descarga.svg';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Catalogo from '../EvaluacionDeProyectos/Catalogo';
import Convocatoria from '../EvaluacionDeProyectos/Convocatoria';
import Lineamientos from '../EvaluacionDeProyectos/Lineamientos';
import ProyectosAdmin from './ProyectosAdmin';
import TablaUsuarios from './TablaUsuarios';
import CalificacionesAdmin from './CalificacionesAdmin';
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';
import { useAuth } from '../../AuthProvider';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { isAdmin, isLoggedIn, loading } = useAuth();
  const token = localStorage.getItem('token');
  const [AlertaComponente, showAlerta] = useAlerta();
  const [archivo, setArchivo] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalificar, setShowCalificar] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  if (loading) return null;
  if (!isLoggedIn || !isAdmin) return <Navigate to="/login" />;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProyectos = proyectos.filter(proyecto => {
    const matchesSearch = proyecto.nameUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.proyectoName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  useEffect(() => {
    handleGetProyectos();
    // eslint-disable-next-line
  }, []);

  const handleGetProyectos = async () => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_GETPR, {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        });
        const result = await response.json();
        if (response.ok) {
          return result;
        } else {
          showAlerta(`${result.message} usuario admin?` || 'Error en la solicitud', 'error');
        }
      } catch (error) {
        showAlerta('Error en el servidor', 'error');
      }
    };
    const depuracion = async () => {
      let objetoProyecto = [];
      try {
        setIsLoading(true);
        const datos = await fetchData();
        let canva = '';
        let ficha = '';
        let resumen = '';
        for (let i = 0; i < datos.length; i++) {
          if (datos[i].proyectos.length > 0) {
            if (datos[i].proyectos[0].canvaModel == undefined || datos[i].proyectos[0].technicalSheet == undefined || datos[i].proyectos[0].projectPdf == undefined) {
              console.log("archivos no subidos");
            }
            canva = datos[i].proyectos[0].canvaModel.split("\\");
            ficha = datos[i].proyectos[0].technicalSheet.split("\\");
            resumen = datos[i].proyectos[0].projectPdf.split("\\");
            objetoProyecto.push({
              nameUser: datos[i].username,
              proyectoName: datos[i].proyectos[0].name,
              descripcion: datos[i].proyectos[0].description,
              link: datos[i].proyectos[0].videoLink,
              ficha: ficha[ficha.length - 1],
              canva: canva[canva.length - 1],
              resumen: resumen[resumen.length - 1],
            });
          }
        }
        setProyectos(objetoProyecto);
      } catch (error) {
        console.error("Error en depuracion:", error);
      } finally {
        setIsLoading(false);
      }
    };
    depuracion();
  };

  const handleGetArchivos = async (fileName) => {
    try {
      const encodedUsername = encodeURIComponent(fileName.trim());
      const response = await fetch(`${import.meta.env.VITE_API_DESAR}/${encodedUsername}`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error en la solicitud');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${fileName}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showAlerta('Error en la solicitud', 'error');
    }
  };

  const handleFichaClick = (fileName) => {
    setArchivo(fileName);
    handleGetArchivos(fileName);
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

            {/* Desktop Navigation - MEJORADO */}
            <nav className="desktop-nav">
              {/* Calificar */}
              <button
                className="nav-item"
                onClick={() => navigate('/admin/EvaluacionProyecto')}
              >
                <Award size={18} />
                Calificar
              </button>

              {/* Administrador - MEJORADO */}
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
                        navigate('/admin/calificacionesAdmin');
                        setShowAdmin(false);
                      }}
                    >
                      <Trophy size={16} className="icon" />
                      Calificaciones Registradas
                    </button>
                  </div>
                )}
              </div>

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
                    navigate('/admin/EvaluacionProyecto');
                    setIsMenuOpen(false);
                  }}
                >
                  <span>Calificar</span>
                </button>

                {/* Administrador */}
                <button
                  className="mobile-nav-item"
                  onClick={() => setShowAdmin(!showAdmin)}
                >
                  <span>Administrador</span>
                  <ChevronRight size={16} />
                </button>
                {showAdmin && (
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
                        navigate('/admin/calificacionesAdmin');
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

        {AlertaComponente}
        {isLoading && (
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