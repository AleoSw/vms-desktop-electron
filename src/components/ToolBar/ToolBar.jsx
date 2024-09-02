import React, { useState } from "react";
import "./ToolBar.css";
import logoSena from "/public/images/logoSena.png";
import MiniMenu from "../MiniMenu/MiniMenu";

const Toolbar = ({ onLogout }) => {
  const handleMinimize = () => {
    window.electronAPI.minimize(); // Llama a la función de minimizar
  };

  const handleMaximize = () => {
    window.electronAPI.maximize(); // Llama a la función de maximizar
  };

  const handleClose = () => {
    window.electronAPI.close(); // Llama a la función de cerrar
  };

  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <header className="toolbar">
      <section className="brandMenu">
        <section className="toolbarBrand">
          <img
            className="logo"
            src={logoSena}
            alt="Servicio Nacional de Aprendizaje"
          />
          <h3 className="titleLogo">VMS CDTI</h3>
        </section>

        <button className="btn" onClick={handleClick}>
          <i class="ri-menu-line"></i>
        </button>
      </section>

      <span className="rolName">Administrador</span>

      <section className="windowBtns">
        <button className="btn" onClick={handleMinimize}>
          <i class="ri-subtract-line"></i>
        </button>
        <button className="btn" onClick={handleMaximize}>
          <i class="ri-square-line"></i>
        </button>
        <button className="btn" onClick={handleClose}>
          <i class="ri-close-line"></i>
        </button>
      </section>

      {showComponent && <MiniMenu onLogout={onLogout} />}
    </header>
  );
};

export default Toolbar;
