import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
// import Inicio from './pages/EvaluacionDeProyectos/Inicio';
import Login from './pages/Login/Login';
// import Home from './pages/Home/Home';
// import Evaluacion from './pages/EvaluacionDeProyectos/Evaluacion';
// import CalProyectos from './pages/EvaluacionDeProyectos/CalProyectos';
// import Convocatoria from './pages/EvaluacionDeProyectos/Convocatoria';
import Lineamientos from './pages/EvaluacionDeProyectos/Lineamientos';
import Catalogo from './pages/EvaluacionDeProyectos/Catalogo';
import Formulario from './pages/InscripcionAlumnos/Formulario';
import Alumno from './pages/Home/Alumno';
import SubirProyectos from './pages/InscripcionAlumnos/SubirProyectos';
import TablaUsuarios from './pages/AdminPage/TablaUsuarios';
// import ProyectosAdmin from './pages/AdminPage/ProyectosAdmin';
import CalificacionesAdmin from './pages/AdminPage/CalificacionesAdmin';
import AdminPanel from './pages/AdminPage/AdminPanel';
import EvaluacionProyecto from './pages/EvaluacionDeProyectos/EvaluacionProyecto';
import './App.css';

// Ruta protegida para admin
function ProtectedAdminRoute({ children }) {
  const isAdmin = sessionStorage.getItem('role') === 'admin';
  return isAdmin ? children : <Navigate to='/login' />;
}

// Ruta protegida para usuario
function ProtectedUserRoute({ children }) {
  const isUser = sessionStorage.getItem('role') === 'user' || sessionStorage.getItem('role') === null;
  return isUser ? children : <Navigate to='/login' />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta de login */}
          <Route path='/login' element={<Login />} />

          {/* <Route path='/inicio' element={<Inicio />}>
            <Route path='proyectosAdmin' element={<ProyectosAdmin />} />
            <Route path='calificacionesAdmin' element={<CalificacionesAdmin />} />
            <Route path='lineamientos' element={<Lineamientos />} />
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
            
            <Route path='evaluacion' element={<Evaluacion />}>
              <Route path='proyectoSocial' element={<Evaluacion />} />
              <Route path='emprendimientoTecnologico' element={<Evaluacion />} />
              <Route path='innovacionProductosServicios' element={<Evaluacion />} />
              <Route path='energias' element={<Evaluacion />} />
              <Route path='calProyectos' element={<Evaluacion />} />
            </Route>
          </Route> */}
          {/* Ruta para admin */}
          <Route path='/admin/tablaAdmin' element={<TablaUsuarios />} />
          <Route path='/admin/lineamientos' element={<Lineamientos />} />
          <Route path='/admin/EvaluacionProyecto' element={<EvaluacionProyecto />} />
          <Route path='/admin/calificacionesAdmin' element={<CalificacionesAdmin />} />

          {/* Ruta para alumno */}
          <Route path='/alumno/inscripcion' element={<Formulario />} />
          <Route path='/alumno/subirProyecto' element={<SubirProyectos />} />
          <Route path='/alumno/lineamientos' element={<Lineamientos />} />
          <Route path='/alumno/catalogo/proyectoSocial' element={<Catalogo />} />
          <Route path='/alumno/catalogo/emprendimientoTecnologico' element={<Catalogo />} />
          <Route path='/alumno/catalogo/innovacionProductosServicios' element={<Catalogo />} />
          <Route path='/alumno/catalogo/energias' element={<Catalogo />} />
          <Route path='/alumno' element={<Alumno />}>
            {/* <Route path='convocatoria' element={<Convocatoria />}>
              <Route path='lineamientos' element={<Convocatoria />} />
            </Route> */}
            {/* <Route path='home' element={<Home />} />
            <Route path='catalogo' element={<Catalogo />}>
              <Route path='proyectoSocial' element={<Catalogo />} />
              <Route path='emprendimientoTecnologico' element={<Catalogo />} />
              <Route path='innovacionProductosServicios' element={<Catalogo />} />
              <Route path='energias' element={<Catalogo />} />
            </Route> */}
          </Route>

          <Route path='/admin/*' element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
            
          } />

          <Route path='/*' element={
            <ProtectedUserRoute>
              <Alumno />
            </ProtectedUserRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
