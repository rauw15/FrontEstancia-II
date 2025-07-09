import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';

// Importa todos tus componentes de página
import Login from './pages/Login/Login';
import Lineamientos from './pages/EvaluacionDeProyectos/Lineamientos';
import Catalogo from './pages/EvaluacionDeProyectos/Catalogo';
import Formulario from './pages/InscripcionAlumnos/Formulario';
import Alumno from './pages/Home/Alumno';
import SubirProyectos from './pages/InscripcionAlumnos/SubirProyectos';
import TablaUsuarios from './pages/AdminPage/TablaUsuarios';
import CalificacionesAdmin from './pages/AdminPage/CalificacionesAdmin';
import AdminPanel from './pages/AdminPage/AdminPanel';
import EvaluacionProyecto from './pages/EvaluacionDeProyectos/EvaluacionProyecto';
import './App.css';

// --- COMPONENTES DE RUTAS PROTEGIDAS (Sin cambios) ---
function ProtectedAdminRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return isLoggedIn && isAdmin ? children : <Navigate to="/login" replace />;
}

// Ruta protegida para Evaluadores (y también Admins)
function ProtectedEvaluatorRoute({ children }) {
  const { isLoggedIn, isAdmin, isEvaluador, loading } = useAuth();

  // --- LOG 6: Ver qué valores recibe la ruta protegida ---
  console.log(
    '[ProtectedEvaluatorRoute] Verificando acceso. isLoggedIn:', isLoggedIn, 
    '| isAdmin:', isAdmin, 
    '| isEvaluador:', isEvaluador,
    '| loading:', loading
  );

  if (loading) {
    console.log('[ProtectedEvaluatorRoute] Decisión: Cargando...');
    return <div>Cargando...</div>;
  }

  const tieneAcceso = isLoggedIn && (isAdmin || isEvaluador);
  

  return tieneAcceso ? children : <Navigate to="/login" replace />;
}
// Ruta protegida para acciones específicas que requieren cualquier usuario logueado
function ProtectedUserActionRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// --- COMPONENTE PRINCIPAL DE LA APP ---
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- RUTA DE LOGIN (sigue siendo importante) --- */}
          <Route path='/login' element={<Login />} />

          {/* --- RUTAS PÚBLICAS Y DE ALUMNO (NUEVA LÓGICA) --- */}
          {/* 1. La raíz ahora muestra la página de Alumno y es PÚBLICA */}
          <Route path="/" element={<Alumno />} />
          <Route path="/alumno" element={<Alumno />} />
          
          {/* 2. Estas rutas también son PÚBLICAS */}
          <Route path="/lineamientos" element={<Lineamientos />} />
          <Route path="/catalogo/:categoryKey" element={<Catalogo />} />
          
          {/* 3. ESTAS ACCIONES DE ALUMNO SÍ REQUIEREN LOGIN */}
          <Route path='/alumno/inscripcion' element={<ProtectedUserActionRoute><Formulario /></ProtectedUserActionRoute>} />
          <Route path='/alumno/su birProyecto' element={<ProtectedUserActionRoute><SubirProyectos /></ProtectedUserActionRoute>} />

          {/* --- RUTAS DE ADMINISTRADOR (protegidas) --- */}
          <Route path='/admin' element={<ProtectedEvaluatorRoute><AdminPanel /></ProtectedEvaluatorRoute>} />
          <Route path='/admin/tablaAdmin' element={<ProtectedAdminRoute><TablaUsuarios /></ProtectedAdminRoute>} />
          
          {/* --- RUTAS DE EVALUADOR (protegidas) --- */}
          <Route path='/evaluador/evaluacion' element={<ProtectedEvaluatorRoute><EvaluacionProyecto /></ProtectedEvaluatorRoute>} />
          <Route path='/evaluador/calificaciones' element={<ProtectedEvaluatorRoute><CalificacionesAdmin /></ProtectedEvaluatorRoute>} />
          
          {/* --- RUTA DE REDIRECCIÓN PARA EVALUACIÓN --- */}
          <Route path='/admin/EvaluacionProyecto' element={<Navigate to="/evaluador/evaluacion" replace />} />
          
          {/* --- RUTA COMODÍN (Catch-all) --- */}
          {/* Si una ruta no existe, redirige a la página principal de Alumno */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;