import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/EvaluacionDeProyectos/Inicio'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Evaluacion from './pages/EvaluacionDeProyectos/Evaluacion';
import CalProyectos from './pages/EvaluacionDeProyectos/CalProyectos';
import Convocatoria from './pages/EvaluacionDeProyectos/Convocatoria';
import Catalogo from './pages/EvaluacionDeProyectos/Catalogo';
import './App.css'


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Login></Login>}></Route>
          <Route path='/inicio/*' element={<Inicio></Inicio>}>
            <Route path='convocatoria/*' element={<Convocatoria></Convocatoria>}>
              <Route path='lineamientos' element={<Convocatoria></Convocatoria>}></Route>
            </Route>
            <Route path='home' element={<Home></Home>}></Route>
            <Route path='evaluacion/*' element={<Evaluacion></Evaluacion>}>
              <Route path='calProyectos' element={<CalProyectos></CalProyectos>}></Route>
          </Route>
        </Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='catalogo' element={<Catalogo></Catalogo>}></Route>
      </Routes>
    </Router>
  )
}

export default App
