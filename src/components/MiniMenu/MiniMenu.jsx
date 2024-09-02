import React from "react";
import "./MiniMenu.css";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookieUtils";

function MiniMenu({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        removeCookie('authToken');
        onLogout();
        navigate('/login');
    }

    const handleSettings = (e) => {
      navigate("/settings");
    }

  return (
    <section className="miniMenu">
      <article className="optionMiniMenu" onClick={handleSettings}>
        <i class="ri-settings-3-line"></i>
        <h3 className="textOption">Configuración</h3>
      </article>
      <article className="optionMiniMenu" onClick={handleLogout}>
        <i class="ri-logout-circle-line"></i>
        <h3 className="textOption">Cerrar sesión</h3>
      </article>
    </section>
  );
}

export default MiniMenu;
