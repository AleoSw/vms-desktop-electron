import React, { useEffect, useState } from "react";
import "./MainContent.css";
import CameraStream from "../Cam/CameraStream";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../../../utils/axiosConfig";


function MainContent() {
  const [cameraStreams, setCameraStreams] = useState([]);
  const [triggerEffect, setTriggerEffect] = useState(false);
  
  const fetchCameraStreams = async () => {

    try {
      const response = await axiosInstance.get("/s/camera/all")

      setCameraStreams(response.data.cameras);
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };


  useEffect(() => {
    fetchCameraStreams();
    setTriggerEffect(false); // Reiniciar el trigger después de la solicitud
  }, [triggerEffect]); // El efecto se ejecutará cuando se active `triggerEffect`

  const handleTrigger = () => {
    setTriggerEffect((prev) => !prev); // Invierte el estado de `triggerEffect` para disparar `useEffect`
  };

  return (
    <>
      <section className="cameras" id="cameras">
        <section className="cam-container">
          {cameraStreams.length > 0 ? (
            cameraStreams.map((camera) => (
              <CameraStream
                key={camera.ip}
                ip={camera.ip}
                name={camera.name}
                user={camera.user_cam}
                password={camera.password_cam}
              />
            ))
          ) : (
            <section className="no-cams">
              <p>No hay cámaras de video disponibles</p>
              <button className="btnEffect" onClick={handleTrigger}>
                Recargar
              </button>
            </section>
          )}
        </section>
      </section>
      <ToastContainer />
    </>
  );
}

export default MainContent;
