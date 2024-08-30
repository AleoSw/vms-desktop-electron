import React from "react";
import { useState } from "react";
import "./Sidebar.css";

{
  /*function MyComponent() {
  // Inicializa un estado para la clase con un valor inicial vacío o una clase por defecto
  const [activeClass, setActiveClass] = useState('');

  // Función para cambiar la clase
  const toggleClass = () => {
    // Cambia entre una clase activa y una clase vacía
    setActiveClass(prevClass => (prevClass === '' ? 'active' : ''));
  };

  return (
    <div>
      <button onClick={toggleClass}>Toggle Class</button>
      <div className={`my-component ${activeClass}`}>
        This is a component with a dynamic class!
      </div>
    </div>
  );
}
*/
}

function Sidebar() {
  const [toolbarOn, setToolbarOn] = useState("");

  const [arrowRotate, setArrowRotate] = useState("");

  const toogleClass = () => {
    setToolbarOn((prevClass) => (prevClass === "" ? "active" : ""));
    
    setArrowRotate((prevClass) => (prevClass === "" ? "rotateArrow" : ""));
  };

  return (
      <aside class={`sidebar ${toolbarOn}`}>
        <header class="headerSidebar">
          <div class="title">
            <i className="icon ri-layout-masonry-line"></i>
            <h3>SECTORES</h3>
          </div>
          <span class="hr"></span>
        </header>

        <section class="sectores">
          <ul class="menu" id="menuSidebar">
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE A</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE C</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE A</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE C</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE A</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE C</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE A</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE C</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE A</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE C</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE A</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE C</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE A</h3>
              </header>
            </li>
            <li class="item">
              <header class="item-header">
                <h3>BLOQUE C</h3>
              </header>
            </li>
          </ul>
        </section>

        <button class="arrowToggle" onClick={toogleClass}>
          <i className={`icon ri-arrow-right-wide-line ${arrowRotate}`}></i>
        </button>
      </aside>
  );
}

export default Sidebar;
