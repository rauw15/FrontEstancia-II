import React from 'react'
import url from '../assets/images/salir.svg'
const btnStyle={
  width:'100%',
  height: '90%',
  background: 'rgba(50,50,50,0)',
  color: '#D5D1C7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  fontSize: '1.5rem',
  border: 'none'
}
const img = {
  height: '90%',
}
function BtnSalir() {
  return (
    <div style={btnStyle}>
      <button style={btnStyle}>Salir <img src={url} alt="salir" style={img} /></button>
    </div>
  )
}

export default BtnSalir
