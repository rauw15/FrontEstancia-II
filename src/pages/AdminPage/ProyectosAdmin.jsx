// ProyectosAdmin.jsx

import React, { useEffect, useState } from 'react';
import './ProyectosAdmin.css'; // <-- Importamos el archivo CSS aquí
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, FileText, Video, Download, Loader2, Search } from 'lucide-react';
import BtnSalir from '../../fragments/BtnSalir';
import descargaSVG from '../../assets/images/descarga.svg';
import { useNavigate } from 'react-router-dom';
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
import { useAuth } from '../../AuthProvider';
import { Navigate } from 'react-router-dom';

const ProyectosAdmin = () => {
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
  const navigate = useNavigate();

  if (loading) return null;
  if (!isLoggedIn || !isAdmin) return <Navigate to="/login" />;

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

  // Estilos en línea para la barra de navegación superior (se mantienen aquí)
  const navItemStyle = {
    position: 'relative',
    margin: '0 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#fff',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  };
  const dropdownStyle = {
    position: 'absolute',
    top: '2.2rem',
    left: 0,
    background: '#008080',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 10,
    minWidth: '220px',
    padding: '0.5rem 0',
  };
  const dropdownItemStyle = {
    padding: '0.5rem 1.5rem',
    color: '#fff',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '1rem',
    whiteSpace: 'nowrap',
  };
  const linkStyle = { color: '#fff', textDecoration: 'none', display: 'block' };

  return (
    <>
      <div className="admin-header-bar">
        <nav>
          {/* Calificar */}
          <div
            style={navItemStyle}
            onMouseEnter={() => setShowCalificar(true)}
            onMouseLeave={() => setShowCalificar(false)}
          >
            <span>Calificar</span>
            {showCalificar && (
              <div style={dropdownStyle}>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/evaluacion/proyectoSocial')}>Proyecto Social</button>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/evaluacion/emprendimientoTecnologico')}>Emprendimiento Tecnológico</button>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/evaluacion/innovacionProductosServicios')}>Innovación en Productos y Servicios</button>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/evaluacion/energias')}>Energías Limpias y Sustentabilidad Ambiental</button>
              </div>
            )}
          </div>
          {/* Administrador */}
          <div
            style={navItemStyle}
            onMouseEnter={() => setShowAdmin(true)}
            onMouseLeave={() => setShowAdmin(false)}
          >
            <span>Administrador</span>
            {showAdmin && (
              <div style={dropdownStyle}>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/tablaAdmin')}>Usuarios Registrados</button>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/proyectosAdmin')}>Proyectos Registrados</button>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/calificacionesAdmin')}>Calificaciones Registrados</button>
              </div>
            )}
          </div>
          {/* Recursos */}
          <div
            style={navItemStyle}
            onMouseEnter={() => setShowRecursos(true)}
            onMouseLeave={() => setShowRecursos(false)}
          >
            <span>Recursos</span>
            {showRecursos && (
              <div style={dropdownStyle}>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/convocatoria')}>Convocatoria feria</button>
                <button style={dropdownItemStyle} onClick={() => navigate('/inicio/convocatoria/lineamientos')}>Lineamientos de participación</button>
                <a style={{ ...dropdownItemStyle, ...linkStyle }} href={'/downloads/FICHA Tecnica Emprendimiento e Innovación 2024.docx'} download>
                  <img src={descargaSVG} alt='doc' style={{ width: 18, marginRight: 8, verticalAlign: 'middle' }} />Formato descarga para ficha técnica
                </a>
                <a style={{ ...dropdownItemStyle, ...linkStyle }} href={'/downloads/plantilla-canvas-descargable.pptx'} download>
                  <img src={descargaSVG} alt='doc' style={{ width: 18, marginRight: 8, verticalAlign: 'middle' }} />Plantilla descargable Modelo Canvas
                </a>
                <a style={{ ...dropdownItemStyle, ...linkStyle }} href={'/downloads/MATERIAL APOYO MODELO CANVAS.pdf'} download>
                  <img src={descargaSVG} alt='doc' style={{ width: 18, marginRight: 8, verticalAlign: 'middle' }} />Material descargable Apoyo Modelo Canvas
                </a>
                <a style={{ ...dropdownItemStyle, ...linkStyle }} href={'/downloads/Caracteristicas del RESUMEN EJECUTIVO.docx'} download>
                  <img src={descargaSVG} alt='doc' style={{ width: 18, marginRight: 8, verticalAlign: 'middle' }} />Plantilla descargable Resumen Ejecutivo
                </a>
              </div>
            )}
          </div>
        </nav>
        <div id='btnSalir'><BtnSalir /></div>
      </div>
      <div className="admin-container">
        {AlertaComponente}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <Loader2 className="loading-spinner" size={32} />
              <span className="loading-text">Cargando proyectos...</span>
            </div>
          </div>
        )}
        <div className="admin-content">
          <div className="admin-header">
            <div className="header-content">
              <div className="header-title">
                <h1>Panel de Administración</h1>
                <div className="projects-count">
                  <FileText size={16} />
                  {proyectos.length} Proyectos
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <BtnExportarExcel
                  datos={filteredProyectos}
                  nombreArchivo="Proyectos"
                  className="refresh-btn"
                />
                <button className="refresh-btn" onClick={handleGetProyectos}>
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
            <div className="filters-section">
              <div className="search-box">
                <Search className="search-icon" size={16} />
                <input
                  type="text"
                  placeholder="Buscar por usuario o nombre del proyecto..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          {filteredProyectos.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} style={{ color: 'var(--color-gray-400)', marginBottom: '1rem' }} />
              <h3>No se encontraron proyectos</h3>
              <p>
                {searchTerm
                  ? 'No hay proyectos que coincidan con tu búsqueda'
                  : 'Aún no hay proyectos registrados'}
              </p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProyectos.map((proyecto, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <div className="project-info">
                      <div className="project-title">{proyecto.proyectoName}</div>
                      <div className="project-user">
                        <div className="user-avatar">
                          {proyecto.nameUser.charAt(0).toUpperCase()}
                        </div>
                        {proyecto.nameUser}
                      </div>
                    </div>
                  </div>
                  <div className="project-description">
                    {proyecto.descripcion}
                  </div>
                  <div className="project-actions">
                    <button
                      className="action-btn"
                      onClick={() => handleFichaClick(proyecto.ficha)}
                    >
                      <Download size={16} />
                      Ficha Técnica
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleFichaClick(proyecto.canva)}
                    >
                      <Download size={16} />
                      Modelo Canvas
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleFichaClick(proyecto.resumen)}
                    >
                      <Download size={16} />
                      Resumen Ejecutivo
                    </button>
                    <a
                      href={proyecto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn video"
                    >
                      <Video size={16} />
                      Ver Video
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProyectosAdmin;