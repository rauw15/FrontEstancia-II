import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/seccioncss.css';
import '../InscripcionAlumnos/subirProyectos.css';

function SubirProyectos() {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [videoPitch, setVideoPitch] = useState('');
  const [fichaTecnica, setFichaTecnica] = useState(null);
  const [modeloCanva, setModeloCanva] = useState(null);
  const [pdfProyecto, setPdfProyecto] = useState(null);

  const navigate = useNavigate();

  const handleArchivoChange = (event, setArchivo) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setArchivo(file);
    } else {
      event.target.value = '';
      setArchivo(null);
      alert('Por favor, sube un archivo PDF.');
    }
  };

  const handleGuardar = () => {
    if (!nombreProyecto || !descripcion || !videoPitch || !fichaTecnica || !modeloCanva || !pdfProyecto) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombreProyecto', nombreProyecto);
    formData.append('descripcion', descripcion);
    formData.append('videoPitch', videoPitch);
    formData.append('fichaTecnica', fichaTecnica);
    formData.append('modeloCanva', modeloCanva);
    formData.append('pdfProyecto', pdfProyecto);

    const token = localStorage.getItem('token');

    fetch('https://apijwtestancia1.onrender.com/api/app/uploadProject', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData,
    }).then(response => {
      if (response.ok) {
        alert('Datos guardados con éxito.');
        setTimeout(() => {
          navigate('/alumno');
        }, 1000); 
      } else {
        alert(`Error al guardar los datos: ${response.statusText} : ¿inicio de sesión?`);
        console.log(response.statusText)
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('Error en el servidor');
    });


  };

  const handleBorrarFormulario = () => {
    setNombreProyecto('');
    setDescripcion('');
    setVideoPitch('');
    setFichaTecnica(null);
    setModeloCanva(null);
    setPdfProyecto(null);
    document.getElementById('fichaTecnica').value = '';
    document.getElementById('modeloCanva').value = '';
    document.getElementById('pdfProyecto').value = '';
  };

  return (
    <div className='seccion_canva'>
      <div className='seccion_container box'>
        <div className="seccion_apartado box3 bordeW">
          <div className="sProyectos_descripcion">
            <h1>Formulario de Entrega de Proyectos</h1>
            <p>Este formulario se utiliza para que los alumnos suban los documentos de sus proyectos en formato 
              <span> PDF</span>.</p> 
            <p>Por favor, asegúrate de que los archivos estén correctamente nombrados y sean legibles.</p>
            <span> *Todos los campos son necesarios llenarlos</span>
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label>Nombre del proyeto: <span>*</span></label>
            <input type="text" className='borde2' value={nombreProyecto} onChange={(e) => setNombreProyecto(e.target.value)} />
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="">Descripción del proyecto: <span>*</span></label><br />
            <textarea name="" id="" cols="50" rows="5" className='borde2' placeholder='escribe aqui una breve descripción del proyecto.' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="">Liga del video pitch (explicación del proyecto):<span> *youtube o drive</span></label>
            <input type="text" className='borde2' value={videoPitch} onChange={(e) => setVideoPitch(e.target.value)} />
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="fichaTecnica">Ficha técnica: <span>*pdf</span></label>
            <input type="file" id="fichaTecnica" className='borde2' accept='application/pdf' onChange={(e) => handleArchivoChange(e, setFichaTecnica)} />
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="modeloCanva">Modelo canva: <span>*pdf</span></label>
            <input type="file" id="modeloCanva" className='borde2' accept='application/pdf' onChange={(e) => handleArchivoChange(e, setModeloCanva)} />
          </div>
        </div>
        <div className="seccion_apartadoW form box3">
          <div>
            <label htmlFor="pdfProyecto">Pdf del proyecto: <span>*pdf</span></label>
            <input type="file" id="pdfProyecto" className='borde2' accept='application/pdf' onChange={(e) => handleArchivoChange(e, setPdfProyecto)} />
          </div>
        </div>
        <div className="seccion_apartado box3 form_btns">
          <button id='guardar_sProyectos' className='bordeW' onClick={handleGuardar}>Guardar</button>
          <button id='borrar_sProyectos' onClick={handleBorrarFormulario}>Borrar formulario</button>
        </div>
      </div>
    </div>
  );
}

export default SubirProyectos;
