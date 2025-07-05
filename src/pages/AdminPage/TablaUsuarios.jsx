import React, { useState, useEffect } from 'react';
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, Plus, Trash2, User, Users, ChevronDown, ChevronUp, Trophy, Calendar, FileText, X, Menu, ClipboardCheck, Download, ChevronRight, Lightbulb, Star, Target, Heart, Zap, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BtnSalir from '../../fragments/BtnSalir';
import '../../assets/css/seccioncss.css';
// Importamos el componente
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
// Importar imágenes
import rombosImg from '../../assets/images/rombos.png';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';

const TablaUsuarios = () => {
  const [mostrarUsuarios, setMostrarUsuarios] = useState(true);
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [categoria, setCategoria] = useState('Proyecto Social');
  const [nombreUsuarioEliminar, setNombreUsuarioEliminar] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [evaluadores, setEvaluadores] = useState([]);
  const [AlertaComponente, showAlerta] = useAlerta();
  const token = localStorage.getItem('token');
  const [adminUser, setAdminUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalificar, setShowCalificar] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBorrarFormulario = () => {
    setCorreo('');
    setNombre('');
    setNombreUsuario('');
    setContraseña('');
  };

  const handleGetUsuarios = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_USU, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setUsuarios(result.usuarios || []);
        setEvaluadores(result.evaluadores || []);
        setAdminUser(true);
      } else {
        setAdminUser(false);
        showAlerta(`${result.message} usuario admin?` || 'Error en la solicitud', 'error');
      }
    } catch (error) {
      showAlerta('Error en el servidor', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUsuarios();
  }, []);

  const handleAgregar = () => {
    setMostrarFormularioAgregar(true);
  };

  const handleEliminar = () => {
    setMostrarFormularioEliminar(true);
  };

  const handleCerrarFormularioAgregar = () => {
    setMostrarFormularioAgregar(false);
  };

  const handleCerrarFormularioEliminar = () => {
    setMostrarFormularioEliminar(false);
  };

  const handleAgregarUsuario = async () => {
    if (!nombre || !nombreUsuario || !contraseña || !correo) {
      showAlerta(<p>Por favor llena todos los campos.</p>);
      return;
    }

    if (adminUser) {
      try {
        const response = await fetch(import.meta.env.VITE_API_SUP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: nombreUsuario,
            email: correo,
            password: contraseña,
            nombre: nombre,
            carrera: categoria,
            categoria: 'Evaluador',
            roles: ["moderator"]
          })
        });

        if (response.ok) {
          showAlerta(
            <>
              <p>Evaluador agregado correctamente</p>
            </>, 'success'
          );
          handleGetUsuarios();
        } else {
          showAlerta(
            <>
              <p>Error al guardar los datos. Por favor, intente nuevamente.</p>
              <span>Posible causa: nombre de usuario ya registrado</span>
            </>, 'error'
          );
        }
      } catch (error) {
        showAlerta(<p>Error de conexión. Por favor, intente nuevamente.</p>, 'error');
      }
    } else {
      showAlerta(<p>No tienes permisos de administrador</p>, 'error');
    }
    handleBorrarFormulario();
    setMostrarFormularioAgregar(false);
  };

  const handleEliminarUsuario = () => {
    const userInput = window.prompt("Ingrese 'DELETE' para confirmar:");
    if (userInput === 'DELETE') {
      const fetchDat = async () => {
        try {
          const encodedUsername = encodeURIComponent(nombreUsuarioEliminar.trim());
          const response = await fetch(`${import.meta.env.VITE_API_DEL}/${encodedUsername}`, {
            method: 'DELETE',
            headers: {
              'x-access-token': token,
            },
          });

          const result = await response.json();
          if (response.ok) {
            showAlerta(<p>Usuario eliminado correctamente</p>, 'success');
            handleGetUsuarios();
          } else {
            showAlerta(result.message || 'Error en la solicitud', 'error');
          }
        } catch (error) {
          showAlerta('Error en el servidor', 'error');
        }
      };

      fetchDat();
    } else {
      showAlerta(<p>Operación cancelada. El usuario no se eliminó.</p>, 'info');
    }

    setNombreUsuarioEliminar('');
    setMostrarFormularioEliminar(false);
  };

  const styles = `
    /* Estilos consistentes con AdminPanel */
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
      background-image: url(${rombosImg});
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
      position: fixed;
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
      color: var(--color-primary) !important;
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
      font-weight: 500;
    }

    .dropdown-item:hover {
      background: var(--color-primary-light);
      color: var(--color-white) !important;
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

    .logout-btn {
      background: none;
      border: none;
      color: var(--color-gray-500);
      font-size: 0.875rem;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .logout-btn:hover {
      color: var(--color-gray-700);
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
    .admin-container {
      background: var(--color-gray-50);
      min-height: 100vh;
      padding: 2rem;
      padding-top: 6rem;
      max-width: 1280px;
      margin: 0 auto;
    }

    .admin-content {
      background: var(--color-white);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--color-gray-200);
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header-title h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title span {
      font-size: 1rem;
      color: var(--color-primary);
      background: var(--color-gray-100);
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
    }

    .refresh-btn {
      background: var(--color-gray-100);
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .refresh-btn:hover {
      background: var(--color-gray-200);
      color: var(--color-primary);
    }

    .tabs-container {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-gray-200);
      padding-bottom: 0.5rem;
    }

    .tab-btn {
      background: none;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-gray-600);
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tab-btn.active {
      background: var(--color-primary-light);
      color: var(--color-white);
    }

    .tab-btn:hover:not(.active) {
      background: var(--color-gray-100);
    }

    .actions-container {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .action-btn {
      background: var(--color-gray-100);
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .action-btn.add {
      background: var(--color-primary-light);
      color: var(--color-white);
    }

    .action-btn.delete {
      background: rgba(239, 68, 68, 0.1);
      color: rgba(239, 68, 68, 1);
    }

    .action-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .action-btn.add:hover {
      background: var(--color-primary);
    }

    .action-btn.delete:hover {
      background: rgba(239, 68, 68, 0.2);
    }

    .table-container {
      overflow-x: auto;
      border-radius: 0.75rem;
      border: 1px solid var(--color-gray-200);
    }

    .seccion_tabla {
      width: 100%;
      border-collapse: collapse;
    }

    .seccion_tabla thead {
      background: var(--color-gray-50);
    }

    .seccion_tabla th {
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-gray-700);
      border-bottom: 1px solid var(--color-gray-200);
    }

    .seccion_tabla td {
      padding: 1rem;
      font-size: 0.875rem;
      color: var(--color-gray-600);
      border-bottom: 1px solid var(--color-gray-200);
    }

    .seccion_tabla tr:last-child td {
      border-bottom: none;
    }

    .seccion_tabla tr:hover td {
      background: var(--color-gray-50);
    }

    /* Modal Styles */
    .modal-overlay {
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

    .modal-content {
      background: var(--color-white);
      border-radius: 1rem;
      padding: 2rem;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .modal-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-gray-800);
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--color-gray-500);
      cursor: pointer;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-gray-700);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-primary-light);
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
    }

    .select-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background-color: var(--color-white);
      cursor: pointer;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: var(--color-primary-light);
      color: var(--color-white);
      border: none;
    }

    .btn-primary:hover {
      background: var(--color-primary);
    }

    .btn-secondary {
      background: var(--color-white);
      color: var(--color-gray-700);
      border: 1px solid var(--color-gray-300);
    }

    .btn-secondary:hover {
      background: var(--color-gray-50);
    }

    /* Loading state */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .loading-spinner {
      animation: spin 1s linear infinite;
      color: var(--color-primary);
    }

    .loading-text {
      color: var(--color-gray-600);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 3rem 0;
    }

    .empty-state h3 {
      font-size: 1.25rem;
      color: var(--color-gray-700);
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: var(--color-gray-500);
      font-size: 0.875rem;
    }

    /* Responsive */
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
      .admin-container {
        padding: 1rem;
        padding-top: 5rem;
      }

      .admin-content {
        padding: 1.5rem;
      }

      .actions-container {
        flex-direction: column;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
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
              {/* Inicio */}
              <button
                className="nav-item"
                onClick={() => navigate('/admin')}
              >
                <ClipboardCheck size={18} />
                Inicio
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
                    navigate('/admin');
                    setIsMenuOpen(false);
                  }}
                >
                  <span>Inicio</span>
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
                  <div className="mobile-dropdown-item">
                    <a
                      className="mobile-dropdown-item"
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
                        setShowRecursos(false);
                      }}
                    >
                      <FileText size={16} className="icon" />
                      Lineamientos de participación
                    </button>
                    <a
                      className="mobile-dropdown-item"
                      href={'/downloads/FICHA Tecnica Emprendimiento e Innovación 2025.docx'}
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Ficha técnica
                    </a>
                    <a
                      className="mobile-dropdown-item"
                      href={'/downloads/plantilla-canvas-descargable.pptx'}
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Plantilla Modelo Canvas
                    </a>
                    <a
                      className="mobile-dropdown-item"
                      href={'/downloads/MATERIAL APOYO MODELO CANVAS.pdf'}
                      download
                      onClick={() => setShowRecursos(false)}
                    >
                      <Download size={16} className="icon" />
                      Material Apoyo Modelo Canvas
                    </a>
                    <a
                      className="mobile-dropdown-item"
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
                  <span className="loading-text">Cargando usuarios...</span>
                </div>
              </div>
            )}

            <div className="admin-header">

              <div className="header-title">

                <h2>
                  <Users size={24} />
                  {mostrarUsuarios ? 'Usuarios Registrados' : 'Evaluadores'}
                  <span>{mostrarUsuarios ? usuarios.length : evaluadores.length}</span>
                </h2>
                {mostrarUsuarios && (
                  <p>Usuarios sin evaluar: {usuarios.length - evaluadores.length}</p>
                )}
              </div>
              <button
                className="refresh-btn"
                onClick={handleGetUsuarios}
                disabled={isLoading}
              >
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="tabs-container">
              <button
                className={`tab-btn ${mostrarUsuarios ? 'active' : ''}`}
                onClick={() => setMostrarUsuarios(true)}
              >
                <Users size={16} />
                Usuarios
              </button>
              <button
                className={`tab-btn ${!mostrarUsuarios ? 'active' : ''}`}
                onClick={() => setMostrarUsuarios(false)}
              >
                <User size={16} />
                Evaluadores
              </button>

              <BtnExportarExcel
                datos={mostrarUsuarios ? usuarios : evaluadores}
                nombreArchivo={mostrarUsuarios ? 'Usuarios' : 'Evaluadores'}
                className="action-btn"
              />
            </div>



            {!mostrarUsuarios && (
              <div className="actions-container">
                <button
                  className="action-btn add"
                  onClick={handleAgregar}
                >
                  <Plus size={16} />
                  Agregar Evaluador
                </button>
                <button
                  className="action-btn delete"
                  onClick={handleEliminar}
                >
                  <Trash2 size={16} />
                  Eliminar Evaluador
                </button>
              </div>
            )}

            <div className="table-container">
              {mostrarUsuarios ? (
                <table className="seccion_tabla">
                  <thead>
                    <tr>
                      <th>Nombre de usuario</th>
                      <th>Email</th>
                      <th>Nombre</th>
                      <th>Carrera</th>
                      <th>Cuatrimestre</th>
                      <th>Categoría</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.length > 0 ? (
                      usuarios.map((usuario, index) => (
                        <tr key={index}>
                          <td>{usuario.username}</td>
                          <td>{usuario.email}</td>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.carrera}</td>
                          <td>{usuario.cuatrimestre}</td>
                          <td>{usuario.categoria}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="empty-state">
                          <h3>No hay usuarios registrados</h3>
                          <p>No se encontraron usuarios en la base de datos</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="seccion_tabla">
                  <thead>
                    <tr>
                      <th>Nombre de usuario</th>
                      <th>Email</th>
                      <th>Nombre</th>
                      <th>Categoría a Evaluar</th>
                      <th>Nivel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluadores.length > 0 ? (
                      evaluadores.map((evaluador, index) => (
                        <tr key={index}>
                          <td>{evaluador.username}</td>
                          <td>{evaluador.email}</td>
                          <td>{evaluador.nombre}</td>
                          <td>{evaluador.carrera}</td>
                          <td>{evaluador.categoria}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="empty-state">
                          <h3>No hay evaluadores registrados</h3>
                          <p>Agrega nuevos evaluadores usando el botón superior</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Modal Agregar Evaluador */}
        {mostrarFormularioAgregar && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Agregar Evaluador</h3>
                <button className="modal-close" onClick={handleCerrarFormularioAgregar}>
                  <X size={20} />
                </button>
              </div>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nombre de usuario:</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Correo:</label>
                <input
                  type="text"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Categoría a Evaluar:</label>
                <select
                  className="select-control"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="Proyecto Social">Proyecto Social</option>
                  <option value="Emprendimiento Tecnológico">Emprendimiento Tecnológico</option>
                  <option value="Innovación en Productos y Servicios">Innovación en Productos y Servicios</option>
                  <option value="Energías Limpias y Sustentabilidad Ambiental">Energías Limpias y Sustentabilidad Ambiental</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCerrarFormularioAgregar}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleAgregarUsuario}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Eliminar Evaluador */}
        {mostrarFormularioEliminar && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Eliminar Evaluador</h3>
                <button className="modal-close" onClick={handleCerrarFormularioEliminar}>
                  <X size={20} />
                </button>
              </div>
              <div className="form-group">
                <label>Nombre de usuario a eliminar:</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombreUsuarioEliminar}
                  onChange={(e) => setNombreUsuarioEliminar(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCerrarFormularioEliminar}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleEliminarUsuario}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TablaUsuarios;