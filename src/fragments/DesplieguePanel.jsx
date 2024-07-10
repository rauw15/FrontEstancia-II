import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../assets/images/document.svg';
import urlDes from '../assets/images/despliegue.svg';

import descargaSVG from '../assets/images/descarga.svg'


const despliegue = {
    height: '2.2rem',
    display: 'flex',
    alignItems: 'center'
};
const despliegue2 = {
    height: '1.9rem',
    width: '80%',
    marginLeft: '10%',
    paddingRight: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    fontSize: '0.9rem',
};
const img = {
    height: '80%',
    width: '10%',
    objectFit: 'contain',
};
const des = {
    display: 'flex',
    alignItems: 'center',
    width: '98%',
    justifyContent: 'end',
    position: 'absolute'
};

function DesplieguePanel() {
    const navigate = useNavigate();
    const [showLineamientos, setShowLineamientos] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [rotated, setRotated] = useState(false);
    const [rotated2, setRotated2] = useState(false);
    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleConvocatoriaClick = () => {
        setShowLineamientos(!showLineamientos);
        setRotated(!rotated);
    };
    const handleProyectosAdminClick = () => {
        setShowAdmin(!showAdmin);
        setRotated2(!rotated2);
    };

    const rotationStyle = {
        transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s ease' // Agrega una transición para una animación suave
      };
    const rotationStyle2 = {
        transform: rotated2 ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s ease'
    }
    return (
        <div>
            <div className="bordeW opciones-barraLateral" style={despliegue} onClick={() => handleNavigate('/inicio/evaluacion')}>
                <img src={url} alt="doc" style={img} />Calificar
            </div>
            <div className="bordeW opciones-barraLateral" style={despliegue} onClick={handleProyectosAdminClick} >
                <img src={url} alt="doc" style={img} />Administrador <div style={des}><img src={urlDes} alt='des' style={rotationStyle2}></img></div>
            </div>
            {showAdmin && (
              
              <div>
                <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleNavigate('/inicio/tablaAdmin')}>
                  <img src={url} alt="doc" style={img} />Usuarios Registrados
              </div>
              <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleNavigate('/inicio/proyectosAdmin')}>
                  <img src={url} alt="doc" style={img} />Proyectos Registrados
              </div>
              </div>
              
          )}
            <div className="bordeW opciones-barraLateral" style={despliegue} onClick={handleConvocatoriaClick}>
                <img src={url} alt="doc" style={img} />Recursos <div style={des}><img src={urlDes} alt="des" style={rotationStyle} /></div>
            </div>
            {showLineamientos && (
              
                <div>
                  <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleNavigate('/inicio/convocatoria')}>
                    <img src={url} alt="doc" style={img} />Convocatoria feria
                </div>
                <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleNavigate('/inicio/convocatoria/lineamientos')}>
                    <img src={url} alt="doc" style={img} />Lineamientos de participación
                </div>
                <a className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} href={'/downloads/FICHA Tecnica Emprendimiento e Innovación 2024.docx'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Formato descarga para ficha tecnica
                </a>
                <a className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} href={'/downloads/plantilla-canvas-descargable.pptx'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Plantilla descargable Modelo Canvas
                </a>
                <a className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} href={'/downloads/MATERIAL APOYO MODELO CANVAS.pdf'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Material descargable Apoyo Modelo Canvas
                </a>
                <a className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} href={'/downloads/Caracteristicas del RESUMEN EJECUTIVO.docx'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Plantilla descargable Resumen Ejecutivo
                </a>
                </div>
                
            )}
        </div>
    );
}

export default DesplieguePanel;
