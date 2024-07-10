import React from 'react'
import Inicio from '../EvaluacionDeProyectos/Inicio'
import '../../pages/Home/home.css'
import Head from '../../components/Head/Head2'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/seccioncss.css'
function Home() {
  const top = {
    height: '16%',
    padding: '1rem',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    color: 'red'
  }
  const centro = {
    height: '56%',
    textAlign: 'justify',
    padding: '1rem',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none'
  }
  const bottom = {
    height: '16%',
    padding: '1%',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    display: 'flex',
    justifyContent: 'end'
  }
  const boton = {
    height: '60%',
    width: '20%',
    background: 'rgba(50,50,50,0.8)',
    color: 'white',
    margin: '1rem',
    padding: '0.5rem'
  }
  const navigate = useNavigate();
  const handleCargar = () => {

    navigate('/alumno');

  };

  return (
    <div className="">
      <div className="container">
      <div className='avisoPrivacidad borde2'>
          <div className='borde2' style={top}>AVISO DE PRIVACIDAD</div>
          <div className='borde2' style={centro}>La información personal que se transmita o genere con motivo de la realización del presente concurso, será manejado en los términos y lineamientos descritos en la Ley de protección de datos personales en posesión de sujetos obligados por el Estado de Chiapas y la ley de transparencia y acceso a la información pública del Estado de Chiapas. Por lo que, por este medio,  se da por manifiesto el consentimiento para que el manejo de los datos sea conforme lo dictan las leyes en materia.
Asi mismo se informa que en todo momento el titular o sus representantes podrán solicitar a la UPChiapas el acceso, rectificación, cancelación u oposición al tratamiento de los datos personales que le concierne, de conformidad con lo establecido en el capítulo 1 del título tercero de la ley de protección de datos personales en posesión de sujetos obligados del Estado de Chiapas.</div>
          <div className='borde2' style={bottom}><button style={boton} onClick={() => handleCargar()} className='borde2'>Aceptar y Cerrar</button></div>
        </div>
    
    </div>
    </div>
  )
}

export default Home
