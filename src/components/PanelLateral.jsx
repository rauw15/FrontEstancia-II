import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DesplieguePanel from '../fragments/DesplieguePanel'
import DespliegueAlumno from '../fragments/DespliegueAlumno'
import url from '../assets/images/ocultar.svg'
import urlFondo from '../assets/images/logoUp.jpg'
const panelEstilo = {
  background: '#2D2D2D',
  color: '#FFFFFF',
  height: '100%',
  width: '20rem',
  position: 'absolute',
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
const fondo = {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '5px'
}

function PanelLateral({onHamburguerClick}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isInicioHome = location.pathname.startsWith('/inicio')
  const isAlumno = location.pathname.startsWith('/alumno')
  const handleNavigate = (path) => {
      navigate(path);
  };
  const [clicked, setClicked] = useState(true);

  const handleClick = () => {
    setClicked(false);
    onHamburguerClick();
  }
  return (
    <div className='panelLateral borde' style={panelEstilo}>
      <div className="opciones-barraLateral bordeW" style={logo}><img src={urlFondo} alt="fUp" style={fondo} onClick={() => handleNavigate('/inicio/')} /></div>
      <div className="opciones-barraLateral bordeW" style={botonOcultar} onClick={handleClick}>Ocultar <img src={url} alt="oc" style={img}/></div>
      {isInicioHome && <DesplieguePanel></DesplieguePanel>}
      {isAlumno && <DespliegueAlumno></DespliegueAlumno>}
    </div>
  )
}

export default PanelLateral
