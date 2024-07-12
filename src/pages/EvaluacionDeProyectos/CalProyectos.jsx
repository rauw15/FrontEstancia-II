import React from 'react'
import '../EvaluacionDeProyectos/calProyectos.css'
import Pdf from '../../components/Pdf';
import '../../assets/css/seccioncss.css'


function CalProyectos() {
  const pdfFileName = 'MATERIAL APOYO MODELO CANVAS.pdf';
  const pdfUrl = `/downloads/${pdfFileName}`;
  const encodedUrl = encodeURI(pdfUrl);
  let namePDF = pdfFileName;

  return (
    <div className='calProyectosCanva'>
      <div className='container_calproyectos box'>
        <h2>Cal. de proyectos de "nombre del genero de proyectos"</h2>
        <div className='calProyectos box2'>
          <div className='inputsCal'>
            {/* ----- */}
            <div id="imprimirPondedracion_cal" className="box3">
              <div id="ponderacionTop" className='ponderacion_cal'>
                <label htmlFor="">Nombre del proyecto</label>
                <div id='nombreProyectoDiv' className='borde2'>Fertilizante organico encapsulado de liberacion controlada</div>
              </div>
              <div id="ponderacionCenter" className='ponderacion_cal'>
                <div className='ponderacionLR'>
                  <div>
                  <label htmlFor="" className='labelInfo'>1.- Nivel de Innovación &nbsp;
                    <div className="tooltip">?
                      <span className="tooltiptext bordeW"><p>
                        <li>Mejora de un producto o servicio</li>
                        <li>Útil para la sociedad</li>
                        <li>Oportunidad en el mercado</li>
                        <li>Ventaja competitiva</li></p>
                      </span>
                    </div>
                  </label>
                  <select name="" id="" className='borde2'>
                    <option value="0">&nbsp;-------</option>
                    <option value="7">(7) Excelente</option>
                    <option value="6">(6) Muy buena</option>
                    <option value="5">(5) Buena</option>
                    <option value="4">(4) Regular</option>
                    <option value="3">(3) Deficiente</option>
                    <option value="2">(2) No tiene</option>
                  </select>
                  </div>
                  <div>
                  <label htmlFor="" className='labelInfo'>2.- Factibilidad del Mercado &nbsp;
                    <div className="tooltip">?
                      <span className="tooltiptext bordeW"><p>
                        <li>Potencial de mercado para ser rentable</li>
                        <li>Logo de la empresa</li>
                        <li>Conocimiento de la competencia</li>
                        <li>Satisface las necesidades del cliente</li></p>
                      </span>
                    </div>
                  </label>
                  <select name="" id=""  className='borde2'>
                    <option value="0">&nbsp;-------</option>
                    <option value="7">(7) Excelente</option>
                    <option value="6">(6) Muy buena</option>
                    <option value="5">(5) Buena</option>
                    <option value="4">(4) Regular</option>
                    <option value="3">(3) Deficiente</option>
                    <option value="2">(2) No tiene</option>
                  </select>
                  </div>
                  
                  <div><label htmlFor="" className='labelInfo'>3.- Factibilidad Técnica &nbsp;
                    <div className="tooltip">?
                      <span className="tooltiptext bordeW"><p>
                        <li>Involucra tecnología</li>
                        <li>Facilidad de obtención de recursos</li>
                        <li>Capacidad de respuesta al cliente</li></p>
                      </span>
                    </div>
                  
                  </label>
                  <select name="" id=""  className='borde2'>
                    <option value="0">&nbsp;-------</option>
                    <option value="7">(7) Excelente</option>
                    <option value="6">(6) Muy buena</option>
                    <option value="5">(5) Buena</option>
                    <option value="4">(4) Regular</option>
                    <option value="3">(3) Deficiente</option>
                    <option value="2">(2) No tiene</option>
                  </select></div>

                </div>
                <div className='ponderacionLR'>
                <div>
                  <label htmlFor="" className='labelInfo'>4.- Factibilidad Financiera &nbsp;
                    <div className="tooltip">?
                      <span className="tooltiptext bordeW"><p>
                        <li>Inversión inicial accesible</li>
                        <li>Periodo de recuperación de inversión</li>
                        <li>Financiamiento factible</li></p>
                      </span>
                    </div>
                  
                  </label>
                  <select name="" id=""  className='borde2'>
                    <option value="0">&nbsp;-------</option>
                    <option value="7">(7) Excelente</option>
                    <option value="6">(6) Muy buena</option>
                    <option value="5">(5) Buena</option>
                    <option value="4">(4) Regular</option>
                    <option value="3">(3) Deficiente</option>
                    <option value="2">(2) No tiene</option>
                  </select>
                  </div>
                  <div>
                    <label htmlFor="" className='labelInfo'>5.- Pitch (4 minutos) y prototipo &nbsp;
                    <div className="tooltip">?
                      <span className="tooltiptext bordeW"><p>
                        <li>Buena presentación</li>
                        <li>Información clara del pitch</li>
                        <li>Explicación clara de Prototipo</li></p>
                      </span>
                    </div>
                    
                    </label>
                    <select name="" id=""  className='borde2'>
                    <option value="0">&nbsp;-------</option>
                    <option value="7">(7) Excelente</option>
                    <option value="6">(6) Muy buena</option>
                    <option value="5">(5) Buena</option>
                    <option value="4">(4) Regular</option>
                    <option value="3">(3) Deficiente</option>
                    <option value="2">(2) No tiene</option>
                  </select>
                  </div>
                  <div></div>
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
            <button id='guardar_cal' className='bordeW'>Guardar</button>
          </div>
        </div>
        <div className='link_cal seccion_apartado box2 bordeR'>Ver Video: <a href="">https:&&youtebe.com lorem</a></div>
        <div className="seccion_apartado box2">
          <div className='description_cal'>
            <h4>Descripción:</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore animi, ab nihil sequi optio, commodi omnis dolores blanditiis quos fugiat excepturi, praesentium rerum iusto necessitatibus tempore dolore laudantium sunt accusantium?</p>
          </div>
        </div>
        <div className='seccion_apartado box2 pdf_cal bordeR'>
          <span>*Ficha técnica : </span>
          <div id='pdfTop' className=''>{namePDF}</div>
          <div id='pdfBottom' className=''><Pdf url={encodedUrl}></Pdf></div>
        </div>
        <div className="seccion_apartado box2 pdf_cal">
          <span>*Modelo canva : </span>
          <div id='pdfTop' className=''>{namePDF}</div>
          <div id='pdfBottom' className=''><Pdf url={encodedUrl}></Pdf></div>
        </div>
        <div className="seccion_apartado box2 pdf_cal">
          <span>*Resumen Ejecutivo : </span>
          <div id='pdfTop' className=''>{namePDF}</div>
          <div id='pdfBottom' className=''><Pdf url={encodedUrl}></Pdf></div>
        </div>
      </div>
    </div>
  )
}

export default CalProyectos
