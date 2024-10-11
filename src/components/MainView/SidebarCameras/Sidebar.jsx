import React, { useEffect, useState } from "react";
import "./SidebarCameras.css";
import Dropdown from "../Dropdown/Dropdown";
import { fetchWithAuth } from "../../../utils/apiUtils";

function Sidebar() {
  const [toolbarOn, setToolbarOn] = useState("");
  const [arrowRotate, setArrowRotate] = useState("");
  const [groupedData, setGroupedData] = useState([]); // Datos agrupados por sector

  const toogleClass = () => {
    setToolbarOn((prevClass) => (prevClass === "" ? "active" : ""));
    setArrowRotate((prevClass) => (prevClass === "" ? "rotateArrow" : ""));
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loadCamBySector = async () => {
      try {
        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/s/sector/cameras`,
          requestOptions
        );

        if (response.ok) {
          const responseData = await response.json();

          // Agrupar por sector
          const grouped = responseData.sectorsCameras.reduce((acc, curr) => {
            const { sector_name, camera_name, camera_ip, user_cam, password_cam } = curr;
            if (!acc[sector_name]) {
              acc[sector_name] = [];
            }
            if (camera_name) {
              acc[sector_name].push({camera_name, camera_ip, user_cam, password_cam}); // Añadir cámaras no nulas
            }
            return acc;
          }, {});          

          // Convertir a un array de objetos para pasarlo a Dropdown
          const formattedData = Object.keys(grouped).map((sector) => ({
            sector,
            cameras: grouped[sector],
          }));

          setGroupedData(formattedData); // Guardar los datos agrupados por sector
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
          {groupedData.map((sectorData, index) => (
            <Dropdown
              key={index}
              name={sectorData.sector} // Nombre del sector
              options={sectorData.cameras} // Cámaras del sector
              onSelect={(camera) => console.log("Cámara seleccionada:", camera)}
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
