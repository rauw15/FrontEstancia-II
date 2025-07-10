import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Package, TrendingUp, ChevronRight, ArrowLeft } from 'lucide-react';
import fondoHero from '../../../assets/images/convocatoriaIMG.jpg';

const InnovacionProductosLanding = () => {
  const navigate = useNavigate();

  const styles = `
    .landing-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      min-height: 100vh;
    }
    
    /* Hero Section - Mismos colores */
    .hero-section {
      background: linear-gradient(rgba(15, 118, 110, 0.8), rgba(15, 118, 110, 0.6)), 
                  url(${fondoHero});
      background-size: cover;
      background-position: center;
      border-radius: 1rem;
      padding: 4rem 2rem;
      text-align: center;
      color: white;
      margin-bottom: 3rem;
      box-shadow: 0 8px 32px rgba(15, 118, 110, 0.2);
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      max-width: 700px;
      margin: 0 auto 2rem;
      line-height: 1.6;
    }
    
    .cta-button {
      display: inline-flex;
      align-items: center;
      background: white;
      color: #0f766e;
      border: none;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
    
    .cta-button svg {
      margin-left: 0.5rem;
    }
    
    /* Features Section - Mismo estilo */
    .features-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 4rem;
    }
    
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-top: 4px solid #0f766e;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(15, 118, 110, 0.1);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      background: #f0fdfa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      color: #0f766e;
    }
    
    .feature-title {
      font-size: 1.5rem;
      color: #1e293b;
      margin-bottom: 1rem;
    }
    
    .feature-description {
      color: #64748b;
      line-height: 1.6;
    }
    
    /* Ejemplos Section */
    .ejemplos-section {
      background: #f8fafc;
      border-radius: 1rem;
      padding: 3rem 2rem;
      margin-bottom: 3rem;
      text-align: center;
    }
    
    .ejemplos-title {
      font-size: 2rem;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }
    
    .ejemplos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .ejemplo-item {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    .ejemplo-item strong {
      color: #0f766e;
    }
    
    /* Final CTA - Mismos colores */
    .final-cta {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #0f766e, #14b8a6);
      border-radius: 1rem;
      margin-bottom: 2rem;
      color: white;
    }
    
    .final-cta h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
    
    .final-cta p {
      max-width: 600px;
      margin: 0 auto 2rem;
      line-height: 1.6;
      font-size: 1.125rem;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .features-section {
        grid-template-columns: 1fr;
      }
      
      .feature-card {
        padding: 1.5rem;
      }
    }
  `;

  const ejemplosInnovacion = [
    "Productos <strong>ecológicos</strong> con materiales alternativos",
    "Servicios basados en <strong>economía circular</strong>",
    "Modelos de negocio <strong>colaborativos</strong>",
    "Soluciones <strong>multifuncionales</strong> para necesidades cotidianas",
    "Productos con <strong>diseño universal</strong>",
    "Servicios que <strong>digitalizan</strong> procesos tradicionales"
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="title-container">
            <Lightbulb size={48} />
            <h1 className="hero-title">Innovación que Transforma</h1>
          </div>
          <p className="hero-subtitle">
            Convierte tus ideas en productos y servicios innovadores que generen valor y solucionen problemas reales.
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/inscripcion')}
          >
            Presenta tu innovación <ChevronRight size={20} />
          </button>
        </section>
        
        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
              <Lightbulb size={28} />
            </div>
            <h3 className="feature-title">Ideación</h3>
            <p className="feature-description">
              Metodologías para desarrollar y validar ideas innovadoras de productos y servicios.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Package size={28} />
            </div>
            <h3 className="feature-title">Prototipado</h3>
            <p className="feature-description">
              Apoyo en el desarrollo de prototipos y pruebas de concepto.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={28} />
            </div>
            <h3 className="feature-title">Comercialización</h3>
            <p className="feature-description">
              Estrategias para llevar tu innovación al mercado de manera efectiva.
            </p>
          </div>
        </section>
        
        {/* Ejemplos Section */}
        <section className="ejemplos-section">
          <h3 className="ejemplos-title">Áreas de Innovación</h3>
          <p>Descubre el potencial de transformación en diferentes sectores:</p>
          <div className="ejemplos-grid">
            {ejemplosInnovacion.map((ejemplo, index) => (
              <div key={index} className="ejemplo-item" dangerouslySetInnerHTML={{ __html: ejemplo }} />
            ))}
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="final-cta">
          <h2>La innovación comienza con una idea</h2>
          <p>
            ¿Has identificado una oportunidad para mejorar un producto o servicio? Este es el espacio para desarrollarla.
          </p>
          <button 
            className="cta-button"
            style={{background: 'white', color: '#0f766e'}}
            onClick={() => navigate('/inscripcion')}
          >
            Regístrate ahora <ChevronRight size={20} />
          </button>
        </section>
      </div>
    </>
  );
};

export default InnovacionProductosLanding;