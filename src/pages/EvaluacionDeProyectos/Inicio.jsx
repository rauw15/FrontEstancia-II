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
// import CalProyectos from './CalProyectos'
import Convocatoria from './Convocatoria'
import TablaUsuarios from '../AdminPage/TablaUsuarios'
import Catalogo from './Catalogo'
import ProyectosAdmin from '../AdminPage/ProyectosAdmin'
import CalificacionesAdmin from '../AdminPage/CalificacionesAdmin'
import './inicio.css'
function Inicio() {
  const location = useLocation();
  //------------
  const [showHome, setShowHome] = useState(false);
  const [showEvaluacion, setShowEvaluacion] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const isInicioHome = location.pathname === '/inicio/home';
  const isInicioEvaluacion = location.pathname === '/inicio/evaluacion'
  const isInicioCal = location.pathname === '/inicio/evaluacion/calProyectos'
  const isInicioCon = location.pathname === '/inicio/convocatoria/*'
  const isTabla = location.pathname === '/inicio/tablaAdmin'
  const [clickedHamburguer, setClickedHamburguer] = useState(true);
  const [showConvocatoria, setShowConvocatoria] = useState(false);
  const [showLineamento, setShowLineamento] = useState(false);
  const [showTablaUsuarios, setShowTablaUsuarios] = useState(false);
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [showProyectosAdmin, setShowProyectosAdmin] = useState(false);
  const [showCalificacionesAdmin, setShowCalificacionesAdmin] = useState(false);
  //----------
  const handleHamburguerClick = () => {
    setClickedHamburguer(!clickedHamburguer);
  };
  useEffect(() => {
    setShowHome(location.pathname === '/inicio/home');
  }, [location]);
  useEffect(() => {
    setShowEvaluacion(location.pathname.startsWith('/inicio/evaluacion/'));
  }, [location]);
  // useEffect(() => {
  //   setShowCal(location.pathname === '/inicio/evaluacion/calProyectos');
  // }, [location]);
  useEffect(() => {
    setShowConvocatoria(location.pathname === '/inicio/convocatoria');
  }, [location]);
  useEffect(() => {
    setShowLineamento(location.pathname === '/inicio/convocatoria/lineamientos');
  }, [location]);
  useEffect(() => {
    setShowTablaUsuarios(location.pathname === '/inicio/tablaAdmin');
  }, [location]);
  useEffect(() => {
    if (location.pathname.startsWith('/inicio/catalogo/')) {
      setShowCatalogo(true);
    } else {
      setShowCatalogo(false);
    }
  }, [location]);
  useEffect(() => {
    setShowProyectosAdmin(location.pathname === '/inicio/proyectosAdmin');
  }, [location]);
  useEffect(() => {
    setShowCalificacionesAdmin(location.pathname === '/inicio/calificacionesAdmin');
  }, [location]);
  //------------
  const contenidoStyle = {
    transform: clickedHamburguer ? 'translateX(11rem)' : 'translateX(0rem)',
    transition: 'transform 0.5s ease',
  }
  return (
    <div className='todo'>
      
      <div className={`panel ${clickedHamburguer ? 'show' : ''}`} style={{ visibility: isInicioHome ? 'visible' : 'visible' }}>
       {clickedHamburguer && <PanelLateral onHamburguerClick={handleHamburguerClick}></PanelLateral>}
      </div>
      <div className="head" id='head'  style={{ opacity: isInicioHome ? 1 : 1 }}>
        <Head onHamburguerClick={handleHamburguerClick}></Head>
      </div>
      <div className="content_inicio borde2" >
        <div className="logo borde2"  style={{ opacity: isInicioCal ? 0 : (isTabla ? 0 : 1) }}>
          {(isInicioHome) && <LogoUpChiapas></LogoUpChiapas>}
        </div>
        <div style={contenidoStyle}>
        {showHome && <LogoUpChiapas />}
        {showEvaluacion && <Evaluacion></Evaluacion>}
        {showConvocatoria && <Convocatoria></Convocatoria>}
        {showLineamento && <Convocatoria></Convocatoria>}
        {showTablaUsuarios && <TablaUsuarios></TablaUsuarios>}
        {showCatalogo && <Catalogo></Catalogo>}
        {showProyectosAdmin && <ProyectosAdmin></ProyectosAdmin>}
        {showCalificacionesAdmin && <CalificacionesAdmin></CalificacionesAdmin>}
        </div>
      </div>
      
      <div className='footer' id='footer'  style={{ opacity: isInicioCal ? 0 : (isInicioHome ? 1 : 1) }}>
        
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Inicio
