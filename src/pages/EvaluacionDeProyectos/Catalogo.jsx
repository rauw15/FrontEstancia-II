import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlerta } from '../../fragments/Alerta';
import '../../assets/css/seccioncss.css';
import '../EvaluacionDeProyectos/catalogo.css';

function Catalogo() {
  const categoria = ['Proyecto social', 'Emprendimiento Tenológico', 'Innovación en Productos y Servicios', 'Energías Limpias Y Sustentabilidad Ambiental'];
  const location = useLocation();
  const navigate = useNavigate();
  const [AlertaComponente, showAlerta] = useAlerta();
  const [showConvocatoriaProyecto, setShowConvocatoriaProyecto] = useState(false);
  const [showConvocatoriaEmprendimiento, setShowConvocatoriaEmprendimiento] = useState(false);
  const [showConvocatoriaInnovacion, setShowConvocatoriaInnovacion] = useState(false);
  const [showConvocatoriaEnergia, setShowConvocatoriaEnergia] = useState(false);
  
  useEffect(() => {
    setShowConvocatoriaProyecto(
      location.pathname === '/alumno/catalogo/proyectoSocial' ||
      location.pathname === '/inicio/catalogo/proyectoSocial'
    );
    
  }, [location.pathname]);
  useEffect(() => {
    setShowConvocatoriaEmprendimiento(
      location.pathname === '/alumno/catalogo/emprendimientoTecnologico' ||
      location.pathname === '/inicio/catalogo/emprendimientoTecnologico'
    );
  }, [location.pathname]);
  useEffect(() => {
    setShowConvocatoriaInnovacion(
      location.pathname === '/alumno/catalogo/innovacionProductosServicios' ||
      location.pathname === '/inicio/catalogo/innovacionProductosServicios'
    );
  }, [location.pathname]);
  useEffect(() => {
    setShowConvocatoriaEnergia(
      location.pathname === '/alumno/catalogo/energias' ||
      location.pathname === '/inicio/catalogo/energias'
    );
  }, [location.pathname]);
  const token = localStorage.getItem('token');
  const [proyectosCProyecto, setProyectosCProyecto] = useState([0]);
  const [proyectosCEmprendimiento, setProyectosCEmprendimiento] = useState([0]);
  const [proyectosCInnovacion, setProyectosCInnovacion] = useState([0]);
  const [proyectosCEnergia, setProyectosCEnergia] = useState([0]);
  const [ver, setVer] = useState(true);
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
                  descripcion: 'Archivos Subidos',
                  estado: 'subido',
                }
              );
            }
            else{
              objetoProyecto.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: '----',
                  descripcion: 'Archivos No Subidos',
                  estado: 'noSubido',
                }
              );
            }
          }
          else if(datos[i].categoria === 'Emprendimiento Tecnológico.'){
            if (datos[i].proyectos.length > 0) {
              objetoEmprendimiento.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: datos[i].proyectos[0].name,
                  descripcion: 'Archivos Subidos',
                  estado: 'subido',
                }
              );
            }
            else{
              objetoEmprendimiento.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: '----',
                  descripcion: 'Archivos No Subidos',
                  estado: 'noSubido',
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
                  descripcion: 'Archivos Subidos',
                  estado: 'subido',
                }
              );
            }
            else{
              objetoInnovacion.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: '----',
                  descripcion: 'Archivos No Subidos',
                  estado: 'noSubido',
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
                  descripcion: 'Archivos Subidos',
                  estado: 'subido',
                }
              );
            }
            else{
              objetoEnergia.push(
                {
                  nameUser: datos[i].username,
                  proyectoName: '----',
                  descripcion: 'Archivos No Subidos',
                  estado: 'noSubido',
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


  return (
    <div className='catalogoCanva seccion_canva'>
<button
  className="boton-pequeno"
  onClick={() => navigate('/alumno')}
>
  Volver al menú principal
</button>

      {AlertaComponente}
      <div className='container-catalogo seccion_container2 box'>
        <div className='seccion_apartadoW box3 apartado_catalogo'>
          <div className='titulo_catalogo'>
            <h1 className='box4'>Catálogo de Proyectos</h1>
            <div className='categoria_catalogo borde2'>
              <h3>Categoría: </h3>
              {showConvocatoriaProyecto && <p>{categoria[0]}</p>}
              {showConvocatoriaEmprendimiento && <p>{categoria[1]}</p>}
              {showConvocatoriaInnovacion && <p>{categoria[2]}</p>}
              {showConvocatoriaEnergia && <p>{categoria[3]}</p>}
            </div>
          </div>
        </div>
        <div className="seccion_apartadoW box3 apartado_catalogo tabla_catalogo">
          <div>
            <table className='seccion_tabla'>
              <thead>
                <tr>
                  <th>Usuario:</th>
                  <th>Nombre del Proyecto:</th>
                  <th>Estado:</th>
                </tr>
              </thead>
              <tbody>
              {showConvocatoriaProyecto && proyectosCProyecto.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{proyecto.nameUser}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td className={proyecto.estado}>{proyecto.descripcion}</td>
                  </tr>
                ))}
                {showConvocatoriaEmprendimiento && proyectosCEmprendimiento.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{proyecto.nameUser}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td className={proyecto.estado}>{proyecto.descripcion}</td>
                  </tr>
                ))}
                {showConvocatoriaInnovacion && proyectosCInnovacion.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{proyecto.nameUser}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td className={proyecto.estado}>{proyecto.descripcion}</td>
                  </tr>
                ))}
                {showConvocatoriaEnergia && proyectosCEnergia.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{proyecto.nameUser}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td className={proyecto.estado}>{proyecto.descripcion}</td>
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

export default Catalogo;
