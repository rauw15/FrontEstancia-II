import React, {useState} from 'react'
import '../../assets/css/seccioncss.css'
import '../EvaluacionDeProyectos/catalogo.css'

function Catalogo() {
  const categoria = ['Proyecto social', 'Emprendimiento Tenológico', 'Innovación en Productos y Servicios', 'Energías Limpias Y Sustentabilidad Ambiental']
  // const isSocial = location.pathname.startsWith('/inicio/catalogo');
  //nombreProyecto, Descripción, ficha tecnica, modelo canvas.
  const filas = [];
  for (let i = 0; i < 33; i++) {
    filas.push(
      <tr key={i}>
        <th>{i+1}Nombre Ficticio</th>
        <th>Estacion Huete Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam dolorem veniam accusantium molestias placeat delectus unde nemo dignissimos consequatur, cumque dolore beatae temporibus aliquam. Quis obcaecati rerum ex odio quasi.</th>
        <th><a href="">Ficha Técnica</a></th>
        <th><a href="">Modelo Canvas</a></th>
      </tr>
    );
  }
  return (
    <div className='catalogoCanva seccion_canva'>
      <div className='container-catalogo seccion_container2 box'>
        <div className='seccion_apartadoW box3 apartado_catalogo'>
          <div className='titulo_catalogo'>
            <h1 className='box4'>Catálogo de Proyectos</h1>
            <div className='categoria_catalogo borde2'>
              <h3>Categoria: </h3>
              <p>{categoria[0]}</p>
            </div>
          </div>
        </div>
        <div className="seccion_apartadoW box3 apartado_catalogo tabla_catalogo">
          <div>
            <table className='seccion_tabla'>
              <thead>
                <tr>
                  <td>Proyecto: </td>
                  <td>Descrición: </td>
                  <td>Ficha Tecnica: </td>
                  <td>Modelo Canvas: </td>
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
  )
}

export default Catalogo
