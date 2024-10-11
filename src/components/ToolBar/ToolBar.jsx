import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; // Importamos useLocation y Link
import "./ToolBar.css";
import logoSena from "/public/images/logoSena.png";
import MiniMenu from "../MiniMenu/MiniMenu";
import { fetchWithAuth } from "../../utils/apiUtils";

const Toolbar = ({ onLogout, lastLocation = "/" }) => {
  console.log("Last Location: ", lastLocation);

  const [userData, setUserData] = useState({});
  const location = useLocation(); // Hook para obtener la ruta actual
  const currentPath = location.pathname; // Obtener el path actual

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

          {/* Condicionales basadas en la ruta actual usando currentPath */}
          {!currentPath.includes("/settings") && (
            <h3 className="titleLogo">VMS CDTI</h3>
          )}

          {(currentPath.includes("/settings") ||
            currentPath.includes("/camera")) && (
            <Link to="/" className="btn">
              <i className="ri-arrow-left-line"></i>
            </Link>
          )}

          {lastLocation.includes("/camera/") ? (
            <Link to={lastLocation} className="btn">
              <i className="ri-arrow-left-line"></i>
            </Link>
          ) : null}
        </section>

        {currentPath !== "/login" && (
          <button className="btn" onClick={handleClick}>
            <i className="ri-menu-line"></i>
          </button>
        )}
      </section>

      {/* Mostrar el rol del usuario solo si no estamos en "/login" */}
      {currentPath !== "/login" && (
        <span className="rolName">{userData.rol_name}</span>
      )}

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
