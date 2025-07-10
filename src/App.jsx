import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';

// Importa todos tus componentes de página
import Login from './pages/Login/Login';
import Lineamientos from './pages/EvaluacionDeProyectos/Lineamientos';
import Catalogo from './pages/EvaluacionDeProyectos/Catalogo';
import Convocatoria from './pages/EvaluacionDeProyectos/Convocatoria';
import Formulario from './pages/InscripcionAlumnos/Formulario';
import Alumno from './pages/Home/Alumno';
import SubirProyectos from './pages/InscripcionAlumnos/SubirProyectos';
import TablaUsuarios from './pages/AdminPage/TablaUsuarios';
import CalificacionesAdmin from './pages/AdminPage/CalificacionesAdmin';
import AdminPanel from './pages/AdminPage/AdminPanel';
import EvaluacionProyecto from './pages/EvaluacionDeProyectos/EvaluacionProyecto';
import ProyectoSocial from './pages/Home/Categorias/ProyectoSocial';
import EmprendimientoTec from './pages/Home/Categorias/EmprendimientoTec';
import InnovacionProductosLanding from './pages/Home/Categorias/Innovación';
import SustentabilidadLanding from './pages/Home/Categorias/EnergiasLimpias';
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

// Componente para manejar redirección inteligente a acciones que requieren login
function SmartActionRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  
  if (!isLoggedIn) {
    // Si no está logueado, redirigir al login con un mensaje
    return <Navigate to="/login?message=Para realizar esta acción, necesitas inscribirte&action=inscription" replace />;
  }
  
  return children;
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
          <Route path="/catalogo/proyectoSocial" element={<ProyectoSocial />} />
          <Route path="/alumno/convocatoria" element={<Convocatoria />} />
          <Route path="/alumno/convocatoria/lineamientos" element={<Lineamientos />} />
          <Route path='/catalogo/emprendimientotec' element={<EmprendimientoTec />} />
          <Route path='/catalogo/innovacion' element={<InnovacionProductosLanding />} />
          <Route path='/catalogo/energiaslimpias' element={<SustentabilidadLanding />} />
          
          {/* 3. ESTAS ACCIONES DE ALUMNO SÍ REQUIEREN LOGIN */}
          <Route path='/alumno/inscripcion' element={<Formulario />} />
          <Route path='/alumno/subirProyecto' element={<SmartActionRoute><SubirProyectos /></SmartActionRoute>} />

          {/* 4. RUTAS ADICIONALES PARA MEJOR ACCESIBILIDAD */}
          <Route path='/inscripcion' element={<Formulario />} />
          <Route path='/subir-proyecto' element={<SmartActionRoute><SubirProyectos /></SmartActionRoute>} />

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