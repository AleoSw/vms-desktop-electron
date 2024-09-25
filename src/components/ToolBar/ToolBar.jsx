import React, { useEffect, useState } from "react";
import "./ToolBar.css";
import logoSena from "/public/images/logoSena.png";
import MiniMenu from "../MiniMenu/MiniMenu";
import { fetchWithAuth } from "../../utils/apiUtils"


const Toolbar = ({ onLogout }) => {
  const [userData, setUserData] = useState({});
  const path = window.location.pathname;

  /*useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const loadUserData = async () => {
      try {
        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/auth/user`,
          requestOptions
        )
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.log("Error:", response.status);
          
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }

    if (path != "/login") {
      loadUserData();
    }
  }, [])*/


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

          {path != "/settings" ? (
            <h3 className="titleLogo">VMS CDTI</h3>
          ) : null}

          {path != "/settings" ? (
            null
          ) : <a href="/" className="btn">
            <i className="ri-arrow-left-line"></i>
          </a>}

        </section>

        {path != "/login" ? (
          <button className="btn" onClick={handleClick}>
            <i className="ri-menu-line"></i>
          </button>
        ) : null}
      </section>


      {path === "/login" ? null : (<span className="rolName">{userData.rol_name}</span>)}

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
