import React, { useState } from "react";
import "./SidebarSettings.css";

function SidebarSettings({ modules, onActionSelect, selectedAction }) {
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
        <section className="menu">
          {modules.map((module) => (
            <article key={module.name} className="module">
              <header className="headerModule">
                <h3 className="title">{module.name}</h3>
              </header>
              <ul className="actions">
                {module.actions.map((action) => {
                  const actionId = `${module.name}-${action}`;

                  return (
                    <li key={actionId} className={actionId === selectedAction ? 'item on' : 'item'} onClick={() => onActionSelect(actionId)}>
                      {action}
                    </li>
                  );
                })}
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
