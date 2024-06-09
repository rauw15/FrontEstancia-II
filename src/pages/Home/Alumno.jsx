import React from 'react'
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import LogoUpChiapas from '../../components/LogoUpChiapas'
import Head from '../../components/Head/Head2'
import Footer from '../../components/Footer'
import PanelLateral from '../../components/PanelLateral'
import Formulario from '../InscripcionAlumnos/Formulario'
import Home from './Home'
import './alumno.css'

function Alumno() {
  //------------
  const location = useLocation();
  const [showInscripcion, setShowInscripcion] = useState(false);
  const isInicioHome = location.pathname === '/alumno';
  const isInscripcion = location.pathname === '/alumno/inscripcion';
  const isRaiz = location.pathname === '/';
  const [clickedHamburguer, setClickedHamburguer] = useState(true);
  //----------
  const handleHamburguerClick = () => {
    setClickedHamburguer(!clickedHamburguer);
  };
  //---------
  useEffect(() => {
    setShowInscripcion(location.pathname === '/alumno/inscripcion');
  }, [location]);
  //------------
  return (
    <div className='alumnoInicio'>
      <div className={`panel ${clickedHamburguer ? 'show' : ''}`} style={{ visibility: isRaiz ? 'hidden' : 'visible' }}>
       {clickedHamburguer && <PanelLateral onHamburguerClick={handleHamburguerClick}></PanelLateral>}
      </div>
      <div className="head" id='head'  style={{ opacity: isInicioHome ? 1 : 1 }}>
        <Head onHamburguerClick={handleHamburguerClick}></Head>
      </div>
      <div className="content_alumno borde2">
        <div className='logo_alumno' style={{ opacity: isInscripcion ? 0 : (isRaiz ? 0.5 : 1) }}>
        {(isInicioHome || isRaiz) && <LogoUpChiapas></LogoUpChiapas>}
        </div>
        {showInscripcion && <Formulario></Formulario>}
        {isRaiz && <Home/>}
      </div>
      <div className='footer' id='footer_alumno'  style={{ opacity: isInscripcion ? 0 : (isInicioHome ? 1 : 1) }}>
        
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Alumno
