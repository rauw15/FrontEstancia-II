import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Alerta = ({ message, type = 'info', onClose }) => {
  const getIcon = () => {
    switch(type) {
      case 'success':
        return <CheckCircle size={24} className="alerta-icon success" />;
      case 'error':
        return <AlertCircle size={24} className="alerta-icon error" />;
      case 'warning':
        return <AlertTriangle size={24} className="alerta-icon warning" />;
      default:
        return <Info size={24} className="alerta-icon info" />;
    }
  };

  const styles = `
    .alerta-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(2px);
      animation: fadeIn 0.3s ease;
    }
    
    .alerta-box {
      background: var(--color-white);
      border-radius: 0.75rem;
      padding: 1.5rem;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      position: relative;
      border-left: 4px solid;
      animation: slideUp 0.3s ease;
    }
    
    .alerta-box.success {
      border-color: var(--color-success);
    }
    
    .alerta-box.error {
      border-color: var(--color-error);
    }
    
    .alerta-box.warning {
      border-color: var(--color-warning);
    }
    
    .alerta-box.info {
      border-color: var(--color-info);
    }
    
    .alerta-content {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .alerta-icon {
      flex-shrink: 0;
    }
    
    .alerta-icon.success {
      color: var(--color-success);
    }
    
    .alerta-icon.error {
      color: var(--color-error);
    }
    
    .alerta-icon.warning {
      color: var(--color-warning);
    }
    
    .alerta-icon.info {
      color: var(--color-info);
    }
    
    .alerta-message {
      flex: 1;
      color: var(--color-gray-800);
      line-height: 1.5;
    }
    
    .alerta-close {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: none;
      border: none;
      color: var(--color-gray-400);
      cursor: pointer;
      transition: color 0.2s ease;
    }
    
    .alerta-close:hover {
      color: var(--color-gray-600);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    /* Colores para los tipos de alerta */
    :root {
      --color-success: #10b981;
      --color-error: #ef4444;
      --color-warning: #f59e0b;
      --color-info: #3b82f6;
      --color-white: #ffffff;
      --color-gray-400: #94a3b8;
      --color-gray-600: #475569;
      --color-gray-800: #1e293b;
    }
  `;

  return ReactDOM.createPortal(
    <>
      <style>{styles}</style>
      <div className="alerta-overlay">
        <div className={`alerta-box ${type}`}>
          <button className="alerta-close" onClick={onClose}>
            <X size={20} />
          </button>
          <div className="alerta-content">
            {getIcon()}
            <div className="alerta-message">{message}</div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export const useAlerta = () => {
  const [alerta, setAlerta] = useState({ 
    message: '', 
    isVisible: false, 
    type: 'info' 
  });

  const showAlert = (message, type = 'info') => {
    setAlerta({ message, isVisible: true, type });
  };

  const hideAlert = () => {
    setAlerta(prev => ({ ...prev, isVisible: false }));
  };

  const AlertaComponent = alerta.isVisible ? (
    <Alerta message={alerta.message} type={alerta.type} onClose={hideAlert} />
  ) : null;

  return [AlertaComponent, showAlert];
};

export default Alerta;