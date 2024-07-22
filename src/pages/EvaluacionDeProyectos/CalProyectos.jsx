import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import '../EvaluacionDeProyectos/calProyectos.css';
import Pdf from '../../components/Pdf';
import '../../assets/css/seccioncss.css';
import cancelarSVG from '../../assets/images/cancelar.svg';
import { useAlerta } from '../../fragments/Alerta';
import urlDes from '../../assets/images/despliegue.svg';

function CalProyectos({ categoria, proyecto, id, handlePol }) {
  const [AlertaComponente, showAlerta] = useAlerta();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const nameEvaluador = sessionStorage.getItem('nameUser');
  // console.log(proyecto);
  // console.log(id);
  // console.log(proyecto[id].nameUser)
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfUrl2, setPdfUrl2] = useState('');
  const [pdfUrl3, setPdfUrl3] = useState('');
  const [verFicha, setVerFicha] = useState(false);
  const [verCanva, setVerCanva] = useState(false);
  const [verResumen, setVerResumen] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [rotated2, setRotated2] = useState(false);
  const [rotated3, setRotated3] = useState(false);

    // Estados para los inputs
    const [innovacion, setInnovacion] = useState(0);
    const [mercado, setMercado] = useState(0);
    const [tecnica, setTecnica] = useState(0);
    const [financiera, setFinanciera] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [observaciones, setObservaciones] = useState('');
    //
    const [calificacionTotal, setCalificacionTotal] = useState('---');

    const handleGuardar = async () => {
      if (
        innovacion === 0 ||
        mercado === 0 ||
        tecnica === 0 ||
        financiera === 0 ||
        pitch === 0 ||
        observaciones === ''
      ) {
        showAlerta('Todos los campos deben estar llenos', 'error');
        return;
      }
      // console.log(`se va a guardar para : ${proyecto[id].nameUser}` );
      // showAlerta(<><div>{nameEvaluador}, Calificando a: {proyecto[id].nameUser} 
      //   </div><div><li>innovación: {innovacion}</li> <li>mercado: {mercado}</li> 
      //   <li>tecnica: {tecnica}</li> <li>financiera: {financiera}</li> <li>pith: {pitch}</li> 
      //   <li>observaciones: {observaciones}</li> <li>calficacion total: {calificacionTotal}</li><p></p></div></>
      // );
      try{
        setIsLoading(true);
        const response = await fetch(import.meta.env.VITE_API_CAL, {
          method: 'POST',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userEvaluador: nameEvaluador,
            userAlumno: proyecto[id].nameUser,
            innovacion : innovacion,
            mercado : mercado,
            tecnica: tecnica,
            financiera: financiera,
            pitch: pitch,
            observaciones: observaciones,
            total: calificacionTotal
          })
        });

        if(response.ok){
          showAlerta(
            <>
              <h1>Calificado ✅</h1>
              <><div>{nameEvaluador}, Calificando a: {proyecto[id].nameUser} 
              </div><div><li>innovación: {innovacion}</li> <li>mercado: {mercado}</li> 
              <li>tecnica: {tecnica}</li> <li>financiera: {financiera}</li> <li>pith: {pitch}</li> 
              <li>observaciones: {observaciones}</li> <li>calficacion total: {calificacionTotal}</li><p><span>redirigiendo...</span></p><p></p></div></>
      
            </>
          );
          
          setTimeout(() => {
            handlePol();
            handleCerrar();
          }, 4000);
        }
        else{
          setIsLoading(false);
          showAlerta(<>
            <p>Error al guardar los datos, Por favor, intente nuevamente.</p>
          </>);
        }
      } catch (error){
        setIsLoading(false);
        showAlerta(
          <p>Error de conexión. Por favor, intente nuevamenre más tarde.</p>
        );
      } finally{
        setIsLoading(false);
      }
    };

  const handleCerrar = () => {
    navigate(`/inicio/evaluacion/${categoria}`);
  };

  const cancelarStyle = {
    height: '2.11rem',
    padding: '0.2rem',
    width: '2rem',
    objectFit: 'cover',
  };

  let canva = proyecto[id].canva.split("\\");
  let ficha = proyecto[id].ficha.split("\\");
  let resumen = proyecto[id].resumen.split("\\");

  const handleGetArchivos = async (fileName, what) => {
    // console.log(fileName)
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
      switch(what){
        case 1: setPdfUrl(url);
        break;
        case 2 : setPdfUrl2(url);
        break;
        case 3 :setPdfUrl3(url);
        break;
      }
      
    } catch (error) {
      // console.error('Fetch error:', error);
      showAlerta('Error en la solicitud', 'error');
    }
  };

  const handleFichaClick = (fileName, what) => {
    switch(what){
      case 1: setVerFicha(!verFicha); setRotated(!rotated);
      break;
      case 2 : setVerCanva(!verCanva); setRotated2(!rotated2);
      break;
      case 3 : setVerResumen(!verResumen); setRotated3(!rotated3);
      break;
    }
    handleGetArchivos(fileName, what);
  };
  useEffect(() => {
    handleTotal();
  }, [innovacion, mercado, tecnica, financiera, pitch]);
  let total=0;
  ////promedio calificación
  const handleInnovacion=(e)=>{
    setInnovacion(e);
  }
  const handleTotal = () =>{
    total = (parseFloat(innovacion)+parseFloat(mercado)+parseFloat(tecnica)+parseFloat(financiera)+parseFloat(pitch));
    setCalificacionTotal(total);
  } 
  //-------------
  const rotationStyle = {
    transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.5s ease' // Agrega una transición para una animación suave
  };
  const rotationStyle2 = {
    transform: rotated2 ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.5s ease' // Agrega una transición para una animación suave
  };
  const rotationStyle3 = {
    transform: rotated3 ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.5s ease' // Agrega una transición para una animación suave
  };

  
  return (
    <div className='calProyectosCanva'>
      {AlertaComponente}
      <div className='container_calproyectos boxMax'>
        <button id='cerrar_calProyectos' className='box2 bordeW' onClick={handleCerrar}><img src={cancelarSVG} alt="cancelarUp" style={cancelarStyle} /></button>
        <h2>Cal. de proyectos de "{proyecto[id].categoria}"</h2>
        <div className='calProyectos box2'>
          <div className='inputsCal'>
            {/* ----- */}
            <div id="imprimirPondedracion_cal" className="box3">
              <div id="ponderacionTop" className='ponderacion_cal'>
                <label htmlFor="">Nombre del proyecto</label>
                <div id='nombreProyectoDiv' className='borde2'>{proyecto[id].proyectoName}</div>
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
                  <select name="innovacion" className='borde2' value={innovacion} onChange={(e)=>{handleInnovacion(e.target.value);}}>
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
                  <select name="" id=""  className='borde2' value={mercado} onChange={(e)=>{setMercado(e.target.value); handleTotal();}}>
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
                  <select name="" id=""  className='borde2' value={tecnica} onChange={(e)=>{setTecnica(e.target.value); handleTotal();}}>
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
                  <select name="" id=""  className='borde2' value={financiera} onChange={(e)=>{setFinanciera(e.target.value); handleTotal();}}>
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
                    <select name="" id=""  className='borde2' value={pitch} onChange={(e)=>{setPitch(e.target.value); handleTotal();}}>
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
                <textarea name="" value={observaciones} onChange={(e)=>setObservaciones(e.target.value)} cols="30" rows="10"  className='borde2'></textarea>
              </div>
            </div>
            <div id='puntosTotal_cal'>Total: {calificacionTotal}</div>
          </div>

            <div className='btn_cal'>
              <button id='guardar_cal' className='bordeW' onClick={handleGuardar}>Guardar</button>
            </div>
          </div>
          <div className='seccion_apartado link_cal box2 bordeR'>
            Ver Video:
              <a target='_blank' className='aCalProyectos' href={proyecto[id].video}>&nbsp;{proyecto[id].video}</a>
          </div>
          <div className="seccion_apartado box2">
            <div className='description_cal'>
              <h4>Descripción:</h4>
              <p>{proyecto[id].descripcion}</p>
            </div>
          </div>
          <div className='seccion_apartado box2 pdf_cal bordeR' style={{ height: verFicha ? '68rem' : '3rem' }}>
            
            <span>*Ficha técnica : </span>
            <div className='bordeW box4 btn_calPropyecto' onClick={() => handleFichaClick(ficha[ficha.length - 1],1)}>Ver Ficha <img src={urlDes} alt="despliSVG" style={rotationStyle} /></div>
            {verFicha && (
              <>
              <div id='pdfTop' className=''>{ficha[ficha.length - 1]}</div>
              <div id='pdfBottom' className=''><Pdf url={pdfUrl} /></div>
              </>
            )}
            
          </div>
          <div className='seccion_apartado box2 pdf_cal bordeR' style={{ height: verCanva ? '68rem' : '3rem' }}>
            <span>*Modelo canva : </span>
            <div className='bordeW box4 btn_calPropyecto' onClick={() => handleFichaClick(canva[canva.length - 1], 2)}>Ver Canva <img src={urlDes} alt="despliSVG" style={rotationStyle2} /></div>
            {verCanva && (
              <>
                <div id='pdfTop' className=''>{canva[canva.length - 1]}</div>
                <div id='pdfBottom' className=''><Pdf url={pdfUrl2} /></div>
              </>
            )}
            
          </div>
          <div className='seccion_apartado box2 pdf_cal bordeR' style={{ height: verResumen ? '68rem' : '3rem' }}>
            <span>*Resumen Ejecutivo : </span>
            <div className='bordeW box4 btn_calPropyecto' onClick={() => handleFichaClick(resumen[resumen.length - 1], 3)}>Ver Resumen <img src={urlDes} alt="despliSVG" style={rotationStyle3} /></div>
            {verResumen && (
              <>
                <div id='pdfTop' className=''>{resumen[resumen.length - 1]}</div>
                <div id='pdfBottom' className=''><Pdf url={pdfUrl3} /></div>
              </>
            )}
            
          </div>
        </div>
      </div>
    
  );
}

export default CalProyectos;
