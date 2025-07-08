import React, { useState, useEffect, useMemo } from 'react';
// 1. IMPORTAMOS useParams
import { useParams, useNavigate } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import { ChevronLeft, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import * as apiService from '../../services/apiService';

// Mantenemos el mapeo como nuestra "fuente de verdad"
const CATEGORY_MAP = {
  proyectoSocial: 'Proyecto Social',
  emprendimientoTecnologico: 'Emprendimiento Tecnológico',
  innovacionProductosServicios: 'Innovación en Productos y Servicios',
  energias: 'Energías Limpias y Sustentabilidad Ambiental'
};

function Catalogo() {
  // 2. USAMOS useParams para obtener el parámetro de la ruta
  const { categoryKey } = useParams(); // Esto nos dará 'proyectoSocial', 'energias', etc.
  
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect para obtener los datos (se ejecuta solo una vez al montar)
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
  }, []); // El array vacío [] sigue siendo correcto, queremos los datos solo una vez

  // 3. Lógica de FILTRADO (ahora usa 'categoryKey' de useParams)
  // useMemo se re-ejecutará automáticamente cuando 'categoryKey' cambie
  const filteredProjects = useMemo(() => {
    if (!categoryKey || !CATEGORY_MAP[categoryKey]) {
      return [];
    }
    const categoryName = CATEGORY_MAP[categoryKey];
    return allProjects.filter(project => 
      project.category?.trim().toLowerCase() === categoryName.trim().toLowerCase()
    );
  }, [allProjects, categoryKey]); // Depende de la lista completa y de la clave de la URL

  // 4. Función para obtener el nombre legible (simplificada)
  const getCategoryName = () => {
    return CATEGORY_MAP[categoryKey] || 'Categoría no válida';
  };

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
      --color-success: #10b981;
      --color-warning: #f59e0b;
      --color-error: #ef4444;
    }

    .catalog-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--color-gray-100);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      color: var(--color-gray-700);
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 1.5rem;
    }

    .back-button:hover {
      background: var(--color-gray-200);
      color: var(--color-primary);
    }

    .catalog-header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .catalog-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-gray-800);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .category-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, rgba(15, 118, 110, 0.1), rgba(20, 184, 166, 0.1));
      border: 1px solid var(--color-primary-light);
      border-radius: 2rem;
      padding: 0.5rem 1.5rem;
      font-weight: 600;
      color: var(--color-primary);
    }

    .projects-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: var(--color-white);
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .projects-table thead th {
      background: var(--color-primary);
      color: var(--color-white);
      padding: 1rem;
      text-align: left;
      font-weight: 600;
    }

    .projects-table tbody tr {
      transition: background 0.2s ease;
    }

    .projects-table tbody tr:nth-child(even) {
      background: var(--color-gray-50);
    }

    .projects-table tbody tr:hover {
      background: var(--color-gray-100);
    }

    .projects-table td {
      padding: 1rem;
      border-bottom: 1px solid var(--color-gray-200);
      color: var(--color-gray-700);
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status.subido {
      background: rgba(16, 185, 129, 0.1);
      color: var(--color-success);
    }

    .status.noSubido {
      background: rgba(239, 68, 68, 0.1);
      color: var(--color-error);
    }

    .loading-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    .loading-spinner {
      animation: spin 1s linear infinite;
      color: var(--color-primary);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--color-gray-500);
    }

    @media (max-width: 768px) {
      .projects-table {
        display: block;
        overflow-x: auto;
      }
      
      .catalog-title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="catalog-container">
        <button className="back-button" onClick={() => navigate('/alumno')}>
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
            {/* ... tu spinner ... */}
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
    </>
  );
}

export default Catalogo;