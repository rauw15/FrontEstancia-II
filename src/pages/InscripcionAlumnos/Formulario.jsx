import React, { useState } from 'react';
import '../../assets/css/seccioncss.css';
import '../InscripcionAlumnos/formulario.css';

function Formulario() {
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [programa, setPrograma] = useState('');
  const [categoria, setCategoria] = useState('');

  const carreras = [
    "Ing. Mecatrónica", "Ing. Agroindustrial", "Ing. Software", "Ing. Biomédica", 
    "Ing en Energía", "Ing. Petrolera", "Ing. en Tecnología de Manufactura", 
    "Ing. en Tecnología Ambiental", "Ing. Nanotecnología", "Lic. en Administración y Gestión Empresarial"
  ];

  const categorias = [
    "Proyecto Social", "Emprendimiento Tecnológico.", 
    "Innovación en Productos y Servicios", "Energías Limpias y Sustentabilidad Ambiental"
  ];

  const handleBorrarFormulario = () => {
    setCorreo('');
    setNombre('');
    setCuatrimestre('');
    setPrograma('');
    setCategoria('');
  };

  return (
    <div className='seccion_canva'>
      <div className='seccion_container box bordeR'>
        <div className='formularioHead seccion_apartadoW box3 bordeW'>
          <h1>4ta Feria de Emprendimiento e Innovación social 2024</h1>
          <p>Bienvenido a la 4ta Feria de Emprendimiento e Innovación Social 2024, tendrás la oportunidad de presentar tu propuesta de proyecto innovador, con el cual podras demostrar las habilidades, creatividad y lograr resolver problemáticas identificando necesidades de tu entorno.
            El siguiente formulario es para que proporciones los datos generales de inscripción y enseguida daras click a la liga de la Plataforma Virtual de la Incubadora de Empresas Círculo de Innovación, para que descargues los documentos que deberás llenar correctamente y volverás a subir en un documento PDF.</p>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Correo institucional (líder del proyecto):</label>
            <input type="text" className='borde2' placeholder='matricula@carrera.upchiapas.edu.mx' value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Nombre completo del líder del proyecto:</label>
            <input type="text" className='borde2' placeholder='Nombres y Apellidos' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div className='formulario_pregunta'>
            <label>Programa académico:</label>
            {carreras.map((carrera, index) => (
              <div className='opciones' key={index}>
                <input type="radio" name='programa' value={carrera} checked={programa === carrera} onChange={(e) => setPrograma(e.target.value)} />
                <label htmlFor={`check${index}`}>{carrera}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Cuatrimestre actual:</label>
            <input type="number" className='borde2' placeholder='1 - 15' min={1} max={15} value={cuatrimestre} onChange={(e) => setCuatrimestre(e.target.value)} />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div className='formulario_pregunta'>
            <label>Categoria en la que participas:</label>
            {categorias.map((categori, index) => (
              <div className='opciones' key={index}>
                <input type="radio" name='categoria' value={categori} checked={categoria === categori} onChange={(e) => setCategoria(e.target.value)} />
                <label htmlFor={`checkC${index}`}>{categori}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='formulario_btns seccion_apartadoW box3 bordeW'>
          <button id='guardar_formulario' className='bordeW'>Guardar</button>
          <button id="borrar_formulario" onClick={handleBorrarFormulario}>Borrar formulario</button>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
