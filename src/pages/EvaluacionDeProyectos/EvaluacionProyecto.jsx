import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ClipboardCheck, Star, MessageSquare, Send, ChevronDown, Menu, X, Users, FileText, Trophy, Calendar, Download } from 'lucide-react';
import BtnSalir from '../../fragments/BtnSalir';
import '../../assets/css/seccioncss.css';
import './catalogo.css';

const tiposProyectos = [
  { value: 'proyectoSocial', label: 'Proyecto Social' },
  { value: 'emprendimientoTecnologico', label: 'Emprendimiento Tecnológico' },
  { value: 'innovacionProductosServicios', label: 'Innovación en Productos y Servicios' },
  { value: 'energias', label: 'Energías Limpias y Sustentabilidad Ambiental' }
];

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
  const [tipoProyecto, setTipoProyecto] = useState('proyectoSocial');
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de fetch de proyectos filtrados por tipo
    setTimeout(() => {
      setProyectos([
        { id: 1, nombre: 'Proyecto 1', tipo: tipo },
        { id: 2, nombre: 'Proyecto 2', tipo: tipo }
      ]);
      setIsLoading(false);
    }, 500);
  }, [tipo]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
    // Lógica para enviar la evaluación
    console.log({
      evaluador,
      nombreProyecto,
      calificaciones,
      comentarios,
      promedios: {
        innovacion: calcularPromedio('innovacion'),
        mercado: calcularPromedio('mercado'),
        tecnica: calcularPromedio('tecnica'),
        financiera: calcularPromedio('financiera'),
        pitch: calcularPromedio('pitch')
      }
    });
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
    }

    /* Fondo de rombos decorativos */
    .main-container::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/src/assets/images/rombos.png');
      background-repeat: repeat;
      background-size: 300px;
      opacity: 0.15;
      z-index: 0;
      pointer-events: none;
    }

    .main-container {
      position: relative;
      z-index: 1;
    }

    /* Header */
    .header {
 
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.3s ease;
      background: var(--color-white);
      border-bottom: 1px solid var(--color-gray-200);
    }

    .header-scrolled {
      box-shadow: 0 4px 20px rgba(15, 118, 110, 0.1);
      border-bottom-color: var(--color-primary-light);
    }

    .header-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(15, 118, 110, 0.2);
    }

    .logo-icon img {
      width: 2.2rem;
      height: 2.2rem;
      object-fit: contain;
      border-radius: 0.4rem;
    }

    .logo-text h1 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-gray-800);
      line-height: 1.2;
    }

    .logo-text p {
      font-size: 0.75rem;
      color: var(--color-gray-500);
    }

    /* Navegación desktop - MEJORADO */
    .desktop-nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .dropdown-parent {
      position: relative;
    }

    .nav-item {
      background: none;
      border: none;
      color: var(--color-gray-600);
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0.5rem 1rem;
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 0.5rem;
    }

    .nav-item:hover {
      background: var(--color-gray-50);
      color: var(--color-primary);
    }

    .nav-active {
      background: var(--color-primary-light);
      color: var(--color-white) !important;
    }

    .nav-active:hover {
      background: var(--color-primary);
    }

    .dropdown {
      position: absolute;
      top: 3rem;
      left: 0;
      background: var(--color-white);
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      z-index: 10;
      min-width: 240px;
      padding: 0.5rem;
      border: 1px solid var(--color-gray-200);
      opacity: 0;
      transform: translateY(-10px);
      visibility: hidden;
      transition: all 0.2s ease;
    }

    .dropdown-parent:hover .dropdown,
    .dropdown-parent:focus-within .dropdown {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }

    .dropdown-item {
      padding: 0.75rem 1.5rem;
      color: var(--color-gray-700);
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-radius: 0.5rem;
    }

    .dropdown-item:hover {
      background: var(--color-primary-light);
      color: var(--color-white);
    }

    .dropdown-item::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: var(--color-primary);
      border-radius: 50%;
      margin-right: 0.5rem;
      transition: all 0.2s ease;
    }

    .dropdown-item:hover::before {
      background: var(--color-white);
    }

    .dropdown-item .icon {
      width: 18px;
      height: 18px;
      color: var(--color-gray-500);
    }

    .dropdown-item:hover .icon {
      color: var(--color-white);
    }

    .transition-transform {
      transition: transform 0.2s ease;
    }

    /* Sección de usuario */
    .user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Menú móvil */
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--color-gray-700);
      cursor: pointer;
    }

    .mobile-menu {
      background: var(--color-white);
      border-top: 1px solid var(--color-gray-200);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .mobile-menu-content {
      padding: 1.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .mobile-nav-item {
      background: none;
      border: none;
      color: var(--color-gray-600);
      text-align: left;
      padding: 0.5rem 0;
      cursor: pointer;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mobile-nav-item:hover {
      color: var(--color-primary);
    }

    .mobile-dropdown {
      padding-left: 1rem;
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .mobile-dropdown-item {
      padding: 0.5rem 0;
      color: var(--color-gray-600);
      cursor: pointer;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .mobile-dropdown-item:hover {
      color: var(--color-primary);
    }

    /* Contenido principal */
    .contenido-evaluacion { 
      padding-top: 8rem;
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
    }

    .evaluation-container {
      background: var(--color-white);
      border-radius: 1.5rem;
      box-shadow: 0 8px 32px rgba(15, 118, 110, 0.1);
      border: 1px solid var(--color-gray-200);
      padding: 2rem;
    }

    .evaluation-header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--color-gray-100);
    }

    .evaluation-header h1 {
      font-size: 1.75rem;
      color: var(--color-gray-800);
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .evaluation-header p {
      color: var(--color-gray-600);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--color-gray-700);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-primary-light);
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
    }

    .section-title {
      font-size: 1.25rem;
      color: var(--color-primary);
      margin: 1.5rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-gray-200);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .criteria-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid var(--color-gray-100);
    }

    .criteria-text {
      flex: 1;
      color: var(--color-gray-700);
    }

    .rating-options {
      display: flex;
      gap: 0.5rem;
    }

    .rating-option {
      position: relative;
    }

    .rating-option input {
      position: absolute;
      opacity: 0;
    }

    .rating-option label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: var(--color-gray-100);
      color: var(--color-gray-600);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .rating-option input:checked + label {
      background: var(--color-primary);
      color: var(--color-white);
    }

    .rating-option input:focus + label {
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
    }

    .section-summary {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
      padding: 1rem;
      background: var(--color-gray-50);
      border-radius: 0.5rem;
    }

    .section-summary span {
      font-weight: 500;
      color: var(--color-gray-700);
    }

    .section-score {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-primary);
    }

    .comments-section {
      margin-top: 2rem;
    }

    .comments-section label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    textarea.form-control {
      min-height: 120px;
      resize: vertical;
    }

    .submit-btn {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border: none;
      padding: 1rem 2rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(15, 118, 110, 0.2);
      margin-top: 2rem;
      width: 100%;
    }

    .submit-btn:hover {
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.3);
    }

    .rating-scale {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: var(--color-gray-50);
      border-radius: 0.5rem;
    }

    .scale-item {
      text-align: center;
      font-size: 0.75rem;
      color: var(--color-gray-600);
    }

    .scale-value {
      font-weight: 600;
      color: var(--color-primary);
    }

    /* Modal de confirmación */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .modal-content {
      background: var(--color-white);
      padding: 2rem 2.5rem;
      border-radius: 1rem;
      box-shadow: 0 8px 32px rgba(20,184,166,0.15);
      text-align: center;
      min-width: 300px;
    }

    .modal-title {
      color: var(--color-primary);
      margin-bottom: 1rem;
    }

    .modal-btn {
      background: var(--color-primary);
      color: var(--color-white);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .modal-btn:hover {
      background: var(--color-primary-dark);
    }

    @media (max-width: 1024px) {
      .desktop-nav {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }

      .user-section {
        margin-left: auto;
      }
    }

    @media (max-width: 768px) {
      .header-content {
        padding: 1rem;
      }

      .contenido-evaluacion {
        padding: 1rem;
        padding-top: 9rem;
      }

      .evaluation-container {
        padding: 1.5rem;
      }

      .criteria-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .rating-options {
        width: 100%;
        justify-content: space-between;
      }
    }

    .dropdown-parent .dropdown-item {
      color: #111 !important;
    }

    .dropdown-parent .dropdown-item:hover {
      color: #111 !important;
      background: var(--color-primary-light);
    }
  `;

  if (isLoading) return <div>Cargando proyectos...</div>;

  return (
    <>
      <style>{styles}</style>
      <div className="main-container">
        {/* Header */}
        <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <img src="/src/assets/images/Logo Upchiapas png.png" alt="Logo UP Chiapas" style={{ width: '2.2rem', height: '2.2rem', objectFit: 'contain', borderRadius: '0.4rem' }} />
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
                      <ClipboardCheck size={16} className="icon" />
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
                  onChange={(e) => setEvaluador(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombreProyecto">Nombre del Proyecto:</label>
                <input
                  type="text"
                  id="nombreProyecto"
                  className="form-control"
                  value={nombreProyecto}
                  onChange={(e) => setNombreProyecto(e.target.value)}
                  required
                />
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
                <Send size={18} /> Enviar Evaluación
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