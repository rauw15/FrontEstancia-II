import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./subirProyectos.css";

const FormularioEntregaProyecto = () => {
  const [formulario, setFormulario] = useState({
    nombreProyecto: "",
    descripcion: "",
    videoPitch: "",
    fichaTecnica: null,
    modeloCanva: null,
    pdfProyecto: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0] && files[0].type === "application/pdf") {
      setFormulario({ ...formulario, [name]: files[0] });
    } else {
      alert("Por favor, sube un archivo PDF válido.");
      e.target.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    const {
      nombreProyecto,
      descripcion,
      videoPitch,
      fichaTecnica,
      modeloCanva,
      pdfProyecto,
    } = formulario;

    if (
      !nombreProyecto ||
      !descripcion ||
      !videoPitch ||
      !fichaTecnica ||
      !modeloCanva ||
      !pdfProyecto
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    alert("Formulario enviado con éxito (aquí puedes agregar la lógica real de envío).");
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
        <h1>Entrega de Proyecto</h1>
        <p>
          Llena este formulario para entregar los documentos requeridos de tu proyecto.
          Asegúrate de que los archivos estén en formato PDF y correctamente nombrados.
        </p>
        <span className="formulario-note">* Todos los campos son obligatorios.</span>
      </div>

      <form className="formulario" onSubmit={handleSubmit}>
        <label>
          Nombre del proyecto:
          <input
            type="text"
            name="nombreProyecto"
            value={formulario.nombreProyecto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descripción del proyecto:
          <textarea
            name="descripcion"
            rows="4"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Liga del video pitch (explicación del proyecto): <span className="formulario-note">*youtube o drive, El video no deberá tener restricción de acceso, para que el evaluador pueda visualizar el video pitch.</span>
          <input
            type="text"
            name="videoPitch"
            value={formulario.videoPitch}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Ficha técnica (PDF):
          <input
            type="file"
            name="fichaTecnica"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </label>

        <label>
          Modelo Canva (PDF):
          <input
            type="file"
            name="modeloCanva"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </label>

        <label>
          Resumen ejecutivo (PDF):
          <input
            type="file"
            name="pdfProyecto"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormularioEntregaProyecto;
