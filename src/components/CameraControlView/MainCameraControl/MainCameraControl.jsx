import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CameraStream from "../../MainView/Cam/CameraStream";
import { fetchWithAuth } from "../../../utils/apiUtils";
import PTZControl from "../PTZControl/PTZControl";
import "./MainCameraControl.css";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainCameraControl() {
  const navigate = useNavigate();
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

      if (response) {
        toast.success('Captura de video guardada exitosamente', {position: "bottom-right"})
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    setVideoUrl(`http://localhost:5002/axis/camera-stream?ip=${cameraIp}`);
    isDomeData();
  }, []);

  const handleAllScreenshots = () => {
    navigate(`/screenshots?name=${name}&ip=${cameraIp}`)
  }

  return (
    <section className="contentCameraControl">
      <header className="headerContent">
        <i className="icon ri-video-on-line"></i>
        <h3 className="title">{name}</h3>
      </header>
      <section className="player">
        <section className="cameraPTZ">
          <CameraStream ip={cameraIp} name={name} videoUrl={videoUrl} />
          {isDome ? <PTZControl ip={cameraIp} /> : null}
        </section>

        <footer className="footer-control">
          <section className="screenshot">
            <button className="" onClick={handleScreenshot}>
            <i className="icon ri-file-image-line"></i>
            </button>
            <h3>Capturar imagen</h3>
          </section>
          <button className="btnPlayer" onClick={handleAllScreenshots}>
          <i className="icon ri-folder-image-line"></i>
            <h3>Ver todas las capturas</h3>
          </button>
        </footer>
      </section>

      <ToastContainer />
    </section>
  );
}

export default MainCameraControl;
