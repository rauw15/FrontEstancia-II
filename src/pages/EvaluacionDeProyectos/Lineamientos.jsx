import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Pdf from '../../components/Pdf';
import { ArrowLeft } from 'lucide-react';

function Lineamientos() {
  const navigate = useNavigate();
  const location = useLocation();
  const pdfFileName = 'LINEAMIENTOS PARTICIPACION Y EVALUACION.pdf';
  const pdfUrl = `/downloads/${pdfFileName}`;
  const encodedUrl = encodeURI(pdfUrl);

  // Determinar si es alumno o admin basado en la ruta
  const isAlumno = location.pathname.startsWith('/alumno');
  const backPath = isAlumno ? '/alumno' : '/inicio/home';

  const styles = `
    .lineamientos-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f0fdfa 0%, #fdf2f8 100%);
      padding: 2rem 1rem;
    }

    .lineamientos-content {
      max-width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .lineamientos-header {
      background: linear-gradient(135deg, #0f766e, #14b8a6);
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .lineamientos-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .lineamientos-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .back-button {
      position: absolute;
      top: 2rem;
      left: 2rem;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }

    .back-button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .pdf-container {
      height: 80vh;
      width: 100%;
      border: none;
    }

    @media (max-width: 768px) {
      .lineamientos-header {
        padding: 1.5rem 1rem;
      }
      
      .lineamientos-header h1 {
        font-size: 1.5rem;
      }
      
      .back-button {
        top: 1rem;
        left: 1rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      
      .pdf-container {
        height: 70vh;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="lineamientos-container">
        <div className="lineamientos-content">
          <div className="lineamientos-header" style={{ position: 'relative' }}>
            <button 
              className="back-button"
              onClick={() => navigate(backPath)}
            >
              <ArrowLeft size={20} />
              Volver al menú
            </button>
            <h1>Lineamientos de Participación</h1>
            <p>Feria de Emprendimiento e Innovación Social 2025</p>
          </div>
          <div className="pdf-container">
            <Pdf url={encodedUrl} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Lineamientos; 