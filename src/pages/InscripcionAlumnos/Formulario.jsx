import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./formulario.css";
import { register } from '../../services/apiService'; // <-- Importa la función de registro

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
    // Mapea los campos del formulario a los que espera el backend
    const userData = {
      username: formulario.usuario,
      email: formulario.correo,
      password: formulario.contrasena,
      nombre: formulario.nombre,
      carrera: formulario.programa,
      cuatrimestre: formulario.cuatrimestre,
      categoria: formulario.categoria,
      roles: ["user"] // Puedes ajustar esto si quieres permitir roles distintos
    };
    try {
      await register(userData);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate('/login'); // Redirige al login o donde prefieras
    } catch (error) {
      alert(error.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="formulario-container">
      <button
        onClick={() => navigate('/alumno')}
        style={{
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.5rem 1.5rem',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(15, 118, 110, 0.15)',
        }}
      >
        Volver al menú principal
      </button>
      <div className="formulario-header">
        <h1>Feria de Emprendimiento e Innovación Social 2025</h1>
        <p>
          ¡Participa en la 5ta edición de la Feria de Emprendimiento e
          Innovación Social! Esta es tu oportunidad para compartir tu propuesta
          innovadora y demostrar tu creatividad, habilidades y compromiso con
          tu comunidad. Llena el siguiente formulario con tus datos generales.
          Posteriormente, accede a la Plataforma Virtual de la Incubadora de
          Empresas Círculo de Innovación para descargar los documentos
          necesarios. Una vez completados, vuelve aquí para subirlos en formato
          PDF.
        </p>
      </div>

      <form className="formulario" onSubmit={handleSubmit}>
        <label>
          Correo institucional (líder del proyecto):
          <input
            type="email"
            name="correo"
            required
            value={formulario.correo}
            onChange={handleChange}
          />
        </label>

        <label>
          Nombre completo del líder del proyecto:
          <input
            type="text"
            name="nombre"
            required
            value={formulario.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          Nombre de Usuario:
          <input
            type="text"
            name="usuario"
            required
            value={formulario.usuario}
            onChange={handleChange}
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="contrasena"
            required
            value={formulario.contrasena}
            onChange={handleChange}
          />
        </label>

        <label>
          Programa académico:
          <select
            name="programa"
            required
            value={formulario.programa}
            onChange={handleChange}
          >
            <option value="">-- Selecciona --</option>
            <option>Ing. Mecatrónica</option>
            <option>Ing. Agroindustrial</option>
            <option>Ing. Software</option>
            <option>Ing. Biomédica</option>
            <option>Ing en Energía</option>
            <option>Ing. Petrolera</option>
            <option>Ing. en Tecnología de Manufactura</option>
            <option>Ing. en Tecnología Ambiental</option>
            <option>Ing. Nanotecnología</option>
            <option>Lic. en Administración y Gestión Empresarial</option>
          </select>
        </label>

        <label>
          Cuatrimestre actual (1-15):
          <input
            type="number"
            name="cuatrimestre"
            min="1"
            max="15"
            required
            value={formulario.cuatrimestre}
            onChange={handleChange}
          />
        </label>

        <label>
          Categoría en la que participas:
          <select
            name="categoria"
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
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
