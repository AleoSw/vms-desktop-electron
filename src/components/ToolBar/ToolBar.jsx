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

  const path = window.location.pathname;

  return (
    <header className="toolbar">
      <section className="brandMenu">
        <section className="toolbarBrand">
          <img
            className="logo"
            src={logoSena}
            alt="Servicio Nacional de Aprendizaje"
          />

          {path === "/" ? (
            <h3 className="titleLogo">VMS CDTI</h3>
          ) : null}

          {path === "/settings" ? (
            <a href="/" className="btn">
              <i className="ri-arrow-left-line"></i>
            </a>
          ) : null}

        </section>

        <button className="btn" onClick={handleClick}>
          <i className="ri-menu-line"></i>
        </button>
      </section>

      <span className="rolName">Administrador</span>

      <section className="windowBtns">
        <button className="btn" onClick={handleMinimize}>
          <i className="ri-subtract-line"></i>
        </button>
        <button className="btn" onClick={handleMaximize}>
          <i className="ri-square-line"></i>
        </button>
        <button className="btn" onClick={handleClose}>
          <i className="ri-close-line"></i>
        </button>
      </section>

      {showComponent && <MiniMenu onLogout={onLogout} />}
    </header>
  );
};

export default Toolbar;
