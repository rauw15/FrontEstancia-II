import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { createProject } from '../../services/apiService';
import { ChevronLeft } from 'lucide-react';

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
  const { isLoggedIn, user } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para enviar un proyecto.");
      navigate('/login');
      return;
    }
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

    const formData = new FormData();
    formData.append('nombreProyecto', nombreProyecto);
    formData.append('descripcion', descripcion);
    formData.append('videoPitch', videoPitch);
    formData.append('fichaTecnica', fichaTecnica);
    formData.append('modeloCanva', modeloCanva);
    formData.append('pdfProyecto', pdfProyecto);
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (userId) formData.append('userId', userId);

    try {
      await createProject(formData);
      alert("Proyecto enviado con éxito.");
      navigate('/alumno');
    } catch (error) {
      alert("Error al enviar el proyecto: " + (error.message || 'Error desconocido'));
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
      max-width: 1100px;
      margin: 1.5rem auto;
      padding: 0 1.5rem;
    }

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

    .form-note {
      color: var(--color-gray-500);
      font-size: 0.875rem;
      font-style: italic;
      margin-top: 0.25rem;
      display: block;
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

    .form-textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 1rem;
      min-height: 120px;
      resize: vertical;
      transition: all 0.2s ease;
    }

    .form-textarea:focus {
      outline: none;
      border-color: var(--color-primary-light);
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
    }

    .form-file {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      font-size: 1rem;
      background: var(--color-gray-50);
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
          <h1 className="form-title">Entrega de Proyecto</h1>
          <p className="form-description">
            Llena este formulario para entregar los documentos requeridos de tu proyecto.
            Asegúrate de que los archivos estén en formato PDF y correctamente nombrados.
          </p>
          <span className="form-note">* Todos los campos son obligatorios.</span>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre del proyecto:</label>
              <input
                type="text"
                name="nombreProyecto"
                className="form-input"
                value={formulario.nombreProyecto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descripción del proyecto:</label>
              <textarea
                name="descripcion"
                className="form-textarea"
                value={formulario.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Liga del video pitch (explicación del proyecto):</label>
              <input
                type="text"
                name="videoPitch"
                className="form-input"
                value={formulario.videoPitch}
                onChange={handleChange}
                required
              />
              <span className="form-note">YouTube o Drive. El video no deberá tener restricción de acceso, para que el evaluador pueda visualizar el video pitch.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Ficha técnica (PDF):</label>
              <input
                type="file"
                name="fichaTecnica"
                className="form-file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Modelo Canva (PDF):</label>
              <input
                type="file"
                name="modeloCanva"
                className="form-file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Resumen ejecutivo (PDF):</label>
              <input
                type="file"
                name="pdfProyecto"
                className="form-file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Enviar Proyecto</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioEntregaProyecto;