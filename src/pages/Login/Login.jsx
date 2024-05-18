import React from 'react'
import './Login.css'
import Head from '../../components/Head/Head2'
import Footer from '../../components/Footer'
import LogoUpChiapas from '../../components/LogoUpChiapas'


const fondo = {
  position: 'absolute',
  opacity: '0.5'
}
const op = {
  opacity: '0.5'
}
function Login() {

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes enviar los datos del formulario al servidor
    // utilizando el método POST (por ejemplo, con fetch o axios).
    // No se agregarán los datos al URL.
  };

  return (
    <div className='todo'>
      <div style={fondo}><LogoUpChiapas></LogoUpChiapas></div>
      <div className='head' id='head' style={op}><Head></Head></div>
      <div className='login'>
        <div id='form' className='box' onSubmit={handleSubmit}>
          <form action="" className='formDatos'>
          <label htmlFor="usuario">Usuario:</label>
          <input type="text" name='usuario' className='borde'/>
          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" name='contrasena' className='borde' />
          <button className='borde'>Entrar</button>
          </form>
        </div>
      </div>
      <div className="footer" id="footer" style={op}><Footer></Footer></div>
    </div>
  )
}

export default Login
