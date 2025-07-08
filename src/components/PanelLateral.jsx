import React, { useState } from 'react';
import './Sidebar.css'; // Asegúrate de que los estilos CSS que te di antes estén en este archivo
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider'; 
import DesplieguePanel from '../fragments/DesplieguePanel';
import DespliegueAlumno from '../fragments/DespliegueAlumno';
import urlFondo from '../assets/images/logoUp.jpg';
import urlDoc from '../assets/images/document.svg';
import urlDes from '../assets/images/despliegue.svg';

// NOTA: Se eliminó la importación de 'Alerta' ya que no se usaba en el panel.

function PanelLateral({ onHamburguerClick }) {
  // 1. Obtenemos el estado de autenticación (sin cambios)
  const { isLoggedIn, user, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Estados locales para la UI del panel
  const isAlumno = location.pathname.startsWith('/alumno');
  const [showCategorias, setShowCategorias] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // 2. Preparamos los datos del usuario de forma más robusta
  const displayName = isLoggedIn && user ? user.username : 'Invitado';
  const displayRole = isLoggedIn && user?.roles?.length > 0 ? user.roles.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ') : 'Usuario';
  const avatarText = (displayName || 'IN').slice(0, 2).toUpperCase();

  const handleNavigate = (path) => {
    navigate(path);
    if (onHamburguerClick) onHamburguerClick();
  };

  const handleRot = () => {
    setRotated(!rotated);
    setShowCategorias(!showCategorias);
  };

  // 3. Función de Logout ÚNICA Y CENTRALIZADA
  const handleAuthAction = () => {
    if (isLoggedIn) {
      authLogout(); // Llama a la función logout del AuthProvider
      navigate('/login'); // Redirige al login
    } else {
      navigate('/login'); // Si es invitado, lo manda a login
    }
    if (onHamburguerClick) onHamburguerClick();
  };

  // Componente interno para los enlaces del catálogo para no repetir código
  const CatalogoLinks = () => (
    <div style={{ paddingLeft: 24 }}>
      <NavLink className="nav-item" to={isAlumno ? '/alumno/catalogo/proyectoSocial' : '/inicio/catalogo/proyectoSocial'} onClick={() => handleNavigate(isAlumno ? '/alumno/catalogo/proyectoSocial' : '/inicio/catalogo/proyectoSocial')}>
        <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
        <span className="label">Proyecto Social</span>
      </NavLink>
      <NavLink className="nav-item" to={isAlumno ? '/alumno/catalogo/emprendimientoTecnologico' : '/inicio/catalogo/emprendimientoTecnologico'} onClick={() => handleNavigate(isAlumno ? '/alumno/catalogo/emprendimientoTecnologico' : '/inicio/catalogo/emprendimientoTecnologico')}>
        <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
        <span className="label">Emprendimiento Tecnológico</span>
      </NavLink>
      <NavLink className="nav-item" to={isAlumno ? '/alumno/catalogo/innovacionProductosServicios' : '/inicio/catalogo/innovacionProductosServicios'} onClick={() => handleNavigate(isAlumno ? '/alumno/catalogo/innovacionProductosServicios' : '/inicio/catalogo/innovacionProductosServicios')}>
        <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
        <span className="label">Innovación en Productos y Servicios</span>
      </NavLink>
      <NavLink className="nav-item" to={isAlumno ? '/alumno/catalogo/energias' : '/inicio/catalogo/energias'} onClick={() => handleNavigate(isAlumno ? '/alumno/catalogo/energias' : '/inicio/catalogo/energias')}>
        <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
        <span className="label">Energías Limpias y Sustentabilidad</span>
      </NavLink>
    </div>
  );

  return (
    <>
      {isOpen && <div className="overlay" onClick={() => { setIsOpen(false); if (onHamburguerClick) onHamburguerClick(); }} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo" onClick={() => handleNavigate(isAlumno ? '/alumno' : '/inicio/home')}>
            <img src={urlFondo} alt="logo" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <h2>UP Chiapas</h2>
          </div>
          <button className="close-btn" onClick={() => { setIsOpen(false); if (onHamburguerClick) onHamburguerClick(); }}>✖</button>
        </div>

        {/* --- SECCIÓN DE USUARIO SIMPLIFICADA Y CORREGIDA --- */}
        <div className="user-profile-section">
          <div className="user-avatar-sidebar">{avatarText}</div>
          <div className="user-details-sidebar">
            <span className="user-name-sidebar">{displayName}</span>
            <span className="user-role-sidebar">{displayRole}</span>
          </div>
        </div>
        {/* FIN DE SECCIÓN DE USUARIO */}

        <nav className="nav">
          {!isAlumno && <DesplieguePanel />}
          {isAlumno && <DespliegueAlumno />}
          <button className="nav-item" onClick={handleRot}>
            <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 20, verticalAlign: 'middle' }} /></span>
            <span className="label">Catálogo de Proyectos</span>
            <span className="icon" style={{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><img src={urlDes} alt="des" style={{ width: 16 }} /></span>
          </button>
          {showCategorias && <CatalogoLinks />}
        </nav>

        {/* --- BOTÓN DE AUTENTICACIÓN ÚNICO Y CLARO --- */}
        <div className="sidebar-footer">
          <button className="auth-action-btn" onClick={handleAuthAction}>
            <span>{isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default PanelLateral;