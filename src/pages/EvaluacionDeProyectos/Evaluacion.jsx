import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../EvaluacionDeProyectos/evaluacion.css'
function Evaluacion() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
      navigate(path);
  };
  const filas = [];
  for (let i = 0; i < 33; i++) {
    filas.push(
      <tr key={i}>
        <td>{i+1}</td>
        <td>Estacion Huete</td>
        <td>{i*50+50}</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi at nihil odit? Voluptate debitis odit repellendus modi. Voluptatibus quae impedit consectetur delectus minus. Temporibus adipisci exercitationem animi, magnam sapiente quod!</td>
        <td><button id={`calificar${i+1}`} className='btn_ev borde2' onClick={ () => handleNavigate('/inicio/evaluacion/calProyectos')}>Calificar</button></td>
      </tr>
    );
  }
  return (
    <div className='evaluacionCanva'>
      <div className='container_evaluacion box bordeR'>
        <h2>Listado de Proyectos ' <span>Proyecto Social</span> '</h2>
        <div className='proyectos_evaluacion borde2'>
          <div className='buscar_ev'>
            <label htmlFor="">&nbsp;Buscar por proyecto:</label>
            <input className='borde2 inputBuscar_ev' type="text" placeholder='Ingrese texto a Buscar' />
          </div>
          <div className="lista_ev">
            <div id="imprimirLista_ev" className='bordeW'>
              <table className='tabla_ev'>
                <thead>
                <tr>
                  <th>No</th>
                  <th>Proyecto</th>
                  <th>Calificación</th>
                  <th>Observaciones</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filas}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Evaluacion
