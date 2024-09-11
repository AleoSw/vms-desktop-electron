import React, { useEffect, useState } from "react";
import "./MainContent.css";
import CameraStream from "../Cam/CameraStream";

function MainContent() {
  const [cameraStreams, setCameraStreams] = useState([]);

  useEffect(() => {
    // Simular que estás obteniendo información de varias cámaras
    const fetchCameraStreams = async () => {
      const cameras = [
        { id: 'camera1'},
        { id: 'camera2'},
        // Puedes agregar más cámaras aquí
      ];
      
      // Crear las URLs de cada cámara
      const streams = cameras.map(camera => ({
        id: camera.id,
        videoUrl: `http://localhost:5002/video/${camera.id}`
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
              <CameraStream key={camera.id} videoUrl={camera.videoUrl} />          ))
        ) : (
          <p>Loading video streams...</p>
        )}
      </section>
    </section>
  );
}

export default MainContent;
