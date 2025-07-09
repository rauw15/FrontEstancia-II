import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import { ChevronLeft, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import * as apiService from '../../services/apiService';
import './catalogo.css'; // Corregido: usar minúsculas

// Mantenemos el mapeo como nuestra "fuente de verdad"
const CATEGORY_MAP = {
  proyectoSocial: 'Proyecto Social',
  emprendimientoTecnologico: 'Emprendimiento Tecnológico',
  innovacionProductosServicios: 'Innovación en Productos y Servicios',
  energias: 'Energías Limpias y Sustentabilidad Ambiental'
};

// Mapeo inverso para buscar categorías del backend
const REVERSE_CATEGORY_MAP = {
  'Proyecto Social': 'proyectoSocial',
  'Emprendimiento Tecnológico': 'emprendimientoTecnologico',
  'Innovación en Productos y Servicios': 'innovacionProductosServicios',
  'Energías Limpias y Sustentabilidad Ambiental': 'energias'
};

function Catalogo() {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const projectsFromApi = await apiService.getAllProjects();
        setAllProjects(projectsFromApi || []);
      } catch (error) {
        showAlerta(error.message || 'Error al conectar con el servidor', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchAllProjects();
  }, []); // Removido showAlerta de las dependencias

  const filteredProjects = useMemo(() => {
    if (!categoryKey || !CATEGORY_MAP[categoryKey]) {
      return [];
    }
    const categoryName = CATEGORY_MAP[categoryKey];
    
    const filtered = allProjects.filter(project => {
      // Comparación más flexible
      const projectCategory = project.category?.trim().toLowerCase() || '';
      const targetCategory = categoryName.trim().toLowerCase();
      
      // Verificar coincidencia exacta
      if (projectCategory === targetCategory) {
        return true;
      }
      
      // Verificar si contiene palabras clave
      const keywords = targetCategory.split(' ');
      const hasKeywords = keywords.some(keyword => 
        projectCategory.includes(keyword.toLowerCase())
      );
      
      return hasKeywords;
    });
    
    return filtered;
  }, [allProjects, categoryKey]);

  const getCategoryName = () => {
    return CATEGORY_MAP[categoryKey] || 'Categoría no válida';
  };

  return (
    <div className="catalog-container">
      <button className="back-button" onClick={() => navigate('/')}>
        <ChevronLeft size={18} /> Volver a la página principal
      </button>

      {AlertaComponente}

      <div className="catalog-header">
        <h1 className="catalog-title">
          <BookOpen size={28} /> Catálogo de Proyectos
        </h1>
        <div className="category-badge">
          Categoría: {getCategoryName()}
        </div>
      </div>
      
      {loading ? (
        <div className="loading-overlay">
          {/* Aquí puedes poner un componente Spinner si lo tienes */}
          <div className="loading-spinner">
            <BookOpen size={48} />
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="empty-state">
          <p>No hay proyectos registrados en esta categoría.</p>
        </div>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre del Proyecto</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={project.id || index}>
                <td>{project.owner_username || 'N/A'}</td>
                <td>{project.name || 'Sin Nombre'}</td>
                <td>Archivos Subidos</td>
                <td>
                  <span className="status subido">
                    <CheckCircle size={16} />
                    Subido
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Catalogo;