import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function BtnSalir() {
  const navigate = useNavigate();
  
  const handleCargar = () => {
    localStorage.setItem('token', ' ');
    sessionStorage.clear();
    navigate('/login');
  };

  const styles = `
    .btn-salir {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--color-gray-100);
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-gray-700);
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
    
    .btn-salir:hover {
      background: var(--color-gray-200);
      color: var(--color-gray-800);
      transform: translateY(-1px);
    }
    
    .btn-salir:active {
      transform: translateY(0);
    }
    
    .btn-salir .icon {
      width: 1rem;
      height: 1rem;
      color: var(--color-gray-500);
      transition: color 0.2s ease;
    }
    
    .btn-salir:hover .icon {
      color: var(--color-gray-700);
    }
    
    /* Versión alternativa con color de advertencia */
    .btn-salir.danger {
      background: rgba(239, 68, 68, 0.1);
      color: rgba(239, 68, 68, 1);
    }
    
    .btn-salir.danger:hover {
      background: rgba(239, 68, 68, 0.2);
      color: rgba(220, 38, 38, 1);
    }
    
    .btn-salir.danger .icon {
      color: rgba(239, 68, 68, 1);
    }
    
    .btn-salir.danger:hover .icon {
      color: rgba(220, 38, 38, 1);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <button className="btn-salir danger" onClick={handleCargar}>
        <LogOut className="icon" size={16} />
        <span>Salir</span>
      </button>
    </>
  );
}

export default BtnSalir;