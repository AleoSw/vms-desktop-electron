import React, { useEffect, useState } from "react";
import "./SidebarCameras.css";
import Dropdown from "../Dropdown/Dropdown";
import { fetchWithAuth } from "../../../utils/apiUtils";

function Sidebar() {
  const [toolbarOn, setToolbarOn] = useState("");
  const [arrowRotate, setArrowRotate] = useState("");

  const toogleClass = () => {
    setToolbarOn((prevClass) => (prevClass === "" ? "active" : ""));
    setArrowRotate((prevClass) => (prevClass === "" ? "rotateArrow" : ""));
  };

  // Manejar la selección de una opción del Dropdown
  const handleSelect = (option) => {
    console.log(`Has seleccionado: ${option}`);
    // Aquí puedes manejar lo que sucede cuando se selecciona una opción
  };

  const [sectors, setSectors] = useState([]);
  const [sectorsCameras, setSectorsCameras] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loadSectors = async () => {
      try {
        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/s/sector/all`,
          requestOptions
        );

        if (response.ok) {
          const data = await response.json();
          setSectors(data.sectors);
        } else {
          console.error("Error al cargar los sectores:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud de sectores:", error);
      }
    };

    loadSectors();

    const loadCamBySector = async () => {
      try {
        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/s/sector/cameras`, requestOptions
        )

        if (response.ok) {
          const data = await response.json();
          setSectorsCameras(data.sectorsCameras)
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    loadCamBySector();
  }, []);

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
          {sectors.map((sector) => (
            <Dropdown
              key={sector.id}
              name={sector.name}
              onSelect={handleSelect}
            />
          ))}
        </section>
      </section>

      <button className="arrowToggle" onClick={toogleClass}>
        <i className={`icon ri-arrow-right-wide-line ${arrowRotate}`}></i>
      </button>
    </aside>
  );
}

export default Sidebar;
