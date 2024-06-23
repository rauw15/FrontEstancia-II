import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Head from '../../components/Head/Head2';
import Footer from '../../components/Footer';
import LogoUpChiapas from '../../components/LogoUpChiapas';
import { useAlerta } from '../../fragments/Alerta';

const op = {
  opacity: '0.5'
};

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [AlertaComponente, showAlerta] = useAlerta();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      username: usuario,
      password: contrasena
    };

    try {
      const response = await fetch('https://apijwtestancia1.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      
      if (response.ok) {
        // Manejar el éxito del inicio de sesión
        localStorage.setItem('token', result.accessToken);
        showAlerta('Inicio de sesión exitoso', 'success');
        navigate('/alumno'); // Redirige a una página de inicio después del inicio de sesión exitoso
      } else {
        // Manejar error del inicio de sesión
        showAlerta(result.message || 'Error en el inicio de sesión', 'error');
      }
    } catch (error) {
  
      showAlerta('Error en el servidor', 'error');
    }
  };

  return (
    <div className='todoLgoin borde'>
      {AlertaComponente}
      <div className='head' id='head' style={op}><Head /></div>
      <div id='logoLogin'>
        <div className='login'>
          <div id='form' className='box bordeR'>
            <form action="" className='formDatos' onSubmit={handleSubmit}>
              <label htmlFor="usuario">Usuario:</label>
              <input 
                type="text" 
                name='usuario' 
                className='' 
                value={usuario} 
                onChange={(e) => setUsuario(e.target.value)} 
              />
              <label htmlFor="contrasena">Contraseña:</label>
              <input 
                type="password" 
                name='contrasena' 
                className='' 
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
              />
              <button type="submit" className='borde'>Entrar</button>
            </form>
          </div>
        </div>
        <LogoUpChiapas />
      </div>
      <div className="footer" id="footer" style={op}><Footer /></div>
    </div>
  );
}

export default Login;
