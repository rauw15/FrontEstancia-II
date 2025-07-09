import React, { useState, useEffect } from 'react';
import { Menu, X, Users, Lightbulb, Trophy, Calendar, Upload, FileText, ChevronRight, Star, Target, Heart, Zap } from 'lucide-react';
import { useNavigate, Outlet, Routes, Route } from 'react-router-dom';
import Catalogo from '../EvaluacionDeProyectos/Catalogo';
import Convocatoria from '../EvaluacionDeProyectos/Convocatoria';
import Lineamientos from '../EvaluacionDeProyectos/Lineamientos';
import Formulario from '../InscripcionAlumnos/Formulario';
import SubirProyectos from '../InscripcionAlumnos/SubirProyectos';
import Home from './Home';
// Importar imágenes
import rombosImg from '../../assets/images/rombos.png';
import logoUpImg from '../../assets/images/Logo Upchiapas png.png';
import feriaEmprendimientoImg from '../../assets/images/5 FERIA EMPRENDIMIENTO.png';
import feriaEmprendimientoBImg from '../../assets/images/5 FERIA EMPRENDIMIENTO B.png';

import { useAuth } from '../../AuthProvider'; 

const Alumno = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const [fade, setFade] = useState(true);
  const [downloadsMenuOpen, setDownloadsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout: authLogout } = useAuth();

  const displayName = isLoggedIn && user ? user.username : 'Invitado';
  const avatarText = (displayName || 'IN').slice(0, 2).toUpperCase();
  
  const handleLogout = () => {
    authLogout(); // Llama a la función del AuthProvider
    navigate('/login'); // Redirige al login
  };

  // Función de scroll suave personalizada que funciona en todos los navegadores
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id '${elementId}' not found`);
      return;
    }

    // Verificar que el elemento tiene las propiedades necesarias
    if (typeof element.offsetTop === 'undefined') {
      console.warn(`Element '${elementId}' does not have offsetTop property`);
      return;
    }

    // Detectar si es un dispositivo móvil para ajustar la velocidad
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const duration = isMobile ? 600 : 800; // Más rápido en móviles

    // Fallback para navegadores que no soportan requestAnimationFrame
    if (!window.requestAnimationFrame) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const targetPosition = element.offsetTop - 80; // Ajuste para el header fijo
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Función de easing para una animación más suave
    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  // Función adicional para detectar si el navegador soporta scroll suave nativo
  const isSmoothScrollSupported = () => {
    return 'scrollBehavior' in document.documentElement.style;
  };

  const images = [
    feriaEmprendimientoImg,
    feriaEmprendimientoBImg
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 200);
  };
  const prevImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
      setFade(true);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Users, number: "500+", label: "Participantes" },
    { icon: Lightbulb, number: "150+", label: "Proyectos" },
    { icon: Star, number: "98%", label: "Satisfacción" }
  ];

  // Agrega este estado al inicio del componente
const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

// Fecha objetivo (ajusta según necesites)
const targetDate = new Date('2025-07-18T00:00:00');

useEffect(() => {
  const timer = setInterval(() => {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      clearInterval(timer);
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, 1000);

  return () => clearInterval(timer);
}, []);


  const categories = [
    {
      icon: Heart,
      title: "Proyecto Social",
      description: "Proyectos que generen un cambio positivo en la comunidad",
      colorClass: "category-social"
    },
    {
      icon: Target,
      title: "Emprendimiento Tecnológico",
      description: "Soluciones tecnológicas para problemas sociales",
      colorClass: "category-tech"
    },
    {
      icon: Zap,
      title: "Innovación en Productos y servicios",
      description: "Emprendimientos enfocados en el desarrollo sostenible",
      colorClass: "category-sustain"
    },
    {
      icon: Lightbulb,
      title: "Energías limpias y Sustentabilidad Ambiental",
      description: "Proyectos enfocados en el uso de energías renovables, eficiencia energética y soluciones para la protección y conservación del medio ambiente.",
      colorClass: "category-sustain"
    }
  ];

  const countdownStyles = `
  .countdown-container {
    margin: 2rem auto;
    max-width: 600px;
    text-align: center;
  }
  
  .countdown-title {
    font-size: 1.25rem;
    color: var(--color-gray-600);
    margin-bottom: 1rem;
  }
  
  .countdown-grid {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .countdown-item {
    background: var(--color-white);
    border-radius: 0.5rem;
    padding: 1rem;
    min-width: 80px;
    box-shadow: 0 4px 12px rgba(15, 118, 110, 0.1);
    border: 1px solid var(--color-gray-200);
  }
  
  .countdown-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-secondary);
    line-height: 1;
  }
  
  .countdown-label {
    font-size: 0.75rem;
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

  const styles = `
    /* Nuevos colores personalizados */
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

/* Fondo de rombos decorativos */
.main-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
        background-image: url(${rombosImg}); /* Cambia esto si tu imagen tiene otro nombre */
  background-repeat: repeat;
  background-size: 300px;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
}

/* Asegurar que el contenido esté por encima del fondo */
.main-container {
  position: relative;
  z-index: 1;
}
    /* Header */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.3s ease;
      background: var(--color-white);
      border-bottom: 1px solid var(--color-gray-200);
    }

    .header-scrolled {
      box-shadow: 0 4px 20px rgba(15, 118, 110, 0.1);
      border-bottom-color: var(--color-primary-light);
    }

    .header-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(15, 118, 110, 0.2);
    }

    .logo-icon img {
      width: 2.2rem;
      height: 2.2rem;
      object-fit: contain;
      border-radius: 0.4rem;
    }

    .logo-text h1 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-gray-800);
      line-height: 1.2;
    }

    .logo-text p {
      font-size: 0.75rem;
      color: var(--color-gray-500);
    }

    /* Navegación desktop */
    .desktop-nav {
      display: flex;
      gap: 1.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      color: var(--color-gray-600);
      transition: background 0.2s, color 0.2s;
      position: relative;
    }

    .nav-item:hover {
      background: var(--color-primary-light);
      color: var(--color-white);
    }

    .nav-item.nav-active {
      color: var(--color-primary);
    }

    .nav-item.nav-active::after {
      content: '';
      position: absolute;
      left: 1.5rem;
      right: 1.5rem;
      bottom: 0.3rem;
      height: 3px;
      background: var(--color-primary);
      border-radius: 2px;
    }

    /* Sección de usuario */
    .user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-logged {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 2rem;
      height: 2rem;
      background: var(--color-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-avatar span {
      color: var(--color-white);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .username {
      color: var(--color-gray-700);
      font-size: 0.875rem;
    }

    .logout-btn {
      background: none;
      border: none;
      color: var(--color-gray-500);
      font-size: 0.875rem;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .logout-btn:hover {
      color: var(--color-gray-700);
    }

    .login-btn {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(15, 118, 110, 0.2);
    }

    .login-btn:hover {
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);
    }

    /* Menú móvil */
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--color-gray-700);
      cursor: pointer;
    }

    .mobile-menu {
      background: var(--color-white);
      border-top: 1px solid var(--color-gray-200);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .mobile-menu-content {
      padding: 1.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .mobile-nav-item {
      background: none;
      border: none;
      color: var(--color-gray-600);
      text-align: left;
      padding: 0.5rem 0;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .mobile-nav-item:hover {
      color: var(--color-primary);
    }

    .mobile-login-section {
      padding-top: 1rem;
      border-top: 1px solid var(--color-gray-200);
    }

    .mobile-login-btn {
      width: 100%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border: none;
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
    }

    /* Hero Section */
    .hero-section {
      padding: 8rem 2rem 4rem;
      background: linear-gradient(135deg, var(--color-gray-50) 0%, var(--color-white) 50%, var(--color-gray-50) 100%);
    }

    .hero-content {
      max-width: 1280px;
      margin: 0 auto;
    }

    .hero-text {
      text-align: center;
      padding: 4rem 0;
    }

    .edition-badge {
      display: inline-block;
      background: linear-gradient(135deg, rgba(15, 118, 110, 0.1), rgba(20, 184, 166, 0.1));
      border: 1px solid var(--color-primary-light);
      border-radius: 2rem;
      padding: 0.5rem 1.5rem;
      margin-bottom: 2rem;
    }

    .edition-badge span {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.875rem;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }

    .hero-highlight {
      display: block;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      display: block;
      font-size: 2.5rem;
      color: var(--color-gray-700);
    }

    .hero-description {
      font-size: 1.25rem;
      color: var(--color-gray-600);
      margin-bottom: 2rem;
      max-width: 48rem;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border: none;
      padding: 1rem 2rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1.125rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      box-shadow: 0 4px 16px rgba(15, 118, 110, 0.2);
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.3);
    }

    .btn-secondary {
      background: var(--color-white);
      color: var(--color-primary);
      border: 2px solid var(--color-primary);
      padding: 1rem 2rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 4rem;
      justify-content: center;
      text-align: center;
    }

    .stat-card {
      background: var(--color-white);
      border-radius: 1rem;
      padding: 1.5rem;
      text-align: center;
      border: 1px solid var(--color-gray-200);
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .stat-card:hover {
      border-color: var(--color-primary-light);
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(15, 118, 110, 0.15);
    }

    .stat-icon {
      width: 2rem;
      height: 2rem;
      color: var(--color-primary);
      margin: 0 auto 0.75rem;
    }

    .stat-number {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: var(--color-gray-600);
      font-size: 0.875rem;
    }

    /* Secciones */
    .categories-section,
    .prizes-section {
      padding: 4rem 2rem;
      background: var(--color-white);
    }

    .section-content {
      max-width: 1280px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 1rem;
    }

    .section-header p {
      color: var(--color-gray-600);
      max-width: 32rem;
      margin: 0 auto;
    }

    /* Categories Grid */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    .category-card {
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .category-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(15, 118, 110, 0.05), rgba(20, 184, 166, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1;
    }

    .category-card:hover::before {
      opacity: 1;
    }

    .category-card:hover {
      transform: translateY(-4px);
    }

    .category-card:active {
      transform: translateY(-2px);
    }

    .category-content {
      background: var(--color-white);
      border-radius: 1rem;
      padding: 2rem;
      border: 1px solid var(--color-gray-200);
      height: 100%;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 2;
    }

    .category-card:hover .category-content {
      border-color: var(--color-primary-light);
      box-shadow: 0 12px 32px rgba(15, 118, 110, 0.15);
    }

    .category-icon {
      width: 4rem;
      height: 4rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      transition: transform 0.3s ease;
    }

    .category-card:hover .category-icon {
      transform: scale(1.1);
    }

    .category-social {
      background: linear-gradient(135deg, var(--color-secondary), #f472b6);
    }

    .category-tech {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    }

    .category-sustain {
      background: linear-gradient(135deg, #10b981, #34d399);
    }

    .category-icon svg {
      color: var(--color-white);
    }

    .category-content h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 1rem;
    }

    .category-content p {
      color: var(--color-gray-600);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .category-link {
      display: flex;
      align-items: center;
      color: var(--color-primary);
      font-weight: 500;
      transition: all 0.2s ease;
      position: relative;
    }

    .category-card:hover .category-link {
      color: var(--color-primary-dark);
    }

    .category-link span {
      margin-right: 0.5rem;
      color: #ec4899;
      transition: transform 0.2s ease;
    }

    .category-card:hover .category-link span {
      transform: translateX(4px);
    }

    .category-card:hover .category-link svg {
      transform: translateX(4px);
    }

    /* CTA Section */
    .cta-section {
      padding: 4rem 2rem;
      background: var(--color-gray-50);
    }

    .cta-content {
      max-width: 64rem;
      margin: 0 auto;
    }

    .cta-card {
      background: linear-gradient(135deg, rgba(15, 118, 110, 0.05), rgba(236, 72, 153, 0.05));
      border-radius: 1.5rem;
      padding: 3rem;
      text-align: center;
      border: 1px solid var(--color-primary-light);
      box-shadow: 0 8px 24px rgba(15, 118, 110, 0.1);
    }

    .cta-card h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-gray-800);
      margin-bottom: 1.5rem;
    }

    .cta-card p {
      font-size: 1.25rem;
      color: var(--color-gray-600);
      margin-bottom: 2rem;
    }

    .cta-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    /* Footer */
    .footer {
      background: var(--color-gray-800);
      color: var(--color-white);
      padding: 3rem 2rem;
    }

    .footer-content {
      max-width: 1280px;
      margin: 0 auto;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 2rem;
    }

    .footer-brand {
      grid-column: span 2;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .footer-logo .logo-text h1 {
      font-size: 1.25rem;
      color: var(--color-white);
    }

    .footer-logo .logo-text p {
      font-size: 0.75rem;
      color: var(--color-gray-400);
    }

    .footer-description {
      color: var(--color-gray-300);
      margin-bottom: 1.5rem;
      max-width: 24rem;
    }

    .footer-links h3,
    .footer-dates h3 {
      color: var(--color-white);
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .footer-links ul,
    .footer-dates ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li,
    .footer-dates li {
      margin-bottom: 0.5rem;
    }

    .footer-links a {
      color: var(--color-gray-400);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-links a:hover {
      color: var(--color-primary-light);
    }

    .footer-dates li {
      display: flex;
      align-items: center;
      color: var(--color-gray-400);
      gap: 0.5rem;
    }

    .footer-bottom {
      border-top: 1px solid var(--color-gray-700);
      margin-top: 2rem;
      padding-top: 2rem;
      text-align: center;
    }

    .footer-bottom p {
      color: var(--color-gray-400);
    }

    /* Responsive Design */
    @media (min-width: 640px) {
      .hero-buttons {
        flex-direction: row;
        justify-content: center;
      }

      .cta-buttons {
        flex-direction: row;
        justify-content: center;
      }
    }

    @media (min-width: 768px) {
      .hero-title {
        font-size: 4rem;
      }

      .hero-subtitle {
        font-size: 3rem;
      }

      .stats-grid {
        grid-template-columns: repeat(3, minmax(200px, 1fr));
        justify-content: center;
      }

      .categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 900px) {
      .categories-grid {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 1rem;
      }
      .category-card {
        min-width: 260px;
        flex: 0 0 auto;
      }
    }

    /* Margen especial para la tarjeta de Energías limpias */
    .energia-margin {
      margin-top: 3.5rem;
    }
  `;

   return (
    <>
      <style>{styles + countdownStyles}</style>
      <div className="main-container">
      {/* Header */}
      <header className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <img src={logoUpImg} alt="Logo UP Chiapas" style={{ width: '2.2rem', height: '2.2rem', objectFit: 'contain', borderRadius: '0.4rem' }} />
            </div>
            <div className="logo-text">
              <h1>UP Chiapas</h1>
              <p>Emprendimiento e Innovación</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {[{label: 'Inicio', action: () => { smoothScrollTo('hero-section'); setActiveSection('inicio'); }},
              {label: 'Convocatoria', action: () => { smoothScrollTo('convocatoria-section'); setActiveSection('convocatoria'); }},
              {label: 'Proyectos', action: () => { smoothScrollTo('categorias-participacion'); setActiveSection('proyectos'); }},
              {label: 'Descargables', action: () => { smoothScrollTo('cta-section'); setActiveSection('descargables'); }},
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`nav-item ${activeSection === item.label.toLowerCase() ? 'nav-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Section - MODIFICADO */}
          <div className="user-section">
            {isLoggedIn ? (
              // 4. SI ESTÁ LOGUEADO, mostramos el perfil del usuario del contexto
              <div className="user-logged">
                <div className="user-avatar">
                  <span>{avatarText}</span>
                </div>
                <span className="username">{displayName}</span>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Salir
                </button>
              </div>
            ) : (
              // 5. SI NO ESTÁ LOGUEADO, mostramos el botón de Iniciar Sesión
              <button
                onClick={() => navigate('/login')}
                className="login-btn"
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu (también necesita usar el contexto) */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {['Inicio', 'Convocatoria', 'Proyectos', 'Descargables'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    smoothScrollTo(`${item.toLowerCase()}-section`);
                    setActiveSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-item"
                >
                  {item}
                </button>
              ))}
              <div className="mobile-login-section">
                {isLoggedIn ? (
                   <button onClick={handleLogout} className="mobile-login-btn">Cerrar Sesión</button>
                ) : (
                  <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="mobile-login-btn">
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section" id='hero-section'>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="edition-badge">
              <span>5TA EDICIÓN</span>
            </div>
            <h1 className="hero-title">
              FERIA DE
              <span className="hero-highlight">EMPRENDIMIENTO</span>
              <span className="hero-subtitle">E INNOVACIÓN SOCIAL</span>
              <span className='hero-subtitle'>2025</span>
            </h1>
            <div className="countdown-container">
  <style>{countdownStyles}</style>
  <p className="countdown-title">¡La convocatoria cierra en!</p>
  <div className="countdown-grid">
    <div className="countdown-item">
      <div className="countdown-value">{timeLeft.days}</div>
      <div className="countdown-label">Días</div>
    </div>
    <div className="countdown-item">
      <div className="countdown-value">{timeLeft.hours}</div>
      <div className="countdown-label">Horas</div>
    </div>
    <div className="countdown-item">
      <div className="countdown-value">{timeLeft.minutes}</div>
      <div className="countdown-label">Minutos</div>
    </div>
    <div className="countdown-item">
      <div className="countdown-value">{timeLeft.seconds}</div>
      <div className="countdown-label">Segundos</div>
    </div>
  </div>
</div>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/alumno/inscripcion')}>
                Inscribirse ahora
                <ChevronRight size={20} />
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate('/lineamientos', '_blank')}
              >
                Lineamientos de participación
              </button>
            </div>
            <p className="hero-description">
              Conecta, innova y transforma tu comunidad. Únete a la plataforma de emprendimiento 
              más importante de Chiapas y haz realidad tus ideas de impacto social.
            </p>

            {/* Stats */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <stat.icon className="stat-icon" />
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id='convocatoria-section'>
                    {/* Carrusel de imágenes debajo de los botones */}
                    <div className="section-header">
                    <h2>Convocatoria</h2>
                    </div>
                    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <img
                  src={images[currentImage]}
                  alt={`Feria Emprendimiento 2025 ${currentImage + 1}`}
                  style={{ width: '100%', height: 'auto', display: 'block', opacity: fade ? 1 : 0, transition: 'opacity 0.5s' }}
                />
                <button onClick={prevImage} style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', background: 'transparent', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>&lt;</button>
                <button onClick={nextImage} style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', background: 'transparent', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>&gt;</button>
              </div>
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                {images.map((_, idx) => (
                  <span key={idx} style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: idx === currentImage ? '#0f766e' : '#cbd5e1', margin: '0 4px' }} />
                ))}
              </div>
            </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categorias-participacion">
        <div className="section-content">
          <div className="section-header">
            <h2>Categorías de Participación</h2>
            <p>Encuentra la categoría perfecta para tu proyecto y compite con los mejores emprendedores</p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`category-card${category.title === 'Energías limpias y Sustentabilidad Ambiental' ? ' energia-margin' : ''}`}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(15, 118, 110, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
                onClick={(e) => {
                  // Efecto de feedback visual
                  e.currentTarget.style.transform = 'translateY(-2px) scale(0.98)';
                  
                  // Navegación inmediata sin setTimeout
                  if (category.title === 'Proyecto Social') navigate('/catalogo/proyectoSocial');
                  else if (category.title === 'Emprendimiento Tecnológico') navigate('/catalogo/emprendimientoTecnologico');
                  else if (category.title === 'Innovación en Productos y servicios') navigate('/catalogo/innovacionProductosServicios');
                  else if (category.title === 'Energías limpias y Sustentabilidad Ambiental') navigate('/catalogo/energias');
                }}
              >
                <div className="category-content">
                  <div className={`category-icon ${category.colorClass}`}>
                    <category.icon size={32} />
                  </div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="category-link">
                    <span>Más información</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id='cta-section'>
        <div className="cta-content">
          <div className="cta-card">
            <h2>¿Listo para cambiar el mundo?</h2>
            <p>
              Únete a la comunidad de emprendedores más innovadora de Chiapas y haz realidad tu proyecto de impacto social.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => navigate('/alumno/subirProyecto')}>
                <Upload size={20} />
                Subir Documentos
              </button>
              <div style={{ position: 'relative' }}>
                <button
                  className="btn-secondary"
                  onClick={() => setDownloadsMenuOpen((open) => !open)}
                >
                  <FileText size={20} />
                  Descargables
                </button>
                {downloadsMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    zIndex: 10,
                    minWidth: 220,
                    padding: '0.5rem 0'
                  }}>
                    <a href="\src\downloads\Caracteristicas RESUMEN EJECUTIVO.pdf" download style={{ display: 'block', padding: '0.5rem 1.5rem', color: '#334155', textDecoration: 'none' }}>Características del Resumen Ejecutivo</a>
                    <a href="\src\downloads\FICHA Tecnica Emprendimiento e Innovación 2025.docx" download style={{ display: 'block', padding: '0.5rem 1.5rem', color: '#334155', textDecoration: 'none' }}>Ficha Técnica Emprendimiento e Innovación</a>
                    <a href="\src\downloads\LINEAMIENTOS PARTICIPACION Y EVALUACION.pdf" download style={{ display: 'block', padding: '0.5rem 1.5rem', color: '#334155', textDecoration: 'none' }}>Lineamientos Participación y Evaluación</a>
                    <a href="\src\downloads\MATERIAL APOYO MODELO CANVAS.pdf" download style={{ display: 'block', padding: '0.5rem 1.5rem', color: '#334155', textDecoration: 'none' }}>Material Apoyo Modelo Canvas</a>
                    <a href="\src\downloads\plantilla-canvas-descargable.pptx" download style={{ display: 'block', padding: '0.5rem 1.5rem', color: '#334155', textDecoration: 'none' }}>Plantilla Canvas Descargable</a>
                    <a href="\src\downloads\CONVOCATORIA 5 FERIA EMPRENDIMIENTO.pdf" download style={{ display: 'block', padding: '0.5rem 1.5rem', color: '#334155', textDecoration: 'none' }}>Convocatoria</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <img src={logoUpImg} alt="Logo UP Chiapas" style={{ width: '2.2rem', height: '2.2rem', objectFit: 'contain', borderRadius: '0.4rem' }} />
                </div>
                <div className="logo-text">
                  <h1>UP Chiapas</h1>
                  <p>Universidad Politécnica de Chiapas</p>
                </div>
              </div>
              <p className="footer-description">
                Formando emprendedores e innovadores que transforman su comunidad a través de proyectos de impacto social.
              </p>
            </div>
            
            <div className="footer-links">
              <h3>Enlaces Rápidos</h3>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/alumno/inscripcion'); }}>Inscribirse</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault();
                  smoothScrollTo('categorias-participacion');
                }}>Catálogo de Proyectos</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault();
                  smoothScrollTo('convocatoria-section');
                }}>Convocatoria</a></li>
                <li><a href='#' onClick={(e) => { e.preventDefault(); navigate('/lineamientos');}}>Lineamientos de participación</a></li>
              </ul>
            </div>
            
            <div className="footer-dates">
              <h3>Fechas Importantes</h3>
              <ul>
                <li>
                  <Calendar size={16} />
                  Registro: 18 Junio - 18 Julio 2025
                </li>
                <li>
                  <Calendar size={16} />
                  Feria: 21 Julio 2025
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Universidad Politécnica de Chiapas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      <Outlet />
    </div>
    </>
  );
};

export default Alumno;