import React from 'react'
import { Routes, Route, BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import LogoUpChiapas from '../../components/LogoUpChiapas'
import Head from '../../components/Head/Head2'
import Footer from '../../components/Footer'
import PanelLateral from '../../components/PanelLateral'
import Formulario from '../InscripcionAlumnos/Formulario'
import Home from './Home'
import Convocatoria from '../EvaluacionDeProyectos/Convocatoria'
import SubirProyectos from '../InscripcionAlumnos/SubirProyectos'
import Catalogo from '../EvaluacionDeProyectos/Catalogo'
import { useAlerta } from '../../fragments/Alerta';
import './alumno.css'

function Alumno() {
  //------------
  const navigate = useNavigate();
  const location = useLocation();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [showInscripcion, setShowInscripcion] = useState(false);
  const isInicioHome = location.pathname === '/alumno';
  const isInscripcion = location.pathname === '/alumno/inscripcion';
  const isRaiz = location.pathname === '/';
  const [clickedHamburguer, setClickedHamburguer] = useState(true);
  const [showConvocatoria, setShowConvocatoria] = useState(false);
  const [showLineamento, setShowLineamento] = useState(false);
  const [showSubir, setShowSubir] = useState(false);
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [ver, setVer] = useState('');

  //----------
  const handleHamburguerClick = () => {
    setClickedHamburguer(!clickedHamburguer);
  };
  // useEffect(() => {
  //   showAlerta(<><p>Convocatoria terminada..</p><p>Gracias por participar</p></>)

  // }, [showInscripcion, showSubir])
  //---------
  useEffect(() => {
    setShowInscripcion(location.pathname === '/alumno/inscripcion');
    
  }, [location]);
  useEffect(() => {
    setShowConvocatoria(location.pathname === '/alumno/convocatoria');
  }, [location]);
  useEffect(() => {
    setShowLineamento(location.pathname === '/alumno/convocatoria/lineamientos');
  }, [location]);
  useEffect(() => {
    
    setShowSubir(location.pathname === '/alumno/subirProyectos');
  }, [location]);
  useEffect(() => {
    if (location.pathname.startsWith('/alumno/catalogo/')) {
      setShowCatalogo(true);
    } else {
      setShowCatalogo(false);
    }
  }, [location]);
  //------------
  const contenidoStyle = {
    transform: clickedHamburguer ? 'translateX(11rem)' : 'translateX(0)',
    transition: 'transform 0.5s ease'
  }
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
        {(isInicioHome || isRaiz) && (
          <>
            <div className='anuncio_alumno'><h1>Gracias por participar!</h1></div>
          </>
        )}
        </div>
        <div>
        {isRaiz && <Home/>}
        </div>
        <div style={contenidoStyle}>
        {showInscripcion && <Formulario/>}
        {showConvocatoria && <Convocatoria></Convocatoria>}
        {showLineamento && <Convocatoria></Convocatoria>}
        {showSubir && <SubirProyectos/>}
        {showCatalogo && <Catalogo></Catalogo>}
        
        </div>
      </div>
      <div id='footer_alumno'  style={{ opacity: isInscripcion ? 1 : (isInicioHome ? 1 : 1) }}>
        
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Alumno
