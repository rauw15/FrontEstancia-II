import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../../pages/EvaluacionDeProyectos/convocatoria.css'
import url from '../../assets/images/convocatoriaIMG.jpg'
import Pdf from '../../components/Pdf'
function Convocatoria() {
  const pdfFileName = 'LINEAMIENTOS PARTICIPACION Y EVALUACIONL.pdf';
  const pdfUrl = `${import.meta.env.BASE_URL}/../src/assets/pdfs/${pdfFileName}`;
  const encodedUrl = encodeURI(pdfUrl);
  const img = {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    
  }
  //--
  const navigate = useNavigate();

  const handleNavigate = (path) => {
        navigate(path);
    };
  //-----
  const [showIMG, setShowIMG] = useState(false);
  useEffect(() => {
    setShowIMG(location.pathname === '/inicio/convocatoria');
  }, [location]);
  const [showLineamento, setShowLineamento] = useState(false);
  useEffect(() => {
    setShowLineamento(location.pathname === '/inicio/convocatoria/lineamientos');
  }, [location]);
  return (
    <div className='convocatoriaCanva'>
      <div className='container-convocatoria'>
        {showIMG && <div className='convocatoria-img'>
          <img src={url} alt="convocatoria" style={img} />
        </div>}
        {showLineamento && <div className='convocatoria-lineamientos box2 bordeR'>
          <Pdf url={encodedUrl}></Pdf>
        </div>}
          <div className='btn-convocatoria box2 borde2'>
            <button className='borde2 box2' onClick={() => handleNavigate('/inicio/convocatoria')}>{"<"}</button>
            <button className='borde2 box2' onClick={() => handleNavigate('/inicio/convocatoria/lineamientos')}>{">"}</button>
          </div>
        </div>
    </div>
  )
}

export default Convocatoria
