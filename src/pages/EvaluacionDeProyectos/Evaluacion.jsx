import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import '../EvaluacionDeProyectos/evaluacion.css';
import CalProyectos from './CalProyectos';

function Evaluacion() {
  const categoria = ['Proyecto social', 'Emprendimiento Tenológico', 'Innovación en Productos y Servicios', 'Energías Limpias Y Sustentabilidad Ambiental'];
  const location = useLocation();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [showEvaluacionProyecto, setShowEvaluacionProyecto] = useState(false);
  const [showEvaluacionEmprendimiento, setShowEvaluacionEmprendimiento] = useState(false);
  const [showEvaluacionInnovacion, setShowEvaluacionInnovacion] = useState(false);
  const [showEvaluacionEnergia, setShowEvaluacionEnergia] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const [categoriaGlobal, setCategoriaGlobal] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [proyectosCProyecto, setProyectosCProyecto] = useState([0]);
  const [proyectosCEmprendimiento, setProyectosCEmprendimiento] = useState([0]);
  const [proyectosCInnovacion, setProyectosCInnovacion] = useState([0]);
  const [proyectosCEnergia, setProyectosCEnergia] = useState([0]);
  const [ver, setVer] = useState(true);

  const [proyectoUser, setProyectoUser] = useState([]);
  const [idProyectouser, setIdProyectoUser] = useState('');

  const handleNavigate = (path, id) => {
    setIdProyectoUser(id);
    navigate(path);
  };

  useEffect(() => {
    setShowCal(location.pathname === '/inicio/evaluacion/calProyectos');
    
  }, [location]);

  useEffect(() => {
    setShowEvaluacionProyecto(
      location.pathname === '/inicio/evaluacion/proyectoSocial'
    );
    showEvaluacionProyecto ? 
    setCategoriaGlobal('proyectoSocial') : '';
    showEvaluacionProyecto ? 
    setProyectoUser(proyectosCProyecto) : '';
  }, [location.pathname]);

  useEffect(() => {
    setShowEvaluacionEmprendimiento(
      location.pathname === '/inicio/evaluacion/emprendimientoTecnologico'
    );
    showEvaluacionEmprendimiento ?
    setCategoriaGlobal('emprendimientoTecnologico') : '';
    showEvaluacionEmprendimiento ? 
    setProyectoUser(proyectosCEmprendimiento) : '';
  }, [location.pathname]);

  useEffect(() => {
    setShowEvaluacionInnovacion(
      location.pathname === '/inicio/evaluacion/innovacionProductosServicios'
    );
    showEvaluacionInnovacion ?
    setCategoriaGlobal('innovacionProductosServicios') : '';
    showEvaluacionInnovacion ? 
    setProyectoUser(proyectosCInnovacion) : '';

  }, [location.pathname]);

  useEffect(() => {
    setShowEvaluacionEnergia(
      location.pathname === '/inicio/evaluacion/energias'
    );
    showEvaluacionEnergia ?
    setCategoriaGlobal('energias') : '';
    showEvaluacionEnergia ? 
    setProyectoUser(proyectosCEnergia) : ''; 

  }, [location.pathname]);


  useEffect(()=> {
    
    handleGetProyectos();
  }, [ver]);

  const handleGetProyectos = async () => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_GETPRALL, {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        });
        //prueba
        const result = await response.json();
        if (response.ok) {
          // console.log(result)
          return result;
        } else {
          showAlerta(`${result.message} Necesitas iniciar sesión` || 'Error en la solicitud', 'error');
        }
      } catch (error) {
        showAlerta('Error en el servidor', 'error');
      }
    };

    const depuracion = async () => {
      let objetoProyecto = [];
      let objetoEmprendimiento = [];
      let objetoInnovacion = [];
      let objetoEnergia = [];
      try {
        const datos = await fetchData();
        for (let i = 0; i < datos.length; i++) {
          // console.log(datos[i].categoria)
          
          if(datos[i].categoria === 'Proyecto Social'){
            if (datos[i].proyectos.length > 0) {
              objetoProyecto.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: datos[i].proyectos[0].name,
                  descripcion: datos[i].proyectos[0].description,
                  ficha: datos[i].proyectos[0].technicalSheet,
                  canva: datos[i].proyectos[0].canvaModel,
                  resumen : datos[i].proyectos[0].projectPdf,
                  categoria: datos[i].categoria,
                  video: datos[i].proyectos[0].videoLink,
                }
              );
            }
            // else{
            //   console.log("no")
            // }
          }
          else if(datos[i].categoria === 'Emprendimiento Tecnológico.'){
            if (datos[i].proyectos.length > 0) {
              objetoEmprendimiento.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: datos[i].proyectos[0].name,
                  descripcion: datos[i].proyectos[0].description,
                  ficha: datos[i].proyectos[0].technicalSheet,
                  canva: datos[i].proyectos[0].canvaModel,
                  resumen : datos[i].proyectos[0].projectPdf,
                  categoria: datos[i].categoria,
                  video: datos[i].proyectos[0].videoLink,
                }
              );
            }
          }
          else if(datos[i].categoria === 'Innovación en Productos y Servicios'){
            if (datos[i].proyectos.length > 0) {
              objetoInnovacion.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: datos[i].proyectos[0].name,
                  descripcion: datos[i].proyectos[0].description,
                  ficha: datos[i].proyectos[0].technicalSheet,
                  canva: datos[i].proyectos[0].canvaModel,
                  resumen : datos[i].proyectos[0].projectPdf,
                  categoria: datos[i].categoria,
                  video: datos[i].proyectos[0].videoLink,
                }
              );
            }
            
          }
          else if(datos[i].categoria === 'Energías Limpias y Sustentabilidad Ambiental'){
            if (datos[i].proyectos.length > 0) {
              objetoEnergia.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: datos[i].proyectos[0].name,
                  descripcion: datos[i].proyectos[0].description,
                  ficha: datos[i].proyectos[0].technicalSheet,
                  canva: datos[i].proyectos[0].canvaModel,
                  resumen : datos[i].proyectos[0].projectPdf,
                  categoria: datos[i].categoria,
                  video: datos[i].proyectos[0].videoLink,
                }
              );
            }
            
          }
          
          
        }
        setProyectosCProyecto(objetoProyecto);
        setProyectosCEmprendimiento(objetoEmprendimiento);
        setProyectosCInnovacion(objetoInnovacion);
        setProyectosCEnergia(objetoEnergia);
      } catch (error) {
        console.error("Error en depuracion:", error);
      }
    };
    
    depuracion();
  };



  // const filas = [];
  // for (let i = 0; i < 3; i++) {
  //   filas.push(
  //     <tr key={i}>
  //       <td>{i + 1}</td>
  //       <td>Estacion Huete</td>
  //       <td>{i * 50 + 50}</td>
  //       <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi at nihil odit? Voluptate debitis odit repellendus modi. Voluptatibus quae impedit consectetur delectus minus. Temporibus adipisci exercitationem animi, magnam sapiente quod!</td>
  //       <td><button id={`calificar${i + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos')}>Calificar</button></td>
  //     </tr>
  //   );
  // }

  return (
    <div className='evaluacionCanva'>
        {showCal &&
          <CalProyectos categoria = {categoriaGlobal} proyecto = {proyectoUser} id={idProyectouser}></CalProyectos>
        }

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
                {showEvaluacionProyecto && proyectosCProyecto.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>--</td>
                    <td>--</td>
                    <td><button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button></td>
                  </tr>
                ))}
                {showEvaluacionEmprendimiento && proyectosCEmprendimiento.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>--</td>
                    <td>--</td>
                    <td><button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button></td>
                  </tr>
                ))}
                {showEvaluacionInnovacion && proyectosCInnovacion.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>--</td>
                    <td>--</td>
                    <td><button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button></td>
                  </tr>
                ))}
                {showEvaluacionEnergia && proyectosCEnergia.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>--</td>
                    <td>--</td>
                    <td><button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button></td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evaluacion;
