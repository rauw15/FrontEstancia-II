import React, { useState, useEffect } from 'react';
import './tablaUsuarios.css';
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, Plus, Trash2, User, Users, X, Menu, ClipboardCheck, Download, ChevronRight, ChevronDown, Trophy, FileText } from 'lucide-react';
import { useNavigate, Navigate, NavLink } from 'react-router-dom';
import BtnSalir from '../../fragments/BtnSalir';
import '../../assets/css/seccioncss.css';
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';
import { useAuth } from '../../AuthProvider';
import * as apiService from '../../services/apiService';

const TablaUsuarios = () => {
  const { isAdmin, isLoggedIn, loading: authLoading } = useAuth();
  
  // Estados para la UI
  const [mostrarUsuarios, setMostrarUsuarios] = useState(true);
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRecursos, setShowRecursos] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Estados para los formularios
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [categoria, setCategoria] = useState('Proyecto Social');
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Estados para los datos
  const [todosLosUsuarios, setTodosLosUsuarios] = useState([]);
  
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();

  // --- LÓGICA DE DATOS REFACTORIZADA ---
  const usuariosGenerales = todosLosUsuarios.filter(u => 
    !u.roles.includes('admin') && !u.roles.includes('evaluador') && !u.roles.includes('moderator')
  );

  const evaluadores = todosLosUsuarios.filter(u => u.roles.includes('evaluador'));

  const cargarTodosLosDatos = async () => {
    setIsLoading(true);
    try {
      const usuariosResponse = await apiService.getAllUsers();
      const usuariosConRoles = await Promise.all(
        usuariosResponse.map(async (usuario) => {
          const rolesResponse = await apiService.getUserRoles(usuario.id);
          const roleNames = rolesResponse.map(role => role.name);
          return { ...usuario, roles: roleNames };
        })
      );
      setTodosLosUsuarios(usuariosConRoles);
    } catch (error) {
      showAlerta('Error al cargar datos: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarTodosLosDatos();
  }, []);

  // --- LÓGICA DE FORMULARIOS ---
  const handleBorrarFormulario = () => {
    setNombre('');
    setNombreUsuario('');
    setContraseña('');
    setCorreo('');
  };

  const handleCerrarFormularioAgregar = () => {
    setMostrarFormularioAgregar(false);
    handleBorrarFormulario();
  };
  
  const handleCerrarFormularioEliminar = () => {
    setMostrarFormularioEliminar(false);
    setUsuarioAEliminar(null);
  };

  // --- LÓGICA DE ACCIONES (CREAR/ELIMINAR) ---
  const handleAgregarEvaluador = async () => {
    if (!nombre || !nombreUsuario || !contraseña || !correo) {
      showAlerta('Por favor llena todos los campos.', 'error');
      return;
    }
    setIsLoading(true);
    try {
      const userData = {
        username: nombreUsuario,
        email: correo,
        password: contraseña,
        nombre: nombre,
        carrera: categoria,
      };
      const nuevoUsuario = await apiService.register(userData);
      if (!nuevoUsuario || !nuevoUsuario.id) {
        throw new Error("El registro no devolvió un usuario con ID.");
      }
      // ID del rol 'evaluador' es 4
      await apiService.assignRoleToUser({ userId: nuevoUsuario.id, roleId: 4 });
      showAlerta('Evaluador agregado y rol asignado correctamente', 'success');
      cargarTodosLosDatos();
      handleCerrarFormularioAgregar();
    } catch (error) {
      showAlerta('Error al agregar evaluador: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const iniciarEliminacion = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarFormularioEliminar(true);
  };

  const handleEliminarUsuario = async () => {
    if (!usuarioAEliminar) return;
    const userInput = window.prompt(`Para confirmar la eliminación de "${usuarioAEliminar.username}", escribe "ELIMINAR":`);
    if (userInput !== 'ELIMINAR') {
      showAlerta('Operación cancelada.', 'info');
      return;
    }
    setIsLoading(true);
    try {
      await apiService.deleteUser(usuarioAEliminar.id);
      showAlerta('Usuario eliminado correctamente', 'success');
      cargarTodosLosDatos();
      handleCerrarFormularioEliminar();
    } catch (error) {
      showAlerta('Error al eliminar usuario: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (authLoading) return <div className="loading-overlay">Cargando autenticación...</div>;
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="main-container">
        {/* Header Completo */}
        <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <img src={logoUpImg} alt="Logo UP Chiapas" />
              </div>
              <div className="logo-text">
                <h1>UP Chiapas</h1>
                <p>Panel de Administración</p>
              </div>
            </div>

            <nav className="desktop-nav">
              <button className="nav-item" onClick={() => navigate('/admin')}>
                <ClipboardCheck size={18} /> Inicio
              </button>
              <div className="dropdown-parent">
                <button
                  className={`nav-item ${showAdmin ? 'nav-active' : ''}`}
                  onClick={() => setShowAdmin(!showAdmin)}
                >
                  <Users size={18} /> Administrador <ChevronDown size={16} className={`transition-transform ${showAdmin ? 'rotate-180' : ''}`} />
                </button>
                {showAdmin && (
                  <div className="dropdown">
                    <button className="dropdown-item" onClick={() => { navigate('/admin/tablaAdmin'); setShowAdmin(false); }}>
                      <Users size={16} className="icon" /> Usuarios Registrados
                    </button>
                    <button className="dropdown-item" onClick={() => { navigate('/evaluador/calificaciones'); setShowAdmin(false); }}>
                      <Trophy size={16} className="icon" /> Calificaciones
                    </button>
                  </div>
                )}
              </div>
              <div className="dropdown-parent">
                <button
                  className={`nav-item ${showRecursos ? 'nav-active' : ''}`}
                  onClick={() => setShowRecursos(!showRecursos)}
                >
                  <FileText size={18} /> Recursos <ChevronDown size={16} className={`transition-transform ${showRecursos ? 'rotate-180' : ''}`} />
                </button>
                {showRecursos && (
                  <div className="dropdown">
                    <a className="dropdown-item" href={'/downloads/CONVOCATORIA 5 FERIA EMPRENDIMIENTO.pdf'} download>
                      <Download size={16} className="icon" /> Convocatoria
                    </a>
                  </div>
                )}
              </div>
            </nav>

            <div className="user-section">
              <BtnSalir />
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-btn">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
             <div className="mobile-menu">
              <div className="mobile-menu-content">
                  <button className="mobile-nav-item" onClick={() => {navigate('/admin'); setIsMenuOpen(false);}}>
                    <span>Inicio</span>
                  </button>
                  <button className="mobile-nav-item" onClick={() => setShowAdmin(!showAdmin)}>
                    <span>Administrador</span> <ChevronRight size={16} />
                  </button>
                  {showAdmin && (
                    <div className="mobile-dropdown">
                      <button className="mobile-dropdown-item" onClick={() => { navigate('/admin/tablaAdmin'); setIsMenuOpen(false); }}>
                        Usuarios Registrados
                      </button>
                      <button className="mobile-dropdown-item" onClick={() => { navigate('/admin/calificacionesAdmin'); setIsMenuOpen(false); }}>
                        Calificaciones
                      </button>
                    </div>
                  )}
              </div>
             </div>
          )}
        </header>

        {/* Contenido Principal */}
        <div className="admin-container">
          <div className="admin-content">
            {AlertaComponente}
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-content">
                  <RefreshCw className="loading-spinner" size={32} />
                  <span className="loading-text">Cargando...</span>
                </div>
              </div>
            )}

            <div className="admin-header">
              <div className="header-title">
                <h2>
                  <Users size={24} />
                  {mostrarUsuarios ? 'Usuarios Registrados' : 'Evaluadores'}
                  <span>{mostrarUsuarios ? usuariosGenerales.length : evaluadores.length}</span>
                </h2>
              </div>
              <button className="refresh-btn" onClick={cargarTodosLosDatos} disabled={isLoading}>
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="tabs-container">
              <button className={`tab-btn ${mostrarUsuarios ? 'active' : ''}`} onClick={() => setMostrarUsuarios(true)}>
                <Users size={16} /> Usuarios
              </button>
              <button className={`tab-btn ${!mostrarUsuarios ? 'active' : ''}`} onClick={() => setMostrarUsuarios(false)}>
                <User size={16} /> Evaluadores
              </button>
              <BtnExportarExcel
                datos={mostrarUsuarios ? usuariosGenerales : evaluadores}
                nombreArchivo={mostrarUsuarios ? 'Usuarios' : 'Evaluadores'}
                className="action-btn"
              />
            </div>

            {!mostrarUsuarios && (
              <div className="actions-container">
                <button className="action-btn add" onClick={() => setMostrarFormularioAgregar(true)}>
                  <Plus size={16} /> Agregar Evaluador
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
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosGenerales.length > 0 ? (
                      usuariosGenerales.map((usuario) => (
                        <tr key={usuario.id}>
                          <td>{usuario.username}</td>
                          <td>{usuario.email}</td>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.carrera}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="empty-state">
                          <h3>No hay usuarios generales registrados</h3>
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
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluadores.length > 0 ? (
                      evaluadores.map((evaluador) => (
                        <tr key={evaluador.id}>
                          <td>{evaluador.username}</td>
                          <td>{evaluador.email}</td>
                          <td>{evaluador.nombre}</td>
                          <td>{evaluador.carrera}</td>
                          <td>
                            <button className="action-btn-cell delete" onClick={() => iniciarEliminacion(evaluador)}>
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="empty-state">
                          <h3>No hay evaluadores registrados</h3>
                          <p>Agrega nuevos evaluadores usando el botón superior.</p>
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
                <button className="modal-close" onClick={handleCerrarFormularioAgregar}><X size={20} /></button>
              </div>
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Nombre de usuario:</label>
                <input type="text" className="form-control" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input type="password" className="form-control" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Correo:</label>
                <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Categoría a Evaluar:</label>
                <select className="select-control" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="Proyecto Social">Proyecto Social</option>
                  <option value="Emprendimiento Tecnológico">Emprendimiento Tecnológico</option>
                  <option value="Innovación en Productos y Servicios">Innovación en Productos y Servicios</option>
                  <option value="Energías Limpias y Sustentabilidad Ambiental">Energías Limpias y Sustentabilidad Ambiental</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCerrarFormularioAgregar}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleAgregarEvaluador} disabled={isLoading}>
                  {isLoading ? 'Agregando...' : 'Agregar'}
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
                <h3>Confirmar Eliminación</h3>
                <button className="modal-close" onClick={handleCerrarFormularioEliminar}><X size={20} /></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que quieres eliminar al usuario <strong>{usuarioAEliminar?.username}</strong>? Esta acción no se puede deshacer.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCerrarFormularioEliminar}>Cancelar</button>
                <button className="btn btn-danger" onClick={handleEliminarUsuario} disabled={isLoading}>
                  {isLoading ? 'Eliminando...' : 'Sí, eliminar'}
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