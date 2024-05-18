import React from 'react'
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import LogoUpChiapas from '../../components/LogoUpChiapas'
import Head from '../../components/Head/Head2'
import Footer from '../../components/Footer'
import PanelLateral from '../../components/PanelLateral'
import Home from '../Home/Home'
import Evaluacion from './Evaluacion'
import './inicio.css'
function Inicio() {
  const location = useLocation();
  const [showHome, setShowHome] = useState(false);
  const [showEvaluacion, setShowEvaluacion] = useState(false);
  const isInicioHome = location.pathname === '/inicio/home';
  const isInicioEvaluacion = location.pathname === '/inicio/evaluacion'
  const [clickedHamburguer, setClickedHamburguer] = useState(false);
  const handleHamburguerClick = () => {
    setClickedHamburguer(!clickedHamburguer);
  };
  useEffect(() => {
    setShowHome(location.pathname === '/inicio/home');
  }, [location]);
  useEffect(() => {
    setShowEvaluacion(location.pathname === '/inicio/evaluacion');
  }, [location]);
  
  return (
    <div className='borde todo'>
      {showHome && <Home />}
      <div className="panel">
       {clickedHamburguer && <PanelLateral></PanelLateral>}
      </div>
      <div className="head" id='head'  style={{ opacity: isInicioHome ? 0.5 : 1 }}>
        <Head onHamburguerClick={handleHamburguerClick}></Head>
      </div>
      <div className="logo"  style={{ opacity: isInicioHome ? 0.5 : 1 }}>
        <LogoUpChiapas></LogoUpChiapas>
        {showEvaluacion && <Evaluacion></Evaluacion>}
      </div>
      <div className='footer' id='footer'  style={{ opacity: isInicioHome ? 0.5 : 1 }}>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Inicio
