import React from 'react'
import url from '../assets/images/document.svg'
import urlDes from '../assets/images/despliegue.svg'
const despliegue = {
  height: '2.2rem',
  display: 'flex',
  alignItems: 'center'
}
const img = {
  height: '80%',
  width: '10%',
  objectFit: 'contain',
}
const des = {
  display: 'flex',
  alignItems: 'center',
  width: '98%',
  justifyContent: 'end',
  position: 'absolute'
 
}
function DesplieguePanel() {
  return (
    <div>
      <div className="bordeW opciones-barraLateral" style={despliegue}><img src={url} alt="doc" style={img}/>Calificar</div>
      <div className="bordeW opciones-barraLateral" style={despliegue}><img src={url} alt="doc" style={img}/>Cambiar Contraseña</div>
      <div className="bordeW opciones-barraLateral" style={despliegue}><img src={url} alt="doc" style={img}/>Convocatoria <div style={des}><img src={urlDes} alt="des" /></div></div>
      <div className='bordeW opciones-barraLateral' style={despliegue}><img src={url} alt="doc" style={img}/>Catálogo <div style={des}><img src={urlDes} alt="des" /></div></div>
    </div>
  )
}

export default DesplieguePanel
