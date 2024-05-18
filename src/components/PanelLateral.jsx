import React from 'react'
import DesplieguePanel from '../fragments/DesplieguePanel'
import url from '../assets/images/ocultar.svg'
import urlFondo from '../assets/images/logoUp.jpg'
const panelEstilo = {
  background: '#2D2D2D',
  color: '#FFFFFF',
  height: '100%',
  width: '20%',
  position: 'absolute'
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

function PanelLateral() {
  return (
    <div className='panelLateral borde' style={panelEstilo}>
      <div className="bordeW" style={logo}><img src={urlFondo} alt="fUp" style={fondo} /></div>
      <div className="opciones-barraLateral bordeW" style={botonOcultar}>Ocultar <img src={url} alt="oc" style={img}/></div>
      <DesplieguePanel></DesplieguePanel>
    </div>
  )
}

export default PanelLateral
