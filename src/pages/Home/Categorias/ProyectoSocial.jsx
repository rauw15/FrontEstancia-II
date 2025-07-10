import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, ArrowLeft, Sparkles, Users, Globe } from 'lucide-react';
import fondoHero from '../../../assets/images/convocatoriaIMG.jpg';

const ProyectosSocialesLanding = () => {
  const navigate = useNavigate();

  const styles = `
    .landing-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      min-height: 100vh;
    }
    
    /* Hero Section */
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
    
    /* Benefits Section */
    .benefits-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 4rem;
    }
    
    .benefit-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    
    .benefit-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(15, 118, 110, 0.1);
    }
    
    .benefit-icon {
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
    
    .benefit-title {
      font-size: 1.5rem;
      color: #1e293b;
      margin-bottom: 1rem;
    }
    
    .benefit-description {
      color: #64748b;
      line-height: 1.6;
    }
    
    /* Final CTA */
    .final-cta {
      text-align: center;
      padding: 4rem 2rem;
      background: #f0fdfa;
      border-radius: 1rem;
      margin-bottom: 2rem;
    }
    
    .final-cta h2 {
      font-size: 2rem;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }
    
    .final-cta p {
      color: #475569;
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
      
      .benefits-section {
        grid-template-columns: 1fr;
      }
      
      .benefit-card {
        padding: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="title-container">
            <Heart size={48} className="title-icon" />
            <h1 className="hero-title">Transforma tu comunidad</h1>
          </div>
          <p className="hero-subtitle">
            Tu idea puede ser la chispa que genere un cambio positivo. Desarrolla tu proyecto social y participa en nuestra comunidad de agentes de cambio.
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/inscripcion')}
          >
            Comienza tu proyecto <ChevronRight size={20} />
          </button>
      </section>

      {/* Benefits Section */}
        <section className="benefits-section">
          <div className="benefit-card">
            <div className="benefit-icon">
              <Sparkles size={28} />
            </div>
            <h3 className="benefit-title">Impacto Real</h3>
            <p className="benefit-description">
              Desarrolla soluciones concretas que mejoren la vida de las personas en tu comunidad.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <Users size={28} />
                    </div>
            <h3 className="benefit-title">Apoyo Continuo</h3>
            <p className="benefit-description">
              Recibe mentoría, recursos y acompañamiento para hacer crecer tu proyecto.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">
              <Globe size={28} />
              </div>
            <h3 className="benefit-title">Visibilidad</h3>
            <p className="benefit-description">
              Difunde tu iniciativa y conéctate con una red de emprendedores sociales.
            </p>
        </div>
      </section>

      {/* Final CTA */}
        <section className="final-cta">
          <h2>¿Qué esperas para empezar?</h2>
          <p>
            Cada gran cambio comienza con una idea. Nosotros te ayudamos a convertir la tuya en un proyecto que transforme vidas.
          </p>
          <button 
            className="cta-button"
            style={{background: '#0f766e', color: 'white'}}
            onClick={() => navigate('/inscripcion')}
          >
            Inscríbete ahora <ChevronRight size={20} />
          </button>
      </section>
    </div>
    </>
  );
};

export default ProyectosSocialesLanding;