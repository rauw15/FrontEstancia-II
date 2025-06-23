import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import DesplieguePanel from '../fragments/DesplieguePanel';
import DespliegueAlumno from '../fragments/DespliegueAlumno';
import urlFondo from '../assets/images/logoUp.jpg';
import urlDoc from '../assets/images/document.svg';
import urlDes from '../assets/images/despliegue.svg';
import Alerta, { useAlerta } from '../fragments/Alerta';

const user = {
  name: sessionStorage.getItem('nameUser') || 'Invitado',
  role: 'Usuario',
  avatar: (sessionStorage.getItem('nameUser') || 'IN').slice(0, 2).toUpperCase()
};

function PanelLateral({ onHamburguerClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [AlertaComponente, showAlerta] = useAlerta();
  const isInicioHome = location.pathname.startsWith('/inicio');
  const isAlumno = location.pathname.startsWith('/alumno');
  const [showCategorias, setShowCategorias] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
    if (onHamburguerClick) onHamburguerClick();
  };

  const handleRot = () => {
    setRotated(!rotated);
    setShowCategorias(!showCategorias);
  };

  const handleSesion = () => {
    navigate('/login');
    setIsOpen(false);
    if (onHamburguerClick) onHamburguerClick();
  };

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
        <div className="user-info">
          <div className="avatar">{user.avatar}</div>
          <div>
            <div className="username">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
          <div className="online-indicator"></div>
        </div>
        <nav className="nav">
          {isInicioHome && <DesplieguePanel />}
          {isAlumno && <DespliegueAlumno />}
          <button className="nav-item" onClick={handleRot}>
            <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 20, verticalAlign: 'middle' }} /></span>
            <span className="label">Catálogo de Proyectos</span>
            <span className="icon" style={{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><img src={urlDes} alt="des" style={{ width: 16 }} /></span>
          </button>
          {showCategorias && (
            <div style={{ paddingLeft: 24 }}>
              <button className="nav-item" onClick={() => handleNavigate(isInicioHome ? '/inicio/catalogo/proyectoSocial' : '/alumno/catalogo/proyectoSocial')}>
                <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
                <span className="label">Proyecto Social</span>
              </button>
              <button className="nav-item" onClick={() => handleNavigate(isInicioHome ? '/inicio/catalogo/emprendimientoTecnologico' : '/alumno/catalogo/emprendimientoTecnologico')}>
                <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
                <span className="label">Emprendimiento Tecnológico</span>
              </button>
              <button className="nav-item" onClick={() => handleNavigate(isInicioHome ? '/inicio/catalogo/innovacionProductosServicios' : '/alumno/catalogo/innovacionProductosServicios')}>
                <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
                <span className="label">Innovación en Productos y Servicios</span>
              </button>
              <button className="nav-item" onClick={() => handleNavigate(isInicioHome ? '/inicio/catalogo/energias' : '/alumno/catalogo/energias')}>
                <span className="icon"><img src={urlDoc} alt="doc" style={{ width: 18 }} /></span>
                <span className="label">Energías Limpias y Sustentabilidad Ambiental</span>
              </button>
            </div>
          )}
        </nav>
        <div className="logout">
          <button className="logout-btn" onClick={handleSesion}>
            🚪 <span>{user.name === 'Invitado' ? 'Iniciar sesión' : 'Cerrar Sesión'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default PanelLateral;
