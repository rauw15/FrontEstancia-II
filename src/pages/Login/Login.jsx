import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Head from '../../components/Head/Head2'
import Footer from '../../components/Footer'
import LogoUpChiapas from '../../components/LogoUpChiapas'
import { useAlerta } from '../../fragments/Alerta'
const op = {
  opacity: '0.5'
}
function Login() {
  const [AlertaComponente, showAlerta] = useAlerta();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    showAlerta(<p>Datos incorrectos..<br></br>
    </p>)
    // Aquí puedes enviar los datos del formulario al servidor
    // utilizando el método POST (por ejemplo, con fetch o axios).
    // No se agregarán los datos al URL.
  };

  return (
    <div className='todoLgoin borde'>
      {AlertaComponente}
      <div className='head' id='head' style={op}><Head></Head></div>
      <div id='logoLogin' className=''>
        <div className='login'>
          <div id='form' className='box bordeR' onSubmit={handleSubmit}>
            <form action="" className='formDatos'>
              <label htmlFor="usuario">Usuario:</label>
              <input type="text" name='usuario' className=''/>
              <label htmlFor="contrasena">Contraseña:</label>
              <input type="password" name='contrasena' className='' />
              <button className='borde'>Entrar</button>
            </form>
          </div>
      </div>
      <LogoUpChiapas></LogoUpChiapas>
      </div>
      
      <div className="footer" id="footer" style={op}><Footer></Footer></div>
    </div>
  )
}

export default Login


// <div className='head' id='head' style={op}><Head></Head></div>
// <div style={fondo} id='logoLogin' className=''><LogoUpChiapas></LogoUpChiapas></div>
// <div className='login borde'>
//   <div id='form' className='box' onSubmit={handleSubmit}>
//     <form action="" className='formDatos'>
//     <label htmlFor="usuario">Usuario:</label>
//     <input type="text" name='usuario' className=''/>
//     <label htmlFor="contrasena">Contraseña:</label>
//     <input type="password" name='contrasena' className='' />
//     <button className='borde'>Entrar</button>
//     </form>
//   </div>
// </div>
// <div className="footer" id="footer" style={op}><Footer></Footer></div>