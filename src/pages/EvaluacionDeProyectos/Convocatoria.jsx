import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../pages/EvaluacionDeProyectos/convocatoria.css';
import url from '../../assets/images/convocatoriaIMG.jpg';
import Pdf from '../../components/Pdf';
//${import.meta.env.BASE_URL}
function Convocatoria() {
  const pdfFileName = 'LINEAMIENTOS PARTICIPACION Y EVALUACION.pdf';
  const pdfUrl = `/downloads/${pdfFileName}`;
  const encodedUrl = encodeURI(pdfUrl);

  const imgStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  };

  const location = useLocation();
  const [showIMG, setShowIMG] = useState(false);
  const [showLineamento, setShowLineamento] = useState(false);

  useEffect(() => {
    setShowIMG(location.pathname === '/inicio/convocatoria' || location.pathname === '/alumno/convocatoria');
  }, [location.pathname]);

  useEffect(() => {
    setShowLineamento(location.pathname === '/inicio/convocatoria/lineamientos' || location.pathname === '/alumno/convocatoria/lineamientos');
  }, [location.pathname]);

  return (
    <div className='convocatoriaCanva'>
      <div className='container-convocatoria'>
        {showIMG && (
          <div className='convocatoria-img boxFX'>
            <img src={url} alt="convocatoria" style={imgStyle} />
          </div>
        )}
        {showLineamento && (
          <div className='convocatoria-lineamientos box2 bordeR'>
            <Pdf url={encodedUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Convocatoria;
