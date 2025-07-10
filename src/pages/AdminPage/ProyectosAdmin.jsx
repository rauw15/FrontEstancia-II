// ProyectosAdmin.jsx

import React, { useEffect, useState, useMemo } from 'react';
import './proyectosAdmin.css';
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, FileText, Video, Download, Loader2, Search } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
import { useAuth } from '../../AuthProvider';
import * as apiService from '../../services/apiService'; // Importamos el servicio

const ProyectosAdmin = () => {
  const { isAdmin, isEvaluador, isLoggedIn, loading: authLoading } = useAuth();
  const [AlertaComponent, showAlerta] = useAlerta();
  const [proyectos, setProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Lógica de obtención y transformación de datos simplificada
  const handleGetProyectos = async () => {
    setIsLoading(true);
    try {
      // Usamos la función del apiService
      const datosCrudos = await apiService.getAllProjects();
      
      // Transformamos los datos en un formato plano y fácil de usar para la UI
      const proyectosProcesados = datosCrudos
        .map(item => {
          return {
            id: item.id,
            nameUser: item.owner_username || item.owner_name || 'Usuario',
            proyectoName: item.name,
            descripcion: item.description,
            link: item.video_link,
            categoria: item.category,
            fechaCreacion: item.created_at
          };
        })
        .filter(p => p !== null); // Eliminamos cualquier nulo de la lista

      setProyectos(proyectosProcesados);

    } catch (error) {
      showAlerta('Error al cargar proyectos: ' + error.message, 'error');
      setProyectos([]); // Limpiar en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Lógica de descarga de archivos refactorizada
  const handleDescargarArchivo = async (projectId, fileType, fileName) => {
    showAlerta(`Iniciando descarga de ${fileName}...`, 'info');
    try {
      // Construimos la URL de descarga
      const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}/download/${fileType}`;
      // Usamos la función del apiService para descargar archivos
      await apiService.downloadFile(downloadUrl, fileName);
      showAlerta(`${fileName} descargado exitosamente`, 'success');
    } catch (error) {
      showAlerta(`Error al descargar ${fileName}: ${error.message}`, 'error');
    }
  };

  // Cargar proyectos al montar el componente
  useEffect(() => {
    if (isAdmin || isEvaluador) {
      handleGetProyectos();
    }
  }, [isAdmin, isEvaluador]);

  // 3. Filtrado de proyectos optimizado con useMemo
  const filteredProyectos = useMemo(() => {
    if (!searchTerm) {
      return proyectos;
    }
    return proyectos.filter(proyecto =>
      proyecto.nameUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.proyectoName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [proyectos, searchTerm]);
  
  // Protección de la ruta
  if (authLoading) return <div className="loading-overlay">Cargando...</div>;
  if (!isLoggedIn || (!isAdmin && !isEvaluador)) {
    // Si no es admin ni evaluador, no debería estar aquí. Redirige a una página segura.
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="admin-container">
        {AlertaComponent}
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
            <div className="header-title">
              <h1>Proyectos Registrados</h1>
              <div className="projects-count">
                <FileText size={16} />
                {filteredProyectos.length} Proyectos
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <BtnExportarExcel
                datos={filteredProyectos}
                nombreArchivo="Proyectos"
                className="refresh-btn"
              />
              <button className="refresh-btn" onClick={handleGetProyectos} disabled={isLoading}>
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
            <p>{searchTerm ? 'No hay proyectos que coincidan con tu búsqueda' : 'Aún no hay proyectos registrados'}</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProyectos.map((proyecto) => (
              <div key={proyecto.id} className="project-card">
                <div className="project-header">
                  <div className="project-info">
                    <div className="project-title">{proyecto.proyectoName}</div>
                    <div className="project-user">
                      <div className="user-avatar">{proyecto.nameUser.charAt(0).toUpperCase()}</div>
                      {proyecto.nameUser}
                    </div>
                  </div>
                </div>
                <div className="project-description">{proyecto.descripcion}</div>
                <div className="project-actions">
                  <button className="action-btn" onClick={() => handleDescargarArchivo(proyecto.id, 'technicalSheet', `Ficha_${proyecto.proyectoName}.pdf`)}>
                    <Download size={16} /> Ficha Técnica
                  </button>
                  <button className="action-btn" onClick={() => handleDescargarArchivo(proyecto.id, 'canvaModel', `Canvas_${proyecto.proyectoName}.pdf`)}>
                    <Download size={16} /> Modelo Canvas
                  </button>
                  <button className="action-btn" onClick={() => handleDescargarArchivo(proyecto.id, 'projectPdf', `Resumen_${proyecto.proyectoName}.pdf`)}>
                    <Download size={16} /> Resumen Ejecutivo
                  </button>
                  <a href={proyecto.link} target="_blank" rel="noopener noreferrer" className="action-btn video">
                    <Video size={16} /> Ver Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProyectosAdmin;