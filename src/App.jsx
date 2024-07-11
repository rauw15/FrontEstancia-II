import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/EvaluacionDeProyectos/Inicio';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Evaluacion from './pages/EvaluacionDeProyectos/Evaluacion';
import CalProyectos from './pages/EvaluacionDeProyectos/CalProyectos';
import Convocatoria from './pages/EvaluacionDeProyectos/Convocatoria';
import Catalogo from './pages/EvaluacionDeProyectos/Catalogo';
import Formulario from './pages/InscripcionAlumnos/Formulario';
import Alumno from './pages/Home/Alumno';
import SubirProyectos from './pages/InscripcionAlumnos/SubirProyectos';
import TablaUsuarios from './pages/AdminPage/TablaUsuarios';
import ProyectosAdmin from './pages/AdminPage/ProyectosAdmin';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/inicio' element={<Inicio />}>
          <Route path='proyectosAdmin' element={<ProyectosAdmin />} />
          <Route path='catalogo' element={<Catalogo />}>
            <Route path='proyectoSocial' element={<Catalogo />} />
            <Route path='emprendimientoTecnologico' element={<Catalogo />} />
            <Route path='innovacionProductosServicios' element={<Catalogo />} />
            <Route path='energias' element={<Catalogo />} />
          </Route>
          <Route path='convocatoria' element={<Convocatoria />}>
            <Route path='lineamientos' element={<Convocatoria />} />
          </Route>
          <Route path='home' element={<Home />} />
          <Route path='tablaAdmin' element={<TablaUsuarios />} />
          <Route path='evaluacion' element={<Evaluacion />}>
            <Route path='calProyectos' element={<CalProyectos />} />
          </Route>
        </Route>

        <Route path='/alumno' element={<Alumno />}>
          <Route path='convocatoria' element={<Convocatoria />}>
            <Route path='lineamientos' element={<Convocatoria />} />
          </Route>
          <Route path='inscripcion' element={<Formulario />} />
          <Route path='home' element={<Home />} />
          <Route path='subirProyecto' element={<SubirProyectos />} />
          <Route path='catalogo' element={<Catalogo />}>
            <Route path='proyectoSocial' element={<Catalogo />} />
            <Route path='emprendimientoTecnologico' element={<Catalogo />} />
            <Route path='innovacionProductosServicios' element={<Catalogo />} />
            <Route path='energias' element={<Catalogo />} />
          </Route>
        </Route>

        <Route path='/*' element={<Alumno />} />
      </Routes>
    </Router>
  );
}

export default App;
