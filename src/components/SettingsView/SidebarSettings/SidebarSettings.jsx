import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarSettings.css";

function SidebarSettings({ modules, onActionSelect }) {
  const [toolbarOn, setToolbarOn] = useState("");
  const [arrowRotate, setArrowRotate] = useState("");

  const toggleClass = () => {
    setToolbarOn((prevClass) => (prevClass === "" ? "activeSettings" : ""));
    setArrowRotate((prevClass) =>
      prevClass === "" ? "rotateArrowSettings" : ""
    );
  };

  const handleActionClick = (moduleValue, optionValue) => {
    onActionSelect(moduleValue, optionValue); // Notificamos al componente padre de la opción seleccionada
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
        <section className="menu">
          {modules.map((module) => (
            <article key={module.value} className="module">
              <header className="headerModule">
                <h3 className="title">{module.name}</h3>
              </header>
              <ul className="actions">
                {module.options.map((option) => (
                  <li key={option.value} className="item">
                    <Link
                      to={`/settings/${module.value}/${option.value}`}
                      className="actionLink"
                      onClick={() => handleActionClick(module.value, option.value)}
                    >
                      {option.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </section>

      <button className="arrowToggleSettings" onClick={toggleClass}>
        <i className={`icon ri-arrow-right-wide-line ${arrowRotate}`}></i>
      </button>
    </aside>
  );
}

export default SidebarSettings;
