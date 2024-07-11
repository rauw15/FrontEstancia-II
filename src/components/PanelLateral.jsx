import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import DesplieguePanel from '../fragments/DesplieguePanel'
import DespliegueAlumno from '../fragments/DespliegueAlumno'
import url from '../assets/images/ocultar.svg'
import urlFondo from '../assets/images/logoUp.jpg'
import urlDoc from '../assets/images/document.svg';
import urlDes from '../assets/images/despliegue.svg';
import Alerta, {useAlerta} from '../fragments/Alerta'
const panelEstilo = {
  background: '#2D2D2D',
  color: '#FFFFFF',
  height: '100%',
  width: '20rem',
  position: 'absolute',
  overflow: 'auto',
  overflowX: 'hidden'
}
const logo={
  height: '20%',
}
const botonOcultar = {
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '4%',
  paddingRight: '4%'
}
const img = {
  height: '70%',
  width: '10%',
  objectFit: 'contain',
}
const img2 = {
  height: '80%',
  width: '10%',
  objectFit: 'contain',
};
const despliegue = {
  height: '2.2rem',
  display: 'flex',
  alignItems: 'center'
};
const despliegue2 = {
  height: '1.9rem',
  width: '80%',
  marginLeft: '10%',
  paddingRight: '10%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  fontSize: '0.9rem',
};
const des = {
  display: 'flex',
  alignItems: 'center',
  width: '98%',
  justifyContent: 'end',
  position: 'absolute'
};
const fondo = {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '5px'
}
const boton = {
  height: '2.2rem',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '1rem'
};

function PanelLateral({onHamburguerClick}) {
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const location = useLocation();
  const isInicioHome = location.pathname.startsWith('/inicio');
  const isAlumno = location.pathname.startsWith('/alumno');
  const [showCategorias, setShowCategorias] = useState(false);
  const [rotated, setRotated] = useState(false);
  
  const saludo = sessionStorage.getItem('nameUser');
  // const [nulo, setNulo] = useState('');
  const handleNavigate = (path) => {
      navigate(path);
  };
  const rotationStyle = {
    transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.5s ease' // Agrega una transición para una animación suave
  };
  const [clicked, setClicked] = useState(true);
  const handleSesion = () => {
    navigate('/login');
  };
  const handleClick = () => {
    setClicked(false);
    onHamburguerClick();
  }
  const handleRot = () =>{
    setRotated(!rotated);
    setShowCategorias(!showCategorias);
  }
  const handleCatalogoClick = (rute) => {
    if (isInicioHome) {
      navigate(`/inicio/catalogo/${rute}`);
    } else if (isAlumno) {
      navigate(`/alumno/catalogo/${rute}`);
    }
  };

  return (
    <div className='panelLateral borde' style={panelEstilo}>
      {AlertaComponente}
      <div className="opciones-barraLateral bordeW" style={logo}><img src={urlFondo} alt="fUp" style={fondo} onClick={() => handleNavigate('/alumno')} /></div>
      <div className="opciones-barraLateral bordeW" style={botonOcultar} onClick={handleClick}>Ocultar <img src={url} alt="oc" style={img}/></div>
      {isInicioHome && <DesplieguePanel></DesplieguePanel>}
      {isAlumno && <DespliegueAlumno></DespliegueAlumno>}
      <div className="bordeW opciones-barraLateral" style={despliegue} onClick={() => handleRot()}>
        <img src={urlDoc} alt="doc" style={img} />Catálogo de Proyectos<div style={des}><img src={urlDes} alt="des" style={rotationStyle} /></div>
       </div>
       {showCategorias && (
              
              <div>
                <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleCatalogoClick('proyectoSocial')}>
                  <img src={urlDoc} alt="doc" style={img} />Proyecto Social
              </div>
              <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleCatalogoClick('emprendimientoTecnologico')}>
                  <img src={urlDoc} alt="doc" style={img} />Emprendimiento Tecnológico
              </div>
              <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleCatalogoClick('innovacionProductosServicios')}>
                  <img src={urlDoc} alt="doc" style={img} />Innovación en Productos y Servicios
              </div>
              <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleCatalogoClick('energias')}>
                  <img src={urlDoc} alt="doc" style={img} />Energías Limpias y Sustentabilidad Ambiental
              </div>
              </div>
              
          )}
      <div className='opciones-barraLateral bordeW' style={boton} onClick={() => handleSesion()}>{saludo == null ? 'Iniciar sesión' : `Hola ${saludo}`}</div>
    </div>
  )
}

export default PanelLateral
