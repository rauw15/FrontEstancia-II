import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
// import Inicio from './pages/EvaluacionDeProyectos/Inicio';
import Login from './pages/Login/Login';

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

import { useAuth } from './AuthProvider';

// Ruta protegida para admin
function ProtectedAdminRoute({ children }) {
  const { isAdmin, isLoggedIn, loading } = useAuth();
  if (loading) return null; // O un spinner si prefieres
  return isLoggedIn && isAdmin ? children : <Navigate to='/login' />;
}

// Ruta protegida para usuario (cualquier usuario logueado)
function ProtectedUserRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return null;
  return isLoggedIn ? children : <Navigate to='/login' />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta de login */}
          <Route path='/login' element={<Login />} />

          {/* Ruta para admin */}
          <Route path='/admin/tablaAdmin' element={<TablaUsuarios />} />
          <Route path='/admin/lineamientos' element={<Lineamientos />} />
          <Route path='/admin/EvaluacionProyecto' element={<EvaluacionProyecto />} />
          <Route path='/admin/calificacionesAdmin' element={<CalificacionesAdmin />} />

          {/* Ruta para alumno */}
          <Route path='/alumno/inscripcion' element={<Formulario />} />
          <Route path='/alumno/subirProyecto' element={<SubirProyectos />} />
          <Route path='/alumno/lineamientos' element={<Lineamientos />} />
         <Route 
            path="/alumno/catalogo/:categoryKey" 
            element={<ProtectedUserRoute><Catalogo /></ProtectedUserRoute>} 
          />
          <Route path='/alumno' element={<Alumno />}>
  
          </Route>

          <Route path='/admin/*' element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
            
          } />

          <Route path='/*' element={<Alumno />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
