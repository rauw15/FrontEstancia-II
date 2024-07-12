import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta, { useAlerta } from '../../fragments/Alerta';
import '../../assets/css/seccioncss.css';
import '../InscripcionAlumnos/formulario.css';

function Formulario() {
  const [AlertaComponente, showAlerta] = useAlerta();
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [cuatrimestre, setCuatrimestre] = useState('');
  const [programa, setPrograma] = useState('');
  const [categoria, setCategoria] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const saludo = sessionStorage.getItem('nameUser');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    setUser('');
    setPass('');
  };

  const handleGuardarFormulario = async () => { 
    setIsLoading(true);
    if(saludo != null){
      showAlerta(<p>Ya estas inscrito!</p>)
      setTimeout(() => {
        navigate('/alumno');
      }, 3000); 
    }
    else{
      let correoPartes = correo.split(".");
    let formularioEstado= true;
    let llenoEstado = true;
    let mensaje = [];
    if(correoPartes[1] !== 'upchiapas'){
      setCorreo('');
      mensaje.push("correo.");
      formularioEstado = false;
    }
    if(pass.length < 8){
      setPass('');
      mensaje.push("contraseña");
      formularioEstado = false;
    }
    if(cuatrimestre <= 0 || cuatrimestre > 15){
      setCuatrimestre('');
      mensaje.push("cuatrimestre");
      formularioEstado = false;
    }
    if(!correo || !nombre || !cuatrimestre || !programa || !categoria || !user || !pass){
      llenoEstado = false;
    }
    else{
      llenoEstado = true;
    }
    if (llenoEstado === false) {
      showAlerta(<p>Por favor, complete todos los campos.</p>);
      setIsLoading(false);
    }
    else if(formularioEstado === false){
      setIsLoading(false);
      showAlerta(<><p>campos invalidos:</p> {mensaje.map((campo, index) => (
        <span key={index}>{campo}</span>
        
      ))}.</>);
    }
    else{
      try {
        const response = await fetch(import.meta.env.VITE_API_SUP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user,
            email: correo,
            password: pass,
            nombre: nombre,
            carrera: programa,
            cuatrimestre: cuatrimestre,
            categoria: categoria,
            roles: ["user"]
          })
        });
        
        if (response.ok) {
          showAlerta(
            <>
              <p>Datos Guardados...</p>
              <p>Lee cuidadosamente los requisitos de participación</p>
              <p>Los documentos se suben en <span>pdf</span>.</p>
            </>
          );
          setTimeout(() => {
            navigate('/login');
          }, 3000); 
        } else {
          showAlerta(<><p>Error al guardar los datos. Por favor, intente nuevamente.</p>
          <p>posibles causas:</p>
          <span>correo ya registrado!</span><br></br>
          <span>nombre de usuario ya registrado!</span></>);
        }
      } catch (error) {
        showAlerta(<p>Error de conexión. Por favor, intente nuevamente.</p>);
      } finally{
        setIsLoading(false);
      }
    }
    }
    
  };

  return (
    <div className='seccion_canva'>
      {AlertaComponente}
      {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando...</p>
            </div>
          )}
      <div className='seccion_container box bordeR'>
        <div className='formularioHead seccion_apartado box3 bordeW'>
          <h1>4ta Feria de Emprendimiento e Innovación social 2024</h1>
          <p>Bienvenido a la 4ta Feria de Emprendimiento e Innovación Social 2024, tendrás la oportunidad de presentar tu propuesta de proyecto innovador, con el cual podrás demostrar las habilidades, creatividad y lograr resolver problemáticas identificando necesidades de tu entorno.
            El siguiente formulario es para que proporciones los datos generales de inscripción y enseguida darás click a la liga de la Plataforma Virtual de la Incubadora de Empresas Círculo de Innovación, para que descargues los documentos que deberás llenar correctamente y volverás a subir en un documento PDF.</p>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Correo institucional (líder del proyecto):<span>*</span></label>
            <input type="text" className='borde2' placeholder='matricula@carrera.upchiapas.edu.mx' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Nombre completo del líder del proyecto:<span>*</span></label>
            <input type="text" className='borde2' placeholder='Nombres y Apellidos' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Nombre de Usuario:<span>*</span></label>
            <input type="text" className='borde2' placeholder='EXAMple2002BYFB' value={user} onChange={(e) => setUser(e.target.value)} required />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Contraseña:<span>*</span></label>
            <input type="password" className='borde2' placeholder='minimo 8 caracteres' minLength={8} value={pass} onChange={(e) => setPass(e.target.value)} required />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div className='formulario_pregunta'>
            <label>Programa académico:<span>*</span></label>
            {carreras.map((carrera, index) => (
              <div className='opciones' key={index}>
                <input type="radio" name='programa' value={carrera} checked={programa === carrera} onChange={(e) => setPrograma(e.target.value)} required />
                <label htmlFor={`check${index}`}>{carrera}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div>
            <label>Cuatrimestre actual:<span>*</span></label>
            <input type="number" className='borde2' placeholder='1 - 15' min={1} max={15} value={cuatrimestre} onChange={(e) => setCuatrimestre(e.target.value)} required />
          </div>
        </div>
        <div className='formulario seccion_apartadoW box3 bordeW'>
          <div className='formulario_pregunta'>
            <label>Categoria en la que participas:<span>*</span></label>
            {categorias.map((categori, index) => (
              <div className='opciones' key={index}>
                <input type="radio" name='categoria' value={categori} checked={categoria === categori} onChange={(e) => setCategoria(e.target.value)} required />
                <label htmlFor={`checkC${index}`}>{categori}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='formulario_btns seccion_apartadoW box3 bordeW'>
          <button id='guardar_formulario' className='bordeW' onClick={handleGuardarFormulario}>Guardar</button>
          <button id="borrar_formulario" onClick={handleBorrarFormulario}>Borrar formulario</button>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
