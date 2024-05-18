import React from 'react'
import Inicio from '../EvaluacionDeProyectos/Inicio'
import '../../pages/Home/home.css'
import Head from '../../components/Head/Head2'
function Home() {
  const top = {
    height: '16%',
    padding: '1%',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    color: 'red'
  }
  const centro = {
    height: '56%',
    textAlign: 'justify',
    padding: '1%',
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
    color: 'white'
  }

  return (
    <div className="container">
      <div className='avisoPrivacidad borde2'>
          <div className='borde2' style={top}>Aviso de privasidad</div>
          <div className='borde2' style={centro}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, nulla distinctio! Unde, quam! Ut dolorem repudiandae, vel velit quas sit cumque voluptate. Illum, nisi exercitationem. Hic totam eius explicabo praesentium!</div>
          <div className='borde2' style={bottom}><button style={boton} className='borde2'>Aceptar y Cerrar</button></div>
        </div>
    
    </div>
  )
}

export default Home
