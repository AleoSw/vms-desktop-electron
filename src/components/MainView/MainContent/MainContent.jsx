import React, { useEffect, useState } from "react";
import "./MainContent.css";
import CameraStream from "../Cam/CameraStream";
import { fetchWithAuth } from "../../../utils/apiUtils";

function MainContent() {
  const [cameraStreams, setCameraStreams] = useState([]);
  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    const fetchCameraStreams = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/s/camera/all`,
          requestOptions
        );

        if (response.ok) {
          const responseData = await response.json();

          // Crear las URLs de cada cámara solo cuando la solicitud es exitosa
          const streams = responseData.cameras.map((camera) => ({
            ip: camera.ip,
            name: camera.name,
            videoUrl: `http://localhost:5002/video/${camera.ip}?user_cam=${camera.user_cam}&password_cam=${camera.password_cam}`,
          }));

          setCameraStreams(streams);
        } else {
          console.log("Error en la respuesta:", response.status);
        }
      } catch (error) {
        console.log("Error en la solicitud:", error);
      }
    };

    fetchCameraStreams();
    setTriggerEffect(false); // Reiniciar el trigger después de la solicitud

  }, [triggerEffect]); // El efecto se ejecutará cuando se active `triggerEffect`

  const handleTrigger = () => {
    setTriggerEffect((prev) => !prev); // Invierte el estado de `triggerEffect` para disparar `useEffect`
  };

  return (
    <section className="cameras" id="cameras">
      <section className="cam-container">
        {cameraStreams.length > 0 ? (
          cameraStreams.map((camera) => (
            <CameraStream key={camera.ip} name={camera.name} videoUrl={camera.videoUrl} />
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
  );
}

export default MainContent;
