import React from 'react'
import '../EvaluacionDeProyectos/calProyectos.css'
import Pdf from '../../components/Pdf';

function CalProyectos() {
  const encodedUrl = encodeURI("../../assets/pdfs/1_proyecto.pdf");

  return (
    <div className='calProyectosCanva'>
      <div className='container_calproyectos borde'>
        <h2>Cal. de proyectos de "nombre del genero de fucking proyectos"</h2>
        <div className='calProyectos'>
          <div className='inputsCal'>
            {/* ----- */}
            <div id="imprimirPondedracion_cal" className="box2 bordeR">
              <div id="ponderacionTop" className='ponderacion_cal'>
                <label htmlFor="">Nombre del proyecto</label>
                <div id='nombreProyectoDiv' className='borde2'>Fertilizante organico encapsulado de liberacion controlada</div>
              </div>
              <div id="ponderacionCenter" className='ponderacion_cal'>
                <div className='ponderacionLR'>
                  <div>
                  <label htmlFor="">1.- Innovación</label>
                  <select name="" id="" className='borde2'>
                    <option value="">1</option>
                  </select>
                  </div>
                  <div>
                  <label htmlFor="">2.- Actualidad</label>
                  <select name="" id=""  className='borde2'>
                    <option value="">1</option>
                  </select>
                  </div>
                  
                  <div><label htmlFor="">3.- Metodología empleada</label>
                  <select name="" id=""  className='borde2'>
                    <option value="">1</option>
                  </select></div>
                  <div>
                  <label htmlFor="">4.- Dinámica de la exposición</label>
                  <select name="" id=""  className='borde2'>
                    <option value="">1</option>
                  </select>
                  </div>
                </div>
                <div className='ponderacionLR'>
                  <div>
                    <label htmlFor="">5.- Impacto social/label</label>
                    <select name="" id=""  className='borde2'>
                    <option value="">1</option>
                  </select>
                  </div>
                  <div>
                  <label htmlFor="">6.- Factibilidad de Comercialización</label>
                  <select name="" id=""  className='borde2'>
                    <option value="80">80</option>
                  </select>
                  </div>
                  <div>
                  <label htmlFor="">7.- Posibilidad de desarrollo</label>
                  <select name="" id=""  className='borde2'>
                    <option value="">1</option>
                  </select>
                  </div>
                </div>
              </div>
              <div id="ponderacionBottom" className='ponderacion_cal'>
                <label htmlFor="">Observaciones</label>
                <textarea name="" id="" cols="30" rows="10"  className='borde2'></textarea>
              </div>
            </div>
            <div id='puntosTotal_cal'>Total: 580</div>
          </div>
          <div className='btn_cal'>
            <button id='guardar_cal' className='borde2'>Guardar</button>
          </div>
        </div>
        <div className='link_cal borde2'>Ver Video: <a href="">https:&&youtebe.com lorem</a></div>
        <div className='seccion_cal borde pdf_cal'>
          <div id='pdfTop' className='borde'>1_"nombre del archivo fucking.pdf</div>
          <div id='pdfBottom' className='borde'><Pdf fileUrl={encodedUrl}></Pdf></div>
        </div>
      </div>
    </div>
  )
}

export default CalProyectos
