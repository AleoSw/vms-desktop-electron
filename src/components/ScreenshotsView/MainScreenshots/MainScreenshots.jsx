import React, { useEffect, useState } from "react"; // Cambié react a React
import "./MainScreenshots.css";
import axios from "axios";

function MainScreenshots({ name, ip }) {
  const [screenshots, setScreenshots] = useState([]);

  const loadScreenshots = async () => {
    const url = `http://localhost:5002/axis/screenshots?ip=${ip}`;

    try {
      const response = await axios.get(url);
      setScreenshots(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    loadScreenshots();
  }, [ip]); // Agregado ip como dependencia para recargar si cambia

  return (
    <>
      <section className="contentScreenshots">
        <header className="headerContent">
          <i className="icon ri-video-on-line"></i>
          <h3 className="title">{name}</h3>
        </header>
        <section className="content">
          <section className="containerScreen">
            {screenshots.length > 0 ? (
              <>
                {screenshots.map((screenshot) => (
                  <article className="screenImage" key={screenshot.nombre}>
                    <img src={screenshot.imagen} />
                    <footer>
                      <i className="icon ri-file-image-line"></i>
                      <h3>{screenshot.nombre}</h3>
                    </footer>
                  </article>
                ))}
              </>
            ) : (
              <h3>La cámara {name} aun no tiene capturas guardadas.</h3>
            )}
          </section>
        </section>
      </section>
    </>
  );
}

export default MainScreenshots;
