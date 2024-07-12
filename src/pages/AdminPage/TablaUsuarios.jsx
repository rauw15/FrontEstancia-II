import React, { useState, useEffect } from 'react';
import { useAlerta } from '../../fragments/Alerta';
import '../../assets/css/seccioncss.css';
import '../AdminPage/tablaUsuarios.css';
import reload from '../../assets/images/reload.svg'

const modStyle = {
  height: '2rem',
  marginTop: '1rem',
  marginLeft: '1rem'
}
const reloadStyle = {
  height: '100%',
  width: '18%',
  objectFit: 'contain',
};

function TablaUsuarios() {
  const [mostrarUsuarios, setMostrarUsuarios] = useState(true);
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const [mostrarFormularioEliminar, setMostrarFormularioEliminar] = useState(false);
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombreUsuarioEliminar, setNombreUsuarioEliminar] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [evaluadores, setEvaluadores] = useState([]);
  const [AlertaComponente, showAlerta] = useAlerta();
  const token = localStorage.getItem('token');
  const [adminUser, setAdminUser] = useState(false);

  const handleBorrarFormulario = () => {
    setCorreo('');
    setNombre('');
    setNombreUsuario('');
    setContraseña('');
  };

  const handleGetUsuarios = async (event) => {
    // event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_USU, {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setUsuarios(result.usuarios || []);
          setEvaluadores(result.evaluadores || []);
          setAdminUser(true);
        } else {
          setAdminUser(false);
          showAlerta(`${result.message} usuario admin?` || 'Error en la solicitud', 'error');
        }
      } catch (error) {
        showAlerta('Error en el servidor', 'error');
      }
    };

    fetchData();
  };

  const [ver, setVer] = useState(true);
  useEffect(()=> {
    handleGetUsuarios();
  }, [ver]);

  const handleAgregar = () => {
    setMostrarFormularioAgregar(true);
  };

  const handleEliminar = () => {
    setMostrarFormularioEliminar(true);
  };

  const handleCerrarFormularioAgregar = () => {
    setMostrarFormularioAgregar(false);
  };

  const handleCerrarFormularioEliminar = () => {
    setMostrarFormularioEliminar(false);
  };

  const handleAgregarUsuario = async () => {
    handleGetUsuarios();
    // Lógica para agregar usuario
    if(!nombre || !nombreUsuario || !contraseña || !correo){
      showAlerta(<p>Por favor llena todos los campos.</p>)
    }
    else if(adminUser){
      try {
        const response = await fetch(import.meta.env.VITE_API_SUP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: nombreUsuario,
            email: correo,
            password: contraseña,
            nombre: nombre,
            categoria: 'Evaluador',
            roles: ["moderator"]
          })
        });
        
        if (response.ok) {
          showAlerta(
            <>
              <p>Datos Guardados...</p>
            </>
          );
          
        } else {
          showAlerta(<><p>Error al guardar los datos. Por favor, intente nuevamente.</p>
          <p>posibles causas:</p>
          <span>nombre de usuario ya registrado!</span></>);
        }
      } catch (error) {
        showAlerta(<p>Error de conexión. Por favor, intente nuevamente.</p>);
      }
    }
    else{
      showAlerta(<p>No eres admin!</p>)
    }
    handleBorrarFormulario();
    setMostrarFormularioAgregar(false);
    
  };

  const handleEliminarUsuario = () => {
      const userInput = window.prompt("Ingrese 'DELETE' para confirmar:");
      if (userInput === 'DELETE') {
        showAlerta(`Usuario '${userInput}' se va a eliminar`);
        const fetchDat = async () => {
          try {
            const encodedUsername = encodeURIComponent(nombreUsuarioEliminar.trim());
            const response = await fetch(`${import.meta.env.VITE_API_DEL}/${encodedUsername}`, {
              method: 'DELETE',
              headers: {
                'x-access-token': token,
              },
            });
    
            const result = await response.json();
            if (response.ok) {
              showAlerta(<p>Usuario eliminado correctamente</p>)
            } else {
              showAlerta(result.message || 'Error en la solicitud', 'error');
            }
          } catch (error) {
            showAlerta('Error en el servidor', 'error');
          }
        };
    
        fetchDat();
      }
      else{
        showAlerta(<p>Usuario no se elimino.</p>)
      }
    
    // Lógica para eliminar usuario
    console.log({
      nombreUsuarioEliminar,
    });

    setNombreUsuarioEliminar(' ')
    setMostrarFormularioEliminar(false);
  };

  return (
    <div className='seccion_canva'>
      {AlertaComponente}
      <div className='seccion_container apartado_admin box'>
        <div className='seccion_apartadoW box2'>
          <button className='btn_admin' onClick={() => setMostrarUsuarios(true)}>
            Usuarios
          </button>
          <button className='btn_admin' onClick={() => setMostrarUsuarios(false)}>
            Evaluadores
          </button>
          <h2>
            {mostrarUsuarios ? 'Usuarios Registrados:' : 'Evaluadores Registrados:'}{' '}
            <span>{mostrarUsuarios ? usuarios.length : evaluadores.length}</span>
          </h2>
          <h2>
            {mostrarUsuarios ? 'Usuarios Registrados sin Evaluadores:' : ' '}{' '}
            <span>{mostrarUsuarios ? (usuarios.length - evaluadores.length) : ' '}</span>
          </h2>
          <div>
          <button className='btn_pAdmin borde2' onClick={handleGetUsuarios} ><img src={reload} alt="reload" style={reloadStyle} /></button>
          </div>
          {mostrarUsuarios ? '' : <div className='btns_admin'>
            <button className='btn_admin bordeW' id='agregar_admin' onClick={handleAgregar}>
              + Agregar
            </button>
            <button className='btn_admin bordeW' id='eliminar_admin' onClick={handleEliminar}>
              - Eliminar
            </button>
          </div>}
        </div>
        <div className='seccion_apartadoW box2'>
          <div className='tabla_admin'>
            {mostrarUsuarios ? (
              <table className='seccion_tabla'>
                <thead>
                  <tr>
                    <th>Nombre de usuario:</th>
                    <th>email:</th>
                    <th>Nombre:</th>
                    <th>Carrera:</th>
                    <th>Cuatrimestre:</th>
                    <th>Categoria</th>
                  </tr>
                </thead>
                <tbody>{usuarios.map((usuario, index) => (
                    <tr key={index}>
                      <td>{usuario.username}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.carrera}</td>
                      <td>{usuario.cuatrimestre}</td>
                      <td>{usuario.categoria}</td>
                    </tr>
                  ))}</tbody>
              </table>
            ) : (
              <table className='seccion_tabla'>
                <thead>
                  <tr>
                    <th>Nombre de usuario:</th>
                    <th>email:</th>
                    <th>Nombre:</th>
                    <th>Carrera:</th>
                    <th>Cuatrimestre:</th>
                    <th>Categoria</th>
                  </tr>
                </thead>
                <tbody>{evaluadores.map((evaluador, index) => (
                    <tr key={index}>
                      <td>{evaluador.username}</td>
                      <td>{evaluador.email}</td>
                      <td>{evaluador.nombre}</td>
                      <td>{evaluador.carrera}</td>
                      <td>{evaluador.cuatrimestre}</td>
                      <td>{evaluador.categoria}</td>
                    </tr>
                  ))}</tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {mostrarFormularioAgregar && (
        <div className='modal box'>
          <div className='modal_contenido'>
            <h2>Agregar Usuario Evaluador</h2>
            <form className='form_admin'>
              <label>Nombre:</label>
              <input type='text' value={nombre} className='borde2' onChange={(e) => setNombre(e.target.value)} />
              <label>Nombre de usuario:</label>
              <input type='text' value={nombreUsuario} className='borde2' onChange={(e) => setNombreUsuario(e.target.value)} />
              <label>Contraseña:</label>
              <input type='password' value={contraseña} className='borde2' onChange={(e) => setContraseña(e.target.value)} />
              <label>Correo:</label>
              <input type='text' value={correo} className='borde2' onChange={(e) => setCorreo(e.target.value)} />
              <label>Rol:</label>
              <select disabled style={modStyle}>
                <option value='moderator'>Evaluador</option>
              </select>
            </form>
            <button onClick={handleAgregarUsuario} className='btn_admin btnB_admin bordeW'>Aceptar</button>
            <button onClick={handleCerrarFormularioAgregar} className='btn_admin btnR_admin bordeW'>Cancelar</button>
          </div>
        </div>
      )}
      {mostrarFormularioEliminar && (
        <div className='modalEliminar box'>
          <div className='modal_contenido'>
            <h2>Eliminar Usuario Evaluador</h2>
            <label>Nombre de usuario que desea eliminar:</label>
            <input type='text' id='nombre_admin' value={nombreUsuarioEliminar} className='borde2' onChange={(e) => setNombreUsuarioEliminar(e.target.value)} />
            <button onClick={handleEliminarUsuario} className='btn_admin btnB_admin bordeW'>Aceptar</button>
            <button onClick={handleCerrarFormularioEliminar} className='btn_admin btnR_admin bordeW'>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaUsuarios;
