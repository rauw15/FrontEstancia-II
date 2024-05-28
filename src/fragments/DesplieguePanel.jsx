import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../assets/images/document.svg';
import urlDes from '../assets/images/despliegue.svg';

const despliegue = {
    height: '2.2rem',
    display: 'flex',
    alignItems: 'center'
};
const despliegue2 = {
    height: '2rem',
    width: '90%',
    paddingRight: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleConvocatoriaClick = () => {
        setShowLineamientos(!showLineamientos);
    };

    return (
        <div>
            <div className="bordeW opciones-barraLateral" style={despliegue} onClick={() => handleNavigate('/inicio/evaluacion')}>
                <img src={url} alt="doc" style={img} />Calificar
            </div>
            <div className="bordeW opciones-barraLateral" style={despliegue}>
                <img src={url} alt="doc" style={img} />Cambiar Contraseña
            </div>
            <div className="bordeW opciones-barraLateral" style={despliegue} onClick={handleConvocatoriaClick}>
                <img src={url} alt="doc" style={img} />Convocatoria <div style={des}><img src={urlDes} alt="des" /></div>
            </div>
            {showLineamientos && (
              
                <div>
                  <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleNavigate('/inicio/convocatoria')}>
                    <img src={url} alt="doc" style={img} />Convocatoria
                </div>
                <div className="bordeW opciones-barraLateral sub-barralLateral" style={despliegue2} onClick={() => handleNavigate('/inicio/convocatoria/lineamientos')}>
                    <img src={url} alt="doc" style={img} />Lineamientos
                </div>
                </div>
                
            )}
            <div className="bordeW opciones-barraLateral" style={despliegue}>
                <img src={url} alt="doc" style={img} />Catálogo <div style={des}><img src={urlDes} alt="des" /></div>
            </div>
        </div>
    );
}

export default DesplieguePanel;
