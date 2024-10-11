import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CameraStream from "../../MainView/Cam/CameraStream";
import { fetchWithAuth } from "../../../utils/apiUtils";
import PTZControl from "../PTZControl/PTZControl";
import "./MainCameraControl.css";
import axios from "axios";

function MainCameraControl() {
  const { name } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const cameraIp = queryParams.get("ip"); // Obtener el valor de camera_ip

  const [videoUrl, setVideoUrl] = useState("");

  const [isDome, setIsDome] = useState(false);

  const isDomeData = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetchWithAuth(
        `http://localhost:5002/axis/dome-camera?ip=${cameraIp}`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        setIsDome(data.isDome); // Asegúrate de que data.isDome exista
      } else {
        console.error("Error en la respuesta del servidor:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleScreenshot = async () => {
    const url = `http://localhost:5002/axis/camera-screenshot?ip=${cameraIp}`;

    try {
      const response = await axios.get(url);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    setVideoUrl(`http://localhost:5002/axis/camera-stream?ip=${cameraIp}`);
    isDomeData();
  }, []);

  return (
    <section className="contentCameraControl">
      <header className="headerContent">
        <i className="icon ri-video-on-line"></i>
        <h3 className="title">{name}</h3>
      </header>
      <section className="player">
        <CameraStream ip={cameraIp} name={name} videoUrl={videoUrl} />

        <footer className="footer-control">
          {isDome ? <PTZControl ip={cameraIp} /> : null}
          <section className="screenshot">
            <button className="" onClick={handleScreenshot}>
              <h3>Capturar imagen</h3>
            </button>
          </section>
        </footer>
      </section>
    </section>
  );
}

export default MainCameraControl;
