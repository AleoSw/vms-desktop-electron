import React, { useEffect, useState } from "react";
import "./MainContent.css";
import CameraStream from "../Cam/CameraStream";
import { fetchWithAuth } from "../../../utils/apiUtils"

function MainContent() {
  const [cameraStreams, setCameraStreams] = useState([]);

  useEffect(() => {
    let data = [];

    // Simular que estás obteniendo información de varias cámaras
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
        )

        if (response.ok) {
          data = await response.json();    
          data.cameras.reverse();      
        }
      } catch (error) {
        console.log("Error:", error);        
      }
      
      // Crear las URLs de cada cámara
      const streams = data.cameras.map(camera => ({
        ip: camera.ip,
        videoUrl: `http://localhost:5002/video/${camera.ip}?user_cam=${camera.user_cam}&password_cam=${camera.password_cam}`
      }));
      
      setCameraStreams(streams);
    };

    fetchCameraStreams();
  }, []);

  return (
    <section className="cameras" id="cameras">
      <section className="cam-container">
        {cameraStreams.length > 0 ? (
          cameraStreams.map((camera) => (
              <CameraStream key={camera.ip} videoUrl={camera.videoUrl} />          ))
        ) : (
          <p>Loading video streams...</p>
        )}
      </section>
    </section>
  );
}

export default MainContent;
