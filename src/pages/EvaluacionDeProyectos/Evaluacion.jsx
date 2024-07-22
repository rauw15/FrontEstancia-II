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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const nameEvaluador = sessionStorage.getItem('nameUser');
  const [proyectosCProyecto, setProyectosCProyecto] = useState([0]);
  const [proyectosCEmprendimiento, setProyectosCEmprendimiento] = useState([0]);
  const [proyectosCInnovacion, setProyectosCInnovacion] = useState([0]);
  const [proyectosCEnergia, setProyectosCEnergia] = useState([0]);
  const [ver, setVer] = useState(true);

  const [proyectoUser, setProyectoUser] = useState([]);
  const [idProyectouser, setIdProyectoUser] = useState('');
  const [calificados, setCalificados] = useState([]);
  // const [categoriaEvaluador, setCategoriaEvaluador] = useState('');
  // const [userWho, setUserWho] = useState('');
  // // const [userWho, setUserWho] = useState('');
  let verBtnCal = true;
  let verBtnCal1 = true;

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

  const [pol, setPol] = useState(true);
  const handlePol = () => {
    setPol(!pol);
  };
  let info;
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        info = await handleGetInfo();
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally{
        handleGetProyectos(info);
      }
    };
  
    fetchData();
  }, [pol]);

  const handleGetProyectos = async (info) => {
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
          setIsLoading(false);
          showAlerta(`${result.message} Necesitas iniciar sesión` || 'Error en la solicitud', 'error');
        }
      } catch (error) {
        showAlerta('Error en el servidor', 'error');
      } finally{
        setIsLoading(false);
      }
    };
    const depuracion = async () => {
      let cual = '';
      let objetoCalificado = [];
      let objetoProyecto = [];
      let objetoEmprendimiento = [];
      let objetoInnovacion = [];
      let objetoEnergia = [];
      let aux={
        calificacion: '',
        observaciones: '',
        btn: true,
      };
      try {
        const datos = await fetchData();
        // console.log(datos);
        //----infoDepuracion-----
        for(let e=0; e<info.length; e++){
          
          if(info[e].userEvaluador == nameEvaluador){
            objetoCalificado.push(
              {
                usuarioEvaluador: info[e].userEvaluador,
                userAlumno: info[e].userAlumno,
                observaciones: info[e].observaciones,
                total: info[e].total,
              }
            )
          }
        }
        // console.log(objetoCalificado);
        setCalificados(objetoCalificado);
        //-------------
        for(let a=0; a<datos.length; a++){
          if(datos[a].categoria === 'Evaluador'){
            if(datos[a].carrera==='Proyecto Social'){
              if(nameEvaluador === datos[a].username){
                showAlerta(<div><h3>Categoría a Evaluar:</h3> <span><h4>'{datos[a].carrera}'</h4></span><p><span>Nota:
                </span>El resto de categorias estarán deshabilitadas.</p></div>)
                cual = '1';
              }
            }
            else if(datos[a].carrera==='Emprendimiento Tecnológico.'){
              if(nameEvaluador === datos[a].username){
                showAlerta(<div><h3>Categoría a Evaluar:</h3> <span><h4>'{datos[a].carrera}'</h4></span><p><span>Nota:
                </span>El resto de categorias estarán deshabilitadas.</p></div>)
                cual = '2';
              }
            }
            else if(datos[a].carrera==='Innovación en Productos y Servicios'){
              if(nameEvaluador === datos[a].username){
                showAlerta(<div><h3>Categoría a Evaluar:</h3> <span><h4>'{datos[a].carrera}'</h4></span><p><span>Nota:
                </span>El resto de categorias estarán deshabilitadas.</p></div>)
                cual = '3';
              }
            }
            else if(datos[a].carrera==='Energías Limpias y Sustentabilidad Ambiental'){
              if(nameEvaluador === datos[a].username){
                showAlerta(<div><h3>Categoría a Evaluar:</h3> <span><h4>'{datos[a].carrera}'</h4></span><p><span>Nota:
                </span>El resto de categorias estarán deshabilitadas.</p></div>)
                cual = '4';
              }
            }
          }
          else if(datos[a].categoria === 'admin'){
            cual = 'admin';
          }
        }
        for (let i = 0; i < datos.length; i++) {
          // console.log(datos[i].categoria) 
          if(datos[i].categoria === 'Proyecto Social' && (cual == '1' || cual == 'admin')){
            if (datos[i].proyectos.length > 0) {
              const resultadoAUX = objetoCalificado.find(objeto => objeto.userAlumno === datos[i].username);
              if (resultadoAUX) {
                aux={
                  calificacion: resultadoAUX.total,
                  observaciones: resultadoAUX.observaciones,
                  btn: false,
                }
              } else {
                aux={
                  calificacion: '--',
                  observaciones: '--',
                  btn: true,
                }
              }
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
                  calificacion: aux.calificacion,
                  observaciones: aux.observaciones,
                  btn: aux.btn,
                }
              );
            }
          }
          else if(datos[i].categoria === 'Emprendimiento Tecnológico.' && (cual == '2' || cual=='admin')){
            if (datos[i].proyectos.length > 0) {
              const resultadoAUX = objetoCalificado.find(objeto => objeto.userAlumno === datos[i].username);
              if (resultadoAUX) {
                aux={
                  calificacion: resultadoAUX.total,
                  observaciones: resultadoAUX.observaciones,
                  btn: false,
                }
              } else {
                aux={
                  calificacion: '--',
                  observaciones: '--',
                  btn: true,
                }
              }
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
                  calificacion: aux.calificacion,
                  observaciones: aux.observaciones,
                  btn: aux.btn,
                }
              );
            }
          }
          else if(datos[i].categoria === 'Innovación en Productos y Servicios' && (cual == '3' || cual=='admin')){
            if (datos[i].proyectos.length > 0) {
              const resultadoAUX = objetoCalificado.find(objeto => objeto.userAlumno === datos[i].username);
              if (resultadoAUX) {
                aux={
                  calificacion: resultadoAUX.total,
                  observaciones: resultadoAUX.observaciones,
                  btn: false,
                }
              } else {
                aux={
                  calificacion: '--',
                  observaciones: '--',
                  btn: true,
                }
              }
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
                  calificacion: aux.calificacion,
                  observaciones: aux.observaciones,
                  btn: aux.btn,
                }
              );
            }
          }
          else if(datos[i].categoria === 'Energías Limpias y Sustentabilidad Ambiental' && (cual == '4' || cual=='admin')){
            if (datos[i].proyectos.length > 0) {
              const resultadoAUX = objetoCalificado.find(objeto => objeto.userAlumno === datos[i].username);
              if (resultadoAUX) {
                aux={
                  calificacion: resultadoAUX.total,
                  observaciones: resultadoAUX.observaciones,
                  btn: false,
                }
              } else {
                aux={
                  calificacion: '--',
                  observaciones: '--',
                  btn: true,
                }
              }
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
                  calificacion: aux.calificacion,
                  observaciones: aux.observaciones,
                  btn: aux.btn,
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
        showAlerta(`Error en la solicitud, inicio de sesión?`, 'error')
      }
    };
    depuracion();
  };

  const handleGetInfo = async () => {
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
          // console.log(result)
          return result;
        } else {
          setIsLoading(false);
          showAlerta(`${result.message} Necesitas iniciar sesión` || 'Error en la solicitud', 'error');
        }
      } catch (error) {
        showAlerta('Error en el servidor', 'error');
      } finally{
        setIsLoading(false);
      };
    }

  return (
    <div className='evaluacionCanva'>
      {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando...</p>
            </div>
          )}
      {AlertaComponente}
        {showCal &&
          <CalProyectos categoria = {categoriaGlobal} proyecto = {proyectoUser} id={idProyectouser} handlePol={handlePol}></CalProyectos>
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
                    <td>{proyecto.calificacion}</td>
                    <td>{proyecto.observaciones}</td>
                    <td>
                      {proyecto.btn ? <button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button> : <div>Calificado✅</div>}
                    </td>
                  </tr>
                ))}
                {showEvaluacionEmprendimiento && proyectosCEmprendimiento.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>{proyecto.calificacion}</td>
                    <td>{proyecto.observaciones}</td>
                    <td>
                      {proyecto.btn ? <button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button> : <div>Calificado✅</div>}
                    </td>
                  </tr>
                ))}
                {showEvaluacionInnovacion && proyectosCInnovacion.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>{proyecto.calificacion}</td>
                    <td>{proyecto.observaciones}</td>
                    <td>
                      {proyecto.btn ? <button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button> : <div>Calificado✅</div>}
                    </td>
                  </tr>
                ))}
                {showEvaluacionEnergia && proyectosCEnergia.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{index +1}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>{proyecto.calificacion}</td>
                    <td>{proyecto.observaciones}</td>
                    <td>
                      {proyecto.btn ? <button id={`calificar${index + 1}`} className='btn_ev borde2' onClick={() => handleNavigate('/inicio/evaluacion/calProyectos', index)}>Calificar</button>: <div>Calificado✅</div>}
                    </td>
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
