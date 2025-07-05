import React, { useEffect, useState } from 'react';
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, FileText, Video, Download, Loader2, Search } from 'lucide-react';
import BtnSalir from '../../fragments/BtnSalir';
import descargaSVG from '../../assets/images/descarga.svg';
import { useNavigate } from 'react-router-dom';
// Importamos el componente
import BtnExportarExcel from '../../fragments/BtnExportarExcel';

const ProyectosAdmin = () => {
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

  // Filtrar proyectos
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

  const styles = `
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
    .admin-header-bar {
      background: #008080;
      color: #fff;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100vw;
      left: 0;
      right: 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .admin-header-bar nav {
      width: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      position: relative;
    }
    .admin-header-bar #btnSalir {
      margin-left: auto;
      width: 10rem;
      height: 100%;
    }
    .admin-container {
      background: var(--color-gray-50);
      min-height: 100vh;
      padding: 2rem;
      padding-top: 5rem;
    }
    .admin-content {
      max-width: 1400px;
      margin: 0 auto;
    }
    .admin-header {
      background: var(--color-white);
      border-radius: 1rem;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 12px rgba(15, 118, 110, 0.1);
      border: 1px solid var(--color-gray-200);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .header-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .header-title h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin: 0;
    }
    .projects-count {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .refresh-btn {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border: none;
      padding: 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(15, 118, 110, 0.2);
    }
    .refresh-btn:hover {
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);
    }
    .filters-section {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .search-box {
      position: relative;
      flex: 1;
      min-width: 250px;
    }
    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid var(--color-gray-300);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background: var(--color-white);
      transition: all 0.2s ease;
    }
    .search-input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
    }
    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-gray-400);
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
    }
    .project-card {
      background: var(--color-white);
      border-radius: 1rem;
      padding: 1.5rem;
      border: 1px solid var(--color-gray-200);
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .project-card:hover {
      border-color: var(--color-primary-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.15);
    }
    .project-header {
      display: flex;
      justify-content: between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }
    .project-info {
      flex: 1;
    }
    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 0.25rem;
    }
    .project-user {
      font-size: 0.875rem;
      color: var(--color-gray-600);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .user-avatar {
      width: 2rem;
      height: 2rem;
      background: var(--color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-white);
      font-weight: 600;
      font-size: 0.75rem;
    }
    .project-description {
      color: var(--color-gray-600);
      margin-bottom: 1.5rem;
      line-height: 1.5;
      font-size: 0.875rem;
    }
    .project-actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: 1px solid var(--color-gray-300);
      border-radius: 0.5rem;
      background: var(--color-white);
      color: var(--color-gray-700);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .action-btn:hover {
      background: var(--color-gray-50);
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
    .action-btn.video {
      background: linear-gradient(135deg, var(--color-secondary), #f472b6);
      color: var(--color-white);
      border-color: var(--color-secondary);
    }
    .action-btn.video:hover {
      background: linear-gradient(135deg, #db2777, var(--color-secondary));
    }
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .loading-content {
      background: var(--color-white);
      padding: 2rem;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    .loading-spinner {
      animation: spin 1s linear infinite;
      color: var(--color-primary);
    }
    .loading-text {
      color: var(--color-gray-700);
      font-weight: 500;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--color-gray-500);
    }
    .empty-state h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: var(--color-gray-700);
    }
    @media (max-width: 768px) {
      .admin-container {
        padding: 1rem;
      }
      .header-content {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      .filters-section {
        flex-direction: column;
        align-items: stretch;
      }
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .project-actions {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
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