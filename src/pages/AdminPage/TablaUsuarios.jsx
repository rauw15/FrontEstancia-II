// TablaUsuarios.jsx

import React, { useState, useEffect } from 'react';
import './tablaUsuarios.css'; // <-- Importamos el archivo CSS aquí
import { useAlerta } from '../../fragments/Alerta';
import { RefreshCw, Plus, Trash2, User, Users, ChevronDown, Trophy, FileText, X, Menu, ClipboardCheck, Download, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BtnSalir from '../../fragments/BtnSalir';
import '../../assets/css/seccioncss.css'; // Este import se mantiene
import BtnExportarExcel from '../../fragments/BtnExportarExcel';
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
        headers: { 'x-access-token': token },
      });
      const result = await response.json();
      if (response.ok) {
        setUsuarios(result.usuarios || []);
        setEvaluadores(result.evaluadores || []);
        setAdminUser(true);
      } else {
        setAdminUser(false);
        showAlerta(`${result.message} ¿Usuario admin?` || 'Error en la solicitud', 'error');
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

  const handleAgregarUsuario = async () => {
    if (!nombre || !nombreUsuario || !contraseña || !correo) {
      showAlerta(<p>Por favor llena todos los campos.</p>);
      return;
    }

    if (adminUser) {
      try {
        const response = await fetch(import.meta.env.VITE_API_SUP, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
          showAlerta(<p>Evaluador agregado correctamente</p>, 'success');
          handleGetUsuarios();
          handleBorrarFormulario();
          setMostrarFormularioAgregar(false);
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
  };

  const handleEliminarUsuario = () => {
    const userInput = window.prompt("Ingrese 'DELETE' para confirmar la eliminación:");
    if (userInput === 'DELETE') {
      const fetchDat = async () => {
        try {
          const encodedUsername = encodeURIComponent(nombreUsuarioEliminar.trim());
          const response = await fetch(`${import.meta.env.VITE_API_DEL}/${encodedUsername}`, {
            method: 'DELETE',
            headers: { 'x-access-token': token },
          });

          const result = await response.json();
          if (response.ok) {
            showAlerta(<p>Usuario eliminado correctamente</p>, 'success');
            handleGetUsuarios();
            setNombreUsuarioEliminar('');
            setMostrarFormularioEliminar(false);
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
  };

  return (
    <>
      <div className="main-container">
        {/* Header */}
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
                    <button className="dropdown-item" onClick={() => { navigate('/admin/calificacionesAdmin'); setShowAdmin(false); }}>
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
              </div>
              <button className="refresh-btn" onClick={handleGetUsuarios} disabled={isLoading}>
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
                datos={mostrarUsuarios ? usuarios : evaluadores}
                nombreArchivo={mostrarUsuarios ? 'Usuarios' : 'Evaluadores'}
                className="action-btn"
              />
            </div>

            {!mostrarUsuarios && (
              <div className="actions-container">
                <button className="action-btn add" onClick={() => setMostrarFormularioAgregar(true)}>
                  <Plus size={16} /> Agregar Evaluador
                </button>
                <button className="action-btn delete" onClick={() => setMostrarFormularioEliminar(true)}>
                  <Trash2 size={16} /> Eliminar Evaluador
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