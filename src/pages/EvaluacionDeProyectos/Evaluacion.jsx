import React from 'react'
import '../EvaluacionDeProyectos/evaluacion.css'
function Evaluacion() {
  const filas = [];
  for (let i = 0; i < 5; i++) {
    filas.push(
      <tr key={i}>
        <td>1</td>
        <td>Estacion Huete</td>
        <td>Fertilizante organico encapsulado de liberacion controlada</td>
        <td>580</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi at nihil odit? Voluptate debitis odit repellendus modi. Voluptatibus quae impedit consectetur delectus minus. Temporibus adipisci exercitationem animi, magnam sapiente quod!</td>
        <td><button id={`calificar${i+1}`} className='btn_ev borde'>Calificar</button></td>
      </tr>
    );
  }
  return (
    <div className='evaluacionCanva'>
      <div className='container_evaluacion box bordeR'>
        <h2>Listado de Proyectos</h2>
        <div className='proyectos_evaluacion borde2'>
          <div className='buscar_ev'>
            <input className='borde2 inputBuscar_ev' type="text" placeholder='Ingrese texto a Buscar' />
          </div>
          <div className="lista_ev">
            <div id="imprimirLista_ev" className='bordeW'>
              <table className='tabla_ev'>
                <tr>
                  <th>No</th>
                  <th>Plantel</th>
                  <th>Proyecto</th>
                  <th>Calificación</th>
                  <th>Observaciones</th>
                  <th>Acciones</th>
                </tr>
                {filas}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Evaluacion
