// Modal.js
import React from 'react';
import './Modal-global.css'; // Aquí puedes agregar estilos para tu modal

function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null; // No renderiza la modal si no está abierta

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <button className="modal-close" onClick={closeModal}>
            <i className="icon ri-close-line"></i>
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
