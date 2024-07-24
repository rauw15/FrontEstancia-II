import React, { useEffect, useState } from 'react';
import { useAlerta } from '../../fragments/Alerta';
import '../../assets/css/seccioncss.css';
import '../AdminPage/proyectosAdmin.css';
import reload from '../../assets/images/reload.svg';
import { Splitter } from '@react-pdf-viewer/core';

const reloadStyle = {
  height: '100%',
  width: '18%',
  objectFit: 'contain',
};

function CalificacionesAdmin() {
  const token = localStorage.getItem('token');
  const usuarioAdmin= sessionStorage.getItem('nameUser');
  const [AlertaComponente, showAlerta] = useAlerta();
  const [proyectos, setProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [ver, setVer] = useState(true);
  useEffect(()=> {
    handleGetProyectos();
  }, [ver]);

  const handleGetProyectos = async () => {
    if(usuarioAdmin == 'adminAdministraidor'){
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(import.meta.env.VITE_API_OBCAL, {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          });
  
          const result = await response.json();
          if (response.ok) {
     
            return result;
          } else {
            setIsLoading(false);
            showAlerta(`${result.message} usuario admin?` || 'Error en la solicitud', 'error');
          }
        } catch (error) {
          showAlerta('Error en el servidor', 'error');
        } finally{
          setIsLoading(false);
        }
      };
  
      const depuracion = async () => {
        try {
          const datos = await fetchData();
          
          setProyectos(datos);
        } catch (error) {
          console.error("Error en depuracion:", error);
        }
      };
  
      depuracion();
    }
    else{
      showAlerta(<><span>Solo usuario admin!</span></>)
    }
  };

  
  return (
    <div className='seccion_canva'>
      {AlertaComponente}
      {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando...</p>
            </div>
          )}
      <div className='seccion_container2 box2 apartado_pAdmin'>
        <div className="seccion_apartadoW box3 adminP_fx">
          Calificaciones Registrados: {proyectos.length}
          <button className='btn_pAdmin borde2' onClick={handleGetProyectos}>
            <img src={reload} alt="reload" style={reloadStyle} />
          </button>
        </div>
        <div className="seccion_apartadoW box3 tabla_proyectos_admin adminP_fx">
          <div className="tablaPadmin">
            <table className='seccion_tabla'>
              <thead>
                <tr>
                  <th>Usuario Evaluador:</th>
                  <th>Usuario Alumno:</th>
                  <th>Innovación:</th>
                  <th>Mercado:</th>
                  <th>Tecnica:</th>
                  <th>Financiera:</th>
                  <th>Pitch:</th>
                  <th>Observaciones:</th>
                  <th>Puntuaje:</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{proyecto.userEvaluador}</td>
                    <td>{proyecto.userAlumno}</td>
                    <td>{proyecto.innovacion}</td>
                    <td>{proyecto.mercado}</td>
                    <td>{proyecto.tecnica}</td>
                    <td>{proyecto.financiera}</td>
                    <td>{proyecto.pitch}</td>
                    <td>{proyecto.observaciones}</td>
                    <td>{proyecto.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalificacionesAdmin
