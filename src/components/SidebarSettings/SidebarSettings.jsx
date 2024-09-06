import React, { useState } from "react";
import "./SidebarSettings.css";
import MenuSettings from "../MenuSettings/MenuSettings";

function SidebarSettings() {
  const [toolbarOn, setToolbarOn] = useState("");
  const [arrowRotate, setArrowRotate] = useState("");

  const toggleClass = () => {
    setToolbarOn(prevClass => (prevClass === "" ? "activeSettings" : ""));
    setArrowRotate(prevClass => (prevClass === "" ? "rotateArrowSettings" : ""));
  };

  return (
    <aside className={`sidebarSettings ${toolbarOn}`}>
      <header className="headerSidebarSettings">
        <div className="title">
          <i className="icon ri-settings-3-line"></i>
          <h3 className="titleSidebarSettings">Configuración</h3>
        </div>
        <span className="hr"></span>
      </header>

      <section className="menuSettings">
        <MenuSettings />
      </section>

      <button className="arrowToggleSettings" onClick={toggleClass}>
        <i className={`icon ri-arrow-right-wide-line ${arrowRotate}`}></i>
      </button>
    </aside>
  );
}

export default SidebarSettings;
