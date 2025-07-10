import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Rocket, Code, Zap, ChevronRight, ArrowLeft } from 'lucide-react';
import fondoHero from '../../../assets/images/convocatoriaIMG.jpg';

const EmprendimientoTec= () => {
  const navigate = useNavigate();

  const styles = `
    .landing-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      min-height: 100vh;
    }
    
    /* Hero Section - Mismos colores que Proyectos Sociales */
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
    
    /* Features Section - Mismo estilo pero con iconos tech */
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
    
    /* Tech Showcase con colores coherentes */
    .tech-showcase {
      background: #f8fafc;
      border-radius: 1rem;
      padding: 3rem 2rem;
      margin-bottom: 3rem;
      text-align: center;
    }
    
    .tech-title {
      font-size: 2rem;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      max-width: 800px;
      margin: 0 auto 2rem;
    }
    
    .tech-tag {
      background: #ccfbf1;
      color: #0f766e;
      padding: 0.5rem 1.25rem;
      border-radius: 2rem;
      font-weight: 600;
      font-size: 0.875rem;
      border: 1px solid #99f6e4;
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
      
      .tech-tags {
        gap: 0.5rem;
      }
      
      .tech-tag {
        padding: 0.4rem 1rem;
        font-size: 0.75rem;
      }
    }
  `;

  const techAreas = [
    "Inteligencia Artificial",
    "Realidad Aumentada",
    "Blockchain",
    "IoT",
    "Apps Móviles",
    "Big Data",
    "Machine Learning",
    "Robótica",
    "Cloud Computing",
    "Ciberseguridad",
    "Videojuegos Educativos",
    "Fintech"
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="title-container">
            <Cpu size={48} />
            <h1 className="hero-title">Emprendimiento Tecnológico con Impacto</h1>
          </div>
          <p className="hero-subtitle">
            Desarrolla soluciones tecnológicas innovadoras que resuelvan problemas reales y transformen comunidades.
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/inscripcion')}
          >
            Presenta tu proyecto <ChevronRight size={20} />
          </button>
        </section>
        
        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
              <Rocket size={28} />
            </div>
            <h3 className="feature-title">Aceleración Tech</h3>
            <p className="feature-description">
              Programa especializado para startups tecnológicas con mentorías técnicas y de negocio.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Code size={28} />
            </div>
            <h3 className="feature-title">Desarrollo</h3>
            <p className="feature-description">
              Asesoría en arquitectura de software, UX/UI y mejores prácticas de desarrollo.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={28} />
            </div>
            <h3 className="feature-title">Conexiones</h3>
            <p className="feature-description">
              Red con inversionistas, empresas tech y potenciales clientes.
            </p>
          </div>
        </section>
        
        {/* Tech Showcase */}
        <section className="tech-showcase">
          <h3 className="tech-title">Áreas de Innovación</h3>
          <p>Impulsamos proyectos en diversas áreas tecnológicas:</p>
          <div className="tech-tags">
            {techAreas.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="final-cta">
          <h2>La tecnología como herramienta de transformación</h2>
          <p>
            ¿Tienes una solución tecnológica que pueda mejorar vidas? Conviértela en un emprendimiento sostenible con nuestro apoyo.
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

export default EmprendimientoTec;