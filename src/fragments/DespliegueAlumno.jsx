import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../assets/images/document.svg';
import urlDes from '../assets/images/despliegue.svg';
import descargaSVG from '../assets/images/descarga.svg'
import { useAlerta } from './Alerta';

const despliegue = {
  height: '2.6rem',
  display: 'flex',
  alignItems: 'center'
};
const despliegue2 = {
  height: '2.2rem',
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

function DespliegueAlumno() {
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [showLineamientos, setShowLineamientos] = useState(false);
  const [rotated, setRotated] = useState(false);
  const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSubir = () => {
      showAlerta(<p>En mantenimiento!</p>)
  };
    const handleConvocatoriaClick = () => {
        setShowLineamientos(!showLineamientos);
        setRotated(!rotated);
    };
    const rotationStyle = {
      transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.5s ease' // Agrega una transición para una animación suave
    };
  return (
    <div>
        {AlertaComponente}
            <div className="bordeW opciones-barraLateral" style={despliegue} onClick={() => handleNavigate('/alumno/inscripcion')}>
                <img src={url} alt="doc" style={img} />Inscribirse
            </div>
            <div className="bordeW opciones-barraLateral" style={despliegue} onClick={() => handleNavigate('/alumno/subirProyecto')}>
                <img src={url} alt="doc" style={img} />Subir Documentos
            </div>
            <div className="bordeW opciones-barraLateral sidebar" style={despliegue} onClick={handleConvocatoriaClick}>
                <img src={url} alt="doc" style={img} />Recursos <div style={des}><img src={urlDes} alt="des" style={rotationStyle} /></div>
            </div>
            {showLineamientos && (
              
                <div>
                  <div className="bordeW opciones-barraLateral sub-barralLateral sidebar" style={despliegue2} onClick={() => handleNavigate('/alumno/convocatoria')}>
                    <img src={url} alt="doc" style={img} />Convocatoria feria
                </div>
                <div className="bordeW opciones-barraLateral sub-barralLateral sidebar" style={despliegue2} onClick={() => handleNavigate('/alumno/convocatoria/lineamientos')}>
                    <img src={url} alt="doc" style={img} />Lineamientos de participación
                </div>
                <a className="bordeW opciones-barraLateral sub-barralLateral sidebar" style={despliegue2} href={'/downloads/FICHA Tecnica Emprendimiento e Innovación 2024.docx'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Formato descargable para ficha tecnica
                </a>
                <a className="bordeW opciones-barraLateral sub-barralLateral sidebar" style={despliegue2} href={'/downloads/plantilla-canvas-descargable.pptx'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Plantilla descargable Modelo Canvas
                </a>
                <a className="bordeW opciones-barraLateral sub-barralLateral sidebar" style={despliegue2} href={'/downloads/MATERIAL APOYO MODELO CANVAS.pdf'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Material descargable Apoyo Modelo Canvas
                </a>
                <a className="bordeW opciones-barraLateral sub-barralLateral sidebar" style={despliegue2} href={'/downloads/Caracteristicas del RESUMEN EJECUTIVO.docx'} download>
                    <img src={descargaSVG} alt="doc" style={img} />Plantilla descargable Resumen Ejecutivo
                </a>
                </div>
                
            )}
            
        </div>
  )
}

export default DespliegueAlumno
