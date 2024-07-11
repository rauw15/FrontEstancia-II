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

function ProyectosAdmin() {
  const token = localStorage.getItem('token');
  const [AlertaComponente, showAlerta] = useAlerta();
  const [archivo, setArchivo] = useState('');
  const [proyectos, setProyectos] = useState([]);

  const [ver, setVer] = useState(true);
  useEffect(()=> {
    handleGetProyectos();
  }, [ver]);

  const handleGetProyectos = async () => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_GETPR, {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        });

        const result = await response.json();
        if (response.ok) {
   
          return result;
        } else {
          showAlerta(`${result.message} usuario admin?` || 'Error en la solicitud', 'error');
        }
      } catch (error) {
        showAlerta('Error en el servidor', 'error');
      }
    };

    const depuracion = async () => {
      let objetoProyecto = [];
      try {
        const datos = await fetchData();
        let canva = '';
        let ficha = '';
        let resumen = '';
        for (let i = 0; i < datos.length; i++) {
          if (datos[i].proyectos.length > 0) {
            if(datos[i].proyectos[0].canvaModel == undefined  || datos[i].proyectos[0].technicalSheet == undefined  || datos[i].proyectos[0].projectPdf == undefined ){
              console.log("archivos no subidos");
            }
            else{
            canva = datos[i].proyectos[0].canvaModel.split("\\");
            ficha = datos[i].proyectos[0].technicalSheet.split("\\");
            resumen = datos[i].proyectos[0].projectPdf.split("\\");
            }
            objetoProyecto.push(
              {
                nameUser: datos[i].username,
                proyectoName: datos[i].proyectos[0].name,
                descripcion: datos[i].proyectos[0].description,
                link: datos[i].proyectos[0].videoLink,
                ficha: ficha[ficha.length - 1],
                canva: canva[canva.length - 1],
                resumen: resumen[resumen.length - 1],
              }
            );
          }
        }
        setProyectos(objetoProyecto);
      } catch (error) {
        console.error("Error en depuracion:", error);
      }
    };

    depuracion();
  };

  const handleGetArchivos = async (fileName) => {
    try {
      const encodedUsername = encodeURIComponent(fileName.trim());
      const response = await fetch(`${import.meta.env.VITE_API_DESAR}/${encodedUsername}`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error en la solicitud');
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${fileName}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Fetch error:', error);
      showAlerta('Error en la solicitud', 'error');
    }
  };

  const handleFichaClick = (fileName) => {
    setArchivo(fileName);
    handleGetArchivos(fileName);
  };

  return (
    <div className='seccion_canva'>
      {AlertaComponente}
      <div className='seccion_container2 box2 apartado_pAdmin'>
        <div className="seccion_apartadoW box3 adminP_fx">
          Proyectos Registrados: {proyectos.length}
          <button className='btn_pAdmin borde2' onClick={handleGetProyectos}>
            <img src={reload} alt="reload" style={reloadStyle} />
          </button>
        </div>
        <div className="seccion_apartadoW box3 tabla_proyectos_admin adminP_fx">
          <div className="tablaPadmin">
            <table className='seccion_tabla'>
              <thead>
                <tr>
                  <th>Usuario:</th>
                  <th>Nombre del Proyecto:</th>
                  <th className='descripcion_pAdmin'>Descripción:</th>
                  <th>Link de Video:</th>
                  <th>Ficha técnica:</th>
                  <th>Modelo canva:</th>
                  <th>Resumen ejecutivo:</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto, index) => (
                  <tr key={index}>
                    <td>{proyecto.nameUser}</td>
                    <td>{proyecto.proyectoName}</td>
                    <td>{proyecto.descripcion}</td>
                    <td><div className='borde2'><a className='aTablaPadmin' href={proyecto.link} target='_blank'>Video</a></div></td>
                    <td>
                      <button 
                        className='aTablaPadmin borde2' 
                        onClick={() => handleFichaClick(proyecto.ficha)}>
                        Ficha Técnica
                      </button>
                    </td>
                    <td>
                      <button 
                        className='aTablaPadmin borde2' 
                        onClick={() => handleFichaClick(proyecto.canva)}>
                        Modelo Canva
                      </button>
                    </td>
                    <td>
                      <button 
                        className='aTablaPadmin borde2' 
                        onClick={() => handleFichaClick(proyecto.resumen)}>
                        Resumen Ejecutivo
                      </button>
                    </td>
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

export default ProyectosAdmin;
