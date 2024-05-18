import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/EvaluacionDeProyectos/Inicio'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Evaluacion from './pages/EvaluacionDeProyectos/Evaluacion';
import CalProyectos from './pages/EvaluacionDeProyectos/CalProyectos';
import './App.css'


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/inicio/*' element={<Inicio></Inicio>}>
          <Route path='home' element={<Home></Home>}></Route>
          <Route path='evaluacion/*' element={<Evaluacion></Evaluacion>}>
            <Route path='calProyectos' element={<CalProyectos></CalProyectos>}></Route>
          </Route>
        </Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='calProyectos' element={<CalProyectos></CalProyectos>}></Route>
      </Routes>
    </Router>
  )
}

export default App
