import React from 'react'
import url from '../assets/images/salir.svg'
import { useNavigate } from 'react-router-dom'
import './BtnSalir.css'

function BtnSalir() {
  const navigate = useNavigate();
  const handleCargar = () => {
    localStorage.setItem('token', ' ');
    sessionStorage.clear();
    navigate('/login');
  };
  return (
    <button className="btn-salir-moderno" onClick={handleCargar}>
      <span>Salir</span>
      <img src={url} alt="salir" className="icono-salir" />
    </button>
  )
}

export default BtnSalir
