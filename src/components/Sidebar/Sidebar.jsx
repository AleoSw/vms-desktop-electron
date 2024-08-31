import React, { useState } from "react";
import "./Sidebar.css";
import Dropdown from "../Dropdown/Dropdown";

function Sidebar() {
  const [toolbarOn, setToolbarOn] = useState("");
  const [arrowRotate, setArrowRotate] = useState("");

  const toogleClass = () => {
    setToolbarOn((prevClass) => (prevClass === "" ? "active" : ""));
    setArrowRotate((prevClass) => (prevClass === "" ? "rotateArrow" : ""));
  };

  // Lista de opciones para el Dropdown
  const sectores = ["Ambiente 1", "Ambiente 2", "Ambiente 3"];

  // Manejar la selección de una opción del Dropdown
  const handleSelect = (option) => {
    console.log(`Has seleccionado: ${option}`);
    // Aquí puedes manejar lo que sucede cuando se selecciona una opción
  };

  return (
    <aside className={`sidebar ${toolbarOn}`}>
      <header className="headerSidebar">
        <div className="title">
          <i className="icon ri-layout-masonry-line"></i>
          <h3>SECTORES</h3>
        </div>
        <span className="hr"></span>
      </header>

      <section className="sectores">
        <section className="menu" id="menuSidebar">
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
          <Dropdown name={"BLOQUE A"} options={sectores} onSelect={handleSelect} />
        </section>
      </section>

      <button className="arrowToggle" onClick={toogleClass}>
        <i className={`icon ri-arrow-right-wide-line ${arrowRotate}`}></i>
      </button>
    </aside>
  );
}

export default Sidebar;
