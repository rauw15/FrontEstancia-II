import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import { ChevronLeft, BookOpen, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

function Catalogo() {
  const categoria = [
    'Proyecto Social', 
    'Emprendimiento Tecnológico', 
    'Innovación en Productos y Servicios', 
    'Energías Limpias y Sustentabilidad Ambiental'
  ];
  
  const location = useLocation();
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [activeCategory, setActiveCategory] = useState('');
  const token = localStorage.getItem('token');
  const [proyectos, setProyectos] = useState({
    proyectoSocial: [],
    emprendimientoTecnologico: [],
    innovacionProductosServicios: [],
    energias: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const determineActiveCategory = () => {
      if (location.pathname.includes('proyectoSocial')) {
        setActiveCategory('proyectoSocial');
      } else if (location.pathname.includes('emprendimientoTecnologico')) {
        setActiveCategory('emprendimientoTecnologico');
      } else if (location.pathname.includes('innovacionProductosServicios')) {
        setActiveCategory('innovacionProductosServicios');
      } else if (location.pathname.includes('energias')) {
        setActiveCategory('energias');
      }
    };

    determineActiveCategory();
    handleGetProyectos();
  }, [location.pathname]);

  const handleGetProyectos = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_GETPRALL, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });
      
      const result = await response.json();
      
      if (response.ok) {
        const categorizedProjects = {
          proyectoSocial: [],
          emprendimientoTecnologico: [],
          innovacionProductosServicios: [],
          energias: []
        };

        result.forEach(user => {
          const projectData = {
            nameUser: user.username,
            proyectoName: user.proyectos.length > 0 ? user.proyectos[0].name : '----',
            descripcion: user.proyectos.length > 0 ? 'Archivos Subidos' : 'Archivos No Subidos',
            estado: user.proyectos.length > 0 ? 'subido' : 'noSubido'
          };

          switch(user.categoria) {
            case 'Proyecto Social':
              categorizedProjects.proyectoSocial.push(projectData);
              break;
            case 'Emprendimiento Tecnológico':
              categorizedProjects.emprendimientoTecnologico.push(projectData);
              break;
            case 'Innovación en Productos y Servicios':
              categorizedProjects.innovacionProductosServicios.push(projectData);
              break;
            case 'Energías Limpias y Sustentabilidad Ambiental':
              categorizedProjects.energias.push(projectData);
              break;
            default:
              break;
          }
        });

        setProyectos(categorizedProjects);
      } else {
        showAlerta(result.message || 'Error al obtener proyectos', 'error');
      }
    } catch (error) {
      showAlerta('Error en el servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentProjects = () => {
    switch(activeCategory) {
      case 'proyectoSocial':
        return proyectos.proyectoSocial;
      case 'emprendimientoTecnologico':
        return proyectos.emprendimientoTecnologico;
      case 'innovacionProductosServicios':
        return proyectos.innovacionProductosServicios;
      case 'energias':
        return proyectos.energias;
      default:
        return [];
    }
  };

  const getCategoryName = () => {
    switch(activeCategory) {
      case 'proyectoSocial':
        return categoria[0];
      case 'emprendimientoTecnologico':
        return categoria[1];
      case 'innovacionProductosServicios':
        return categoria[2];
      case 'energias':
        return categoria[3];
      default:
        return '';
    }
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
          <ChevronLeft size={18} /> Volver al menú principal
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
            <div className="loading-spinner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ) : getCurrentProjects().length === 0 ? (
          <div className="empty-state">
            <p>No hay proyectos registrados en esta categoría</p>
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
              {getCurrentProjects().map((proyecto, index) => (
                <tr key={index}>
                  <td>{proyecto.nameUser}</td>
                  <td>{proyecto.proyectoName}</td>
                  <td>{proyecto.descripcion}</td>
                  <td>
                    <span className={`status ${proyecto.estado}`}>
                      {proyecto.estado === 'subido' ? (
                        <CheckCircle size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {proyecto.estado === 'subido' ? 'Subido' : 'No subido'}
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