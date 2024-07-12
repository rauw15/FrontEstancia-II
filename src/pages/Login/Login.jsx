import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Head from '../../components/Head/Head2';
import Footer from '../../components/Footer';
import LogoUpChiapas from '../../components/LogoUpChiapas';
import { useAlerta } from '../../fragments/Alerta';
import { fetchWithHiddenError } from '../../helpers/fetchHelper';

const op = {
  opacity: '0.5'
};

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [AlertaComponente, showAlerta] = useAlerta();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      username: usuario,
      password: contrasena
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_SING, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem('nameUser', result.username);
        localStorage.setItem('token', result.accessToken);
        showAlerta('Inicio de sesión exitoso', 'success');
        if (result.roles[0] === 'ROLE_ADMIN') {
          navigate('/inicio/tablaAdmin');
        } else {
          navigate('/alumno');
        }
      } else {
        showAlerta(result.message || 'Error en el inicio de sesión', 'error');
      }
    } catch (error) {
      showAlerta('Error en el servidor', 'error');
    } finally {
      setIsLoading(false);
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
          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando...</p>
            </div>
          )}
        </div>
        <LogoUpChiapas />
      </div>
      <div className="footer" id="footer" style={op}><Footer /></div>
    </div>
  );
}

export default Login;
