import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Sun, Wind, BatteryCharging, ChevronRight } from 'lucide-react';
import fondoHero from '../../../assets/images/convocatoriaIMG.jpg';

const SustentabilidadLanding = () => {
  const navigate = useNavigate();

  const styles = `
    .landing-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      min-height: 100vh;
    }
    
    /* Hero Section - Mismos colores con overlay verde */
    .hero-section {
      background: linear-gradient(rgba(15, 118, 110, 0.9), rgba(16, 185, 129, 0.7)), 
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
    
    /* Features Section - Mismo estilo con iconos ecológicos */
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
      border-top: 4px solid #10b981;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(16, 185, 129, 0.1);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      background: #ecfdf5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      color: #10b981;
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
    
    /* Tech Showcase */
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
      background: #d1fae5;
      color: #065f46;
      padding: 0.5rem 1.25rem;
      border-radius: 2rem;
      font-weight: 600;
      font-size: 0.875rem;
      border: 1px solid #a7f3d0;
    }
    
    /* Impacto Section */
    .impacto-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .impacto-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      text-align: center;
    }
    
    .impacto-card h4 {
      color: #065f46;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    
    /* Final CTA - Verde más intenso */
    .final-cta {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #059669, #10b981);
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
    }
  `;

  const areasSustentabilidad = [
    "Energía Solar",
    "Energía Eólica",
    "Biocombustibles",
    "Movilidad Eléctrica",
    "Eficiencia Energética",
    "Agricultura Sustentable",
    "Tratamiento de Aguas",
    "Construcción Verde",
    "Economía Circular",
    "Tecnologías de Reciclaje",
    "Captura de Carbono",
    "Energías Oceánicas"
  ];

  const impactos = [
    {
      titulo: "Reducción de Huella",
      descripcion: "Soluciones para disminuir emisiones de CO2 y otros contaminantes"
    },
    {
      titulo: "Consumo Responsable",
      descripcion: "Tecnologías que promueven el uso eficiente de recursos"
    },
    {
      titulo: "Regeneración",
      descripcion: "Proyectos que restauran ecosistemas y biodiversidad"
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="title-container">
            <Leaf size={48} />
            <h1 className="hero-title">Innovación para el Planeta</h1>
          </div>
          <p className="hero-subtitle">
            Desarrolla soluciones limpias y sostenibles que combatan el cambio climático y preserven nuestros recursos naturales.
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/inscripcion')}
          >
            Participa con tu proyecto <ChevronRight size={20} />
          </button>
        </section>
        
        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
              <Sun size={28} />
            </div>
            <h3 className="feature-title">Energías Renovables</h3>
            <p className="feature-description">
              Soluciones innovadoras en generación y almacenamiento de energía limpia.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Wind size={28} />
            </div>
            <h3 className="feature-title">Tecnologías Verdes</h3>
            <p className="feature-description">
              Desarrollo de productos y procesos ambientalmente responsables.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <BatteryCharging size={28} />
            </div>
            <h3 className="feature-title">Eficiencia</h3>
            <p className="feature-description">
              Sistemas que optimizan el uso de recursos y reducen desperdicios.
            </p>
          </div>
        </section>
        
        {/* Tech Showcase */}
        <section className="tech-showcase">
          <h3 className="tech-title">Áreas de Impacto</h3>
          <p>Proyectos en diversas áreas de sustentabilidad ambiental:</p>
          <div className="tech-tags">
            {areasSustentabilidad.map((area, index) => (
              <span key={index} className="tech-tag">{area}</span>
            ))}
          </div>
        </section>
        
        {/* Impacto Section */}
        <section className="impacto-section">
          {impactos.map((impacto, index) => (
            <div key={index} className="impacto-card">
              <h4>{impacto.titulo}</h4>
              <p>{impacto.descripcion}</p>
            </div>
          ))}
        </section>
        
        {/* Final CTA */}
        <section className="final-cta">
          <h2>El futuro es sostenible</h2>
          <p>
            ¿Tienes una solución para los desafíos ambientales de hoy? Únete a la comunidad de innovadores verdes.
          </p>
          <button 
            className="cta-button"
            style={{background: 'white', color: '#065f46'}}
            onClick={() => navigate('/inscripcion')}
          >
            Regístrate ahora <ChevronRight size={20} />
          </button>
        </section>
      </div>
    </>
  );
};

export default SustentabilidadLanding;