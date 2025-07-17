import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/apiService';
import { ChevronLeft } from 'lucide-react';

const Formulario = () => {
  const [formulario, setFormulario] = useState({
    correo: "",
    nombre: "",
    usuario: "",
    contrasena: "",
    programa: "",
    cuatrimestre: "",
    categoria: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: formulario.usuario,
      email: formulario.correo,
      password: formulario.contrasena,
      nombre: formulario.nombre,
      carrera: formulario.programa,
      cuatrimestre: formulario.cuatrimestre,
      categoria: formulario.categoria,
      roles: ["user"]
    };
    
    try {
      await register(userData);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate('/login');
    } catch (error) {
      alert(error.message || "Error al registrar usuario");
    }
  };

  const styles = `
    :root {
      --color-primary: #0f766e;
      --color-primary-dark: #0d5b52;
      --color-primary-light: #14b8a6;
      --color-secondary: #ec4899;
      --color-white: #ffffff;
      --color-gray-50: #f8fafc;
      --color-gray-100: #f1f5f9;
      --color-gray-200: #e2e8f0;
      --color-gray-300: #cbd5e1;
      --color-gray-400: #94a3b8;
      --color-gray-500: #64748b;
      --color-gray-600: #475569;
      --color-gray-700: #334155;
      --color-gray-800: #1e293b;
      --color-gray-900: #0f172a;
    }

    .form-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    /* Estilo del botón igual al del Catálogo */
    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--color-gray-100);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      color: var(--color-gray-700);
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 2rem;
    }

    .back-button:hover {
      background: var(--color-gray-200);
      color: var(--color-primary);
    }

    /* Resto de tus estilos... */
    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 1rem;
    }

    .form-description {
      color: var(--color-gray-600);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .form-card {
      background: var(--color-white);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.1);
      border: 1px solid var(--color-gray-200);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--color-gray-700);
    }

    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--color-primary-light);
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
    }

    .form-select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    .submit-btn {
      width: 100%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border: none;
      padding: 1rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(15, 118, 110, 0.2);
      margin-top: 1rem;
    }

    .submit-btn:hover {
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.3);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="form-container">
        <button className="back-button" onClick={() => navigate('/alumno')}>
          <ChevronLeft size={18} /> Volver al menú principal
        </button>

        <div className="form-header">
          <h1 className="form-title">Feria de Emprendimiento e Innovación Social 2025</h1>
          <p className="form-description">
            ¡Participa en la 5ta edición de la Feria de Emprendimiento e
            Innovación Social! Esta es tu oportunidad para compartir tu propuesta
            innovadora y demostrar tu creatividad, habilidades y compromiso con
            tu comunidad.
          </p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Correo institucional (líder del proyecto):</label>
              <input
                type="email"
                name="correo"
                className="form-input"
                required
                value={formulario.correo}
                onChange={handleChange}
              />
            </div>

            {/* Resto de los campos del formulario... */}
            <div className="form-group">
              <label className="form-label">Nombre completo del líder del proyecto:</label>
              <input
                type="text"
                name="nombre"
                className="form-input"
                required
                value={formulario.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nombre de Usuario:</label>
              <input
                type="text"
                name="usuario"
                className="form-input"
                required
                value={formulario.usuario}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                name="contrasena"
                className="form-input"
                required
                value={formulario.contrasena}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Programa académico:</label>
              <select
                name="programa"
                className="form-select"
                required
                value={formulario.programa}
                onChange={handleChange}
              >
                <option value="">-- Selecciona --</option>
                <option>Ing. Mecatrónica</option>
                <option>Ingeniería en Tecnologías de la Información e Innovación Digital "Software"</option>
                <option>Ing. Biomédica</option>
                <option>Ing. en Alimentos</option>
                <option>Ing en Energía y Desarrollo Sostenible</option>
                <option>Ing. Petrolera</option>
                <option>Ing. en Manufactura Avanzada</option>
                <option>Ing. en Ambiental y Sustentabilidad</option>
                <option>Ing. Nanotecnología</option>
                <option>Lic. en Administración</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Cuatrimestre actual (1-15):</label>
              <input
                type="number"
                name="cuatrimestre"
                className="form-input"
                min="1"
                max="15"
                required
                value={formulario.cuatrimestre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Categoría en la que participas:</label>
              <select
                name="categoria"
                className="form-select"
                required
                value={formulario.categoria}
                onChange={handleChange}
              >
                <option value="">-- Selecciona --</option>
                <option>Proyecto Social</option>
                <option>Emprendimiento Tecnológico</option>
                <option>Innovación en Productos y Servicios</option>
                <option>Energías Limpias y Sustentabilidad Ambiental</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">Enviar Registro</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;