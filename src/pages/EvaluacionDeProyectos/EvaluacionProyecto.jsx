import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ClipboardCheck, Star, MessageSquare, Send, ChevronDown, Menu, X, Users, FileText, Trophy, Calendar, Download } from 'lucide-react';
import BtnSalir from '../../fragments/BtnSalir';
import { useAuth } from '../../AuthProvider';

// Importar los archivos CSS
import '../../assets/css/seccioncss.css';
import './catalogo.css';
import './EvaluacionProyecto.css'; // <<-- NUEVO IMPORT
import * as apiService from '../../services/apiService';

// Importar imagen usada en el JSX
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';

const tiposProyectos = [
  { value: 'proyectoSocial', label: 'Proyecto Social' },
  { value: 'emprendimientoTecnologico', label: 'Emprendimiento Tecnológico' },
  { value: 'innovacionProductosServicios', label: 'Innovación en Productos y Servicios' },
  { value: 'energias', label: 'Energías Limpias y Sustentabilidad Ambiental' }
];

// Mapeo de categorías de la base de datos a valores del frontend
const categoriaMapping = {
  'Proyecto Social': 'proyectoSocial',
  'Emprendimiento Tecnológico': 'emprendimientoTecnologico',
  'Innovación en Productos y Servicios': 'innovacionProductosServicios',
  'Energías Limpias y Sustentabilidad Ambiental': 'energias'
};

const EvaluacionProyecto = () => {
  const { tipo } = useParams();
  const [proyectos, setProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [evaluador, setEvaluador] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [calificaciones, setCalificaciones] = useState({
    innovacion: { mejora: 0, utilidad: 0, oportunidad: 0, ventaja: 0 },
    mercado: { rentabilidad: 0, logo: 0, competencia: 0, necesidades: 0 },
    tecnica: { tecnologia: 0, recursos: 0, respuesta: 0 },
    financiera: { inversion: 0, recuperacion: 0, financiamiento: 0 },
    pitch: { presentacion: 0, claridad: 0, prototipo: 0 }
  });
  const [tipoProyecto, setTipoProyecto] = useState('todos'); // Cambiar a 'todos' por defecto
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [proyectosConEstado, setProyectosConEstado] = useState([]); // [{id, nombre, calificado, calificacionData}]
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [calificacionId, setCalificacionId] = useState(null); // Para actualizar si ya existe
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Obtener todos los proyectos y su estado de calificación
  useEffect(() => {
    const fetchProyectos = async () => {
      setIsLoading(true);
      try {
        const proyectosApi = await apiService.getAllProjects();
        
        // Para cada proyecto, consultar si tiene calificación
        const proyectosEstado = await Promise.all(proyectosApi.map(async (proy) => {
          let calificacion = null;
          try {
            const calif = await apiService.getCalificacionesByProyectoId(proy.id);
            if (calif && calif.length > 0) {
              calificacion = calif[0];
            }
          } catch (e) { /* Puede no tener calificación */ }
          
          // Mapear la categoría de la base de datos al valor esperado por el frontend
          const categoriaDB = proy.category || proy.categoria || 'Proyecto Social';
          const tipoMapeado = categoriaMapping[categoriaDB] || 'proyectoSocial';
          
          return {
            id: proy.id,
            nombre: proy.name,
            tipo: tipoMapeado,
            calificado: !!calificacion,
            calificacionData: calificacion
          };
        }));
        setProyectosConEstado(proyectosEstado);
        setIsLoading(false);
      } catch (err) {
        setProyectosConEstado([]);
        setIsLoading(false);
      }
    };
    fetchProyectos();
  }, []);

  // Filtrar proyectos según el tipo seleccionado
  const proyectosFiltrados = useMemo(() => {
    if (!tipoProyecto || tipoProyecto === 'todos') return proyectosConEstado;
    return proyectosConEstado.filter(proy => proy.tipo === tipoProyecto);
  }, [proyectosConEstado, tipoProyecto]);

  // Limpiar selección de proyecto cuando cambie el tipo
  useEffect(() => {
    setSelectedProjectId('');
    setCalificacionId(null);
    setEvaluador(user?.username || '');
    setComentarios('');
    setCalificaciones({
      innovacion: { mejora: 0, utilidad: 0, oportunidad: 0, ventaja: 0 },
      mercado: { rentabilidad: 0, logo: 0, competencia: 0, necesidades: 0 },
      tecnica: { tecnologia: 0, recursos: 0, respuesta: 0 },
      financiera: { inversion: 0, recuperacion: 0, financiamiento: 0 },
      pitch: { presentacion: 0, claridad: 0, prototipo: 0 }
    });
  }, [tipoProyecto, user]);

  // Cuando seleccionas un proyecto, carga su calificación si existe
  useEffect(() => {
    if (!selectedProjectId) return;
    const proyecto = proyectosFiltrados.find(p => p.id === parseInt(selectedProjectId));
    if (proyecto && proyecto.calificado && proyecto.calificacionData) {
      // Cargar datos de calificación
      setCalificacionId(proyecto.calificacionData.id);
      setEvaluador(proyecto.calificacionData.evaluador_username || proyecto.calificacionData.evaluador || (user?.username || ''));
      setComentarios(proyecto.calificacionData.observaciones || '');
      
      // Los datos vienen como números individuales del backend, no como objetos
      // Necesitamos crear objetos con valores por defecto para cada subcampo
      const innovacionValue = parseFloat(proyecto.calificacionData.innovacion) || 0;
      const mercadoValue = parseFloat(proyecto.calificacionData.mercado) || 0;
      const tecnicaValue = parseFloat(proyecto.calificacionData.tecnica) || 0;
      const financieraValue = parseFloat(proyecto.calificacionData.financiera) || 0;
      const pitchValue = parseFloat(proyecto.calificacionData.pitch) || 0;
      
      setCalificaciones({
        innovacion: { 
          mejora: innovacionValue, 
          utilidad: innovacionValue, 
          oportunidad: innovacionValue, 
          ventaja: innovacionValue 
        },
        mercado: { 
          rentabilidad: mercadoValue, 
          logo: mercadoValue, 
          competencia: mercadoValue, 
          necesidades: mercadoValue 
        },
        tecnica: { 
          tecnologia: tecnicaValue, 
          recursos: tecnicaValue, 
          respuesta: tecnicaValue 
        },
        financiera: { 
          inversion: financieraValue, 
          recuperacion: financieraValue, 
          financiamiento: financieraValue 
        },
        pitch: { 
          presentacion: pitchValue, 
          claridad: pitchValue, 
          prototipo: pitchValue 
        }
      });
    } else {
      // Limpiar formulario
      setCalificacionId(null);
      setEvaluador(user?.username || '');
      setComentarios('');
      setCalificaciones({
        innovacion: { mejora: 0, utilidad: 0, oportunidad: 0, ventaja: 0 },
        mercado: { rentabilidad: 0, logo: 0, competencia: 0, necesidades: 0 },
        tecnica: { tecnologia: 0, recursos: 0, respuesta: 0 },
        financiera: { inversion: 0, recuperacion: 0, financiamiento: 0 },
        pitch: { presentacion: 0, claridad: 0, prototipo: 0 }
      });
    }
  }, [selectedProjectId, proyectosFiltrados, user]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRatingChange = (section, field, value) => {
    setCalificaciones(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: parseInt(value)
      }
    }));
  };

  const calcularPromedio = (section) => {
    const values = Object.values(calificaciones[section]);
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
    
    const proyectoSeleccionado = proyectosFiltrados.find(p => p.id === parseInt(selectedProjectId));
    if (!proyectoSeleccionado) {
      alert('Por favor selecciona un proyecto válido.');
      return;
    }

    // Preparar los datos para enviar al backend
    const datos = {
      proyectoId: proyectoSeleccionado.id, // Campo requerido por el backend
      evaluador: user?.username || '',
      nombreProyecto: proyectoSeleccionado.nombre,
      // Enviar los promedios como números (no objetos JSON)
      innovacion: parseFloat(calcularPromedio('innovacion')),
      mercado: parseFloat(calcularPromedio('mercado')),
      tecnica: parseFloat(calcularPromedio('tecnica')),
      financiera: parseFloat(calcularPromedio('financiera')),
      pitch: parseFloat(calcularPromedio('pitch')),
      observaciones: comentarios,
      // Calcular el total como promedio de los 5 criterios (0-5)
      total: (
        parseFloat(calcularPromedio('innovacion')) + 
        parseFloat(calcularPromedio('mercado')) + 
        parseFloat(calcularPromedio('tecnica')) + 
        parseFloat(calcularPromedio('financiera')) + 
        parseFloat(calcularPromedio('pitch'))
      ) / 5
    };

    try {
      if (calificacionId) {
        // Actualizar calificación existente
        await apiService.updateCalificacion(calificacionId, datos);
        alert('Calificación actualizada correctamente!');
      } else {
        // Crear nueva calificación
        await apiService.createCalificacion(datos);
        alert('Calificación enviada correctamente!');
      }
      
      // Limpiar formulario después de enviar
      setSelectedProjectId('');
      setCalificacionId(null);
      setEvaluador('');
      setComentarios('');
      setTipoProyecto('todos'); // Resetear a 'todos'
      setCalificaciones({
        innovacion: { mejora: 0, utilidad: 0, oportunidad: 0, ventaja: 0 },
        mercado: { rentabilidad: 0, logo: 0, competencia: 0, necesidades: 0 },
        tecnica: { tecnologia: 0, recursos: 0, respuesta: 0 },
        financiera: { inversion: 0, recuperacion: 0, financiamiento: 0 },
        pitch: { presentacion: 0, claridad: 0, prototipo: 0 }
      });
    } catch (error) {
      console.error('Error al enviar calificación:', error);
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        alert('No tienes permisos para actualizar esta calificación. Solo el evaluador original o un administrador puede modificarla.');
      } else if (error.message.includes('Evaluator ID and Project ID are required')) {
        alert('Error: Faltan datos requeridos. Por favor, asegúrate de seleccionar un proyecto.');
      } else {
        alert(`Error al enviar la calificación: ${error.message}`);
      }
    }
  };

  if (isLoading) return <div>Cargando proyectos...</div>;

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
              {/* Inicio Admin */}
              <button
                className="nav-item"
                onClick={() => navigate('/admin')}
              >
                <ClipboardCheck size={18} />
                Inicio
              </button>
              {/* Calificar */}
              {/* <button
                className="nav-item"
                onClick={() => navigate('/admin/EvaluacionProyecto')}
              >
                <Trophy size={18} />
                Calificar
              </button> */}

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
                        <ClipboardCheck size={16} className="icon" />
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
                      Plantilla descargable Resumen Ejecutivo
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

        <div className="contenido-evaluacion">
          <div className="evaluation-container">
            <div className="evaluation-header">
              <h1><ClipboardCheck size={28} /> Evaluación de Proyectos</h1>
              <p>Complete el formulario para evaluar los proyectos participantes</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Selección de tipo de proyecto */}
              <div className="form-group">
                <label htmlFor="tipoProyecto">Tipo de Proyecto:</label>
                <select
                  id="tipoProyecto"
                  className="form-control"
                  value={tipoProyecto}
                  onChange={e => setTipoProyecto(e.target.value)}
                >
                  <option value="todos">Todos los proyectos</option>
                  {tiposProyectos.map(tp => (
                    <option key={tp.value} value={tp.value}>{tp.label}</option>
                  ))}
                </select>
              </div>

              {/* Información básica */}
              <div className="form-group">
                <label htmlFor="evaluador">Evaluador(a):</label>
                <input
                  type="text"
                  id="evaluador"
                  className="form-control"
                  value={evaluador}
                  readOnly
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombreProyecto">Nombre del Proyecto:</label>
                <select
                  id="nombreProyecto"
                  className="form-control"
                  value={selectedProjectId}
                  onChange={e => setSelectedProjectId(e.target.value)}
                  required
                >
                  <option value="">Selecciona un proyecto...</option>
                  {proyectosFiltrados.map(proy => (
                    <option key={proy.id} value={proy.id}>
                      {proy.nombre} {proy.calificado ? '(Calificado)' : '(Sin calificar)'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rating-scale">
                <div className="scale-item"><span className="scale-value">5</span> Excelente</div>
                <div className="scale-item"><span className="scale-value">4</span> Muy buena</div>
                <div className="scale-item"><span className="scale-value">3</span> Buena</div>
                <div className="scale-item"><span className="scale-value">2</span> Regular</div>
                <div className="scale-item"><span className="scale-value">1</span> Deficiente</div>
              </div>

              {/* Nivel de Innovación */}
              <h3 className="section-title"><Star size={20} /> Nivel de Innovación</h3>
              <div className="criteria-item">
                <div className="criteria-text">Mejora de un producto o servicio</div>
                <div className="rating-options">
                  {[5, 4, 3, 2, 1].map(num => (
                    <div key={`mejora-${num}`} className="rating-option">
                      <input
                        type="radio"
                        id={`mejora-${num}`}
                        name="mejora"
                        value={num}
                        checked={calificaciones.innovacion.mejora === num}
                        onChange={() => handleRatingChange('innovacion', 'mejora', num)}
                      />
                      <label htmlFor={`mejora-${num}`}>{num}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="criteria-item">
                <div className="criteria-text">Útil para la sociedad</div>
                <div className="rating-options">
                  {[5, 4, 3, 2, 1].map(num => (
                    <div key={`utilidad-${num}`} className="rating-option">
                      <input
                        type="radio"
                        id={`utilidad-${num}`}
                        name="utilidad"
                        value={num}
                        checked={calificaciones.innovacion.utilidad === num}
                        onChange={() => handleRatingChange('innovacion', 'utilidad', num)}
                      />
                      <label htmlFor={`utilidad-${num}`}>{num}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="criteria-item">
                <div className="criteria-text">Oportunidad en el mercado</div>
                <div className="rating-options">
                  {[5, 4, 3, 2, 1].map(num => (
                    <div key={`oportunidad-${num}`} className="rating-option">
                      <input
                        type="radio"
                        id={`oportunidad-${num}`}
                        name="oportunidad"
                        value={num}
                        checked={calificaciones.innovacion.oportunidad === num}
                        onChange={() => handleRatingChange('innovacion', 'oportunidad', num)}
                      />
                      <label htmlFor={`oportunidad-${num}`}>{num}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="criteria-item">
                <div className="criteria-text">Ventaja competitiva</div>
                <div className="rating-options">
                  {[5, 4, 3, 2, 1].map(num => (
                    <div key={`ventaja-${num}`} className="rating-option">
                      <input
                        type="radio"
                        id={`ventaja-${num}`}
                        name="ventaja"
                        value={num}
                        checked={calificaciones.innovacion.ventaja === num}
                        onChange={() => handleRatingChange('innovacion', 'ventaja', num)}
                      />
                      <label htmlFor={`ventaja-${num}`}>{num}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-summary">
                <span>Promedio Innovación:</span>
                <div className="section-score">{calcularPromedio('innovacion')}</div>
              </div>
                                  {/* Factibilidad del Mercado */}
                                  <h3 className="section-title"><Star size={20} /> Factibilidad del Mercado</h3>
                    <div className="criteria-item">
                      <div className="criteria-text">Potencial de mercado para ser rentable</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`rentabilidad-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`rentabilidad-${num}`}
                              name="rentabilidad"
                              value={num}
                              checked={calificaciones.mercado.rentabilidad === num}
                              onChange={() => handleRatingChange('mercado', 'rentabilidad', num)}
                            />
                            <label htmlFor={`rentabilidad-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Logo de la empresa</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`logo-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`logo-${num}`}
                              name="logo"
                              value={num}
                              checked={calificaciones.mercado.logo === num}
                              onChange={() => handleRatingChange('mercado', 'logo', num)}
                            />
                            <label htmlFor={`logo-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Conocimiento de la competencia</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`competencia-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`competencia-${num}`}
                              name="competencia"
                              value={num}
                              checked={calificaciones.mercado.competencia === num}
                              onChange={() => handleRatingChange('mercado', 'competencia', num)}
                            />
                            <label htmlFor={`competencia-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Satisface las necesidades del cliente</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`necesidades-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`necesidades-${num}`}
                              name="necesidades"
                              value={num}
                              checked={calificaciones.mercado.necesidades === num}
                              onChange={() => handleRatingChange('mercado', 'necesidades', num)}
                            />
                            <label htmlFor={`necesidades-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="section-summary">
                      <span>Promedio Mercado:</span>
                      <div className="section-score">{calcularPromedio('mercado')}</div>
                    </div>

                    {/* Factibilidad Técnica */}
                    <h3 className="section-title"><Star size={20} /> Factibilidad Técnica</h3>
                    <div className="criteria-item">
                      <div className="criteria-text">Involucra tecnología</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`tecnologia-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`tecnologia-${num}`}
                              name="tecnologia"
                              value={num}
                              checked={calificaciones.tecnica.tecnologia === num}
                              onChange={() => handleRatingChange('tecnica', 'tecnologia', num)}
                            />
                            <label htmlFor={`tecnologia-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Facilidad de obtención de recursos</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`recursos-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`recursos-${num}`}
                              name="recursos"
                              value={num}
                              checked={calificaciones.tecnica.recursos === num}
                              onChange={() => handleRatingChange('tecnica', 'recursos', num)}
                            />
                            <label htmlFor={`recursos-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Capacidad de respuesta al cliente</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`respuesta-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`respuesta-${num}`}
                              name="respuesta"
                              value={num}
                              checked={calificaciones.tecnica.respuesta === num}
                              onChange={() => handleRatingChange('tecnica', 'respuesta', num)}
                            />
                            <label htmlFor={`respuesta-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="section-summary">
                      <span>Promedio Técnica:</span>
                      <div className="section-score">{calcularPromedio('tecnica')}</div>
                    </div>

                    {/* Factibilidad Financiera */}
                    <h3 className="section-title"><Star size={20} /> Factibilidad Financiera</h3>
                    <div className="criteria-item">
                      <div className="criteria-text">Inversión inicial accesible</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`inversion-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`inversion-${num}`}
                              name="inversion"
                              value={num}
                              checked={calificaciones.financiera.inversion === num}
                              onChange={() => handleRatingChange('financiera', 'inversion', num)}
                            />
                            <label htmlFor={`inversion-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Periodo de recuperación de inversión</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`recuperacion-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`recuperacion-${num}`}
                              name="recuperacion"
                              value={num}
                              checked={calificaciones.financiera.recuperacion === num}
                              onChange={() => handleRatingChange('financiera', 'recuperacion', num)}
                            />
                            <label htmlFor={`recuperacion-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Financiamiento factible</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`financiamiento-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`financiamiento-${num}`}
                              name="financiamiento"
                              value={num}
                              checked={calificaciones.financiera.financiamiento === num}
                              onChange={() => handleRatingChange('financiera', 'financiamiento', num)}
                            />
                            <label htmlFor={`financiamiento-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="section-summary">
                      <span>Promedio Financiera:</span>
                      <div className="section-score">{calcularPromedio('financiera')}</div>
                    </div>

                    {/* Pitch y prototipo */}
                    <h3 className="section-title"><Star size={20} /> Pitch (3 minutos) y prototipo</h3>
                    <div className="criteria-item">
                      <div className="criteria-text">Buena presentación</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`presentacion-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`presentacion-${num}`}
                              name="presentacion"
                              value={num}
                              checked={calificaciones.pitch.presentacion === num}
                              onChange={() => handleRatingChange('pitch', 'presentacion', num)}
                            />
                            <label htmlFor={`presentacion-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Información clara del pitch</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`claridad-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`claridad-${num}`}
                              name="claridad"
                              value={num}
                              checked={calificaciones.pitch.claridad === num}
                              onChange={() => handleRatingChange('pitch', 'claridad', num)}
                            />
                            <label htmlFor={`claridad-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="criteria-item">
                      <div className="criteria-text">Explicación clara de Prototipo</div>
                      <div className="rating-options">
                        {[5, 4, 3, 2, 1].map(num => (
                          <div key={`prototipo-${num}`} className="rating-option">
                            <input
                              type="radio"
                              id={`prototipo-${num}`}
                              name="prototipo"
                              value={num}
                              checked={calificaciones.pitch.prototipo === num}
                              onChange={() => handleRatingChange('pitch', 'prototipo', num)}
                            />
                            <label htmlFor={`prototipo-${num}`}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="section-summary">
                      <span>Promedio Pitch:</span>
                      <div className="section-score">{calcularPromedio('pitch')}</div>
                    </div>

              {/* Comentarios */}
              <div className="comments-section">
                <label htmlFor="comentarios"><MessageSquare size={18} /> Comentarios:</label>
                <textarea
                  id="comentarios"
                  className="form-control"
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  placeholder="Escribe aquí tus comentarios adicionales sobre el proyecto..."
                />
              </div>

              <button type="submit" className="submit-btn">
                <Send size={18} /> {calificacionId ? 'Actualizar evaluación' : 'Enviar evaluación'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">¡Calificación enviada correctamente!</h2>
            <button
              className="modal-btn"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EvaluacionProyecto;