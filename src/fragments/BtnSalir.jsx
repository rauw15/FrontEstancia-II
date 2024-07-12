import React from 'react'
import url from '../assets/images/salir.svg'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();
  const handleCargar = () => {
    localStorage.setItem('token', ' ');
    sessionStorage.clear();
    navigate('/login');

  };
  return (
    <div style={btnStyle} onClick={() => handleCargar()}>
      <button style={btnStyle}>Salir <img src={url} alt="salir" style={img}  /></button>
    </div>
  )
}

export default BtnSalir
