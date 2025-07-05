import React, { useState } from 'react';
import BtnSalir from '../../fragments/BtnSalir';
import url from '../../assets/images/menuHamburguer.svg';
import '../Head/head2.css';

function Head({ onHamburguerClick }) {
  const [clicked, setClicked] = useState(false);

  const headEstilo = {
    width: '98%',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '1%',
    paddingRight: '1%'
  };
  const btnSalir = {
    marginLeft: 'auto',
    width: '10rem',
    height: '100%',
  };
  const titulo = {
    width: '60%',
    position: 'absolute'
  };
  const img = {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  };
  const containerImg = {
    height: '80%',
    width: '2rem',
    cursor: 'pointer'
  };
  const handleClick = () => {
    setClicked(true);
    if (onHamburguerClick) onHamburguerClick();
  };
  return (
    <div className='bar head_had2' style={headEstilo}>
      <div id='btnH_head2' style={containerImg} onClick={handleClick}><img src={url} alt="hmb" style={img} /></div>
      <div className='' id='titulo' style={titulo}>5TA FERIA DE EMPRENDIMIENTO E INNOVACIÓN SOCIAL</div>
      <div id='btnSalir' style={btnSalir}><BtnSalir></BtnSalir></div>
    </div>
  );
}

export default Head;
