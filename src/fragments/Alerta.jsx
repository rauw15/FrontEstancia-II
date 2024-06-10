import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './alerta.css';

const Alerta = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="alerta-overlay">
      <div className="alerta-box">
        <div>{message}</div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>,
    document.body
  );
};

export const useAlerta = () => {
  const [alerta, setAlerta] = useState({ message: '', isVisible: false });

  const showAlert = (message) => {
    setAlerta({ message, isVisible: true });
  };

  const hideAlert = () => {
    setAlerta({ message: '', isVisible: false });
  };

  const AlertaComponent = alerta.isVisible ? (
    <Alerta message={alerta.message} onClose={hideAlert} />
  ) : null;

  return [AlertaComponent, showAlert];
};

export default Alerta;