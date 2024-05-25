import React from 'react'
import url from '../assets/images/politecnicaFondo.png'
import { Position } from '@react-pdf-viewer/core'

const estiloLogo={
  color: 'rgba(50,50,50,0.6)',
  height: '100vh',
  width: '100%',
  // position: 'absolute'
}
const img={
  opacity: 0.3,
  height: '100%',
  width: '100%',
  objectFit: 'cover'
}

function LogoUpChiapas() {
  return (
    <div>
      <div id='logoUpChiapas' style={estiloLogo}><img src={url} alt="poli" style={img}/></div>
    </div>
  )
}

export default LogoUpChiapas
