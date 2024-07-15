import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import '../EvaluacionDeProyectos/evaluacion.css'
function Evaluacion() {
  const categoria = ['Proyecto social', 'Emprendimiento Tenológico', 'Innovación en Productos y Servicios', 'Energías Limpias Y Sustentabilidad Ambiental'];
  const location = useLocation();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [showEvaluacionProyecto, setShowEvaluacionProyecto] = useState(false);
  const [showEvaluacionEmprendimiento, setShowEvaluacionEmprendimiento] = useState(false);
  const [showEvaluacionInnovacion, setShowEvaluacionInnovacion] = useState(false);
  const [showEvaluacionEnergia, setShowEvaluacionEnergia] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
      navigate(path);
  };

  useEffect(() => {
    setShowEvaluacionProyecto(
      location.pathname === '/inicio/evaluacion/proyectoSocial'
    );
    
  }, [location.pathname]);
  useEffect(() => {
    setShowEvaluacionEmprendimiento(
      location.pathname === '/inicio/evaluacion/emprendimientoTecnologico'
    );
  }, [location.pathname]);
  useEffect(() => {
    setShowEvaluacionInnovacion(
      location.pathname === '/inicio/evaluacion/innovacionProductosServicios'
    );
  }, [location.pathname]);
  useEffect(() => {
    setShowEvaluacionEnergia(
      location.pathname === '/inicio/evaluacion/energias'
    );
  }, [location.pathname]);


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
        <h2>Listado de Proyectos ' 
            {showEvaluacionProyecto && <span>{categoria[0]}</span>}
            {showEvaluacionEmprendimiento && <span>{categoria[1]}</span>}
            {showEvaluacionInnovacion && <span>{categoria[2]}</span>}
            {showEvaluacionEnergia && <span>{categoria[3]}</span>}
          '
        </h2>
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
