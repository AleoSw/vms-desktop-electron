import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CameraStream from "../../MainView/Cam/CameraStream";
import { fetchWithAuth } from "../../../utils/apiUtils";
import "./MainCameraControl.css";

function MainCameraControl() {
  const { name } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const cameraIp = queryParams.get("ip"); // Obtener el valor de camera_ip
  const userCam = queryParams.get("user_cam"); // Obtener el valor de user_cam
  const passwordCam = queryParams.get("password_cam"); // Obtener el valor de password_cam

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setVideoUrl(
      `http://localhost:5002/axis/camera-stream?ip=${cameraIp}`,
      /*`http://localhost:5002/video/${cameraIp}?user_cam=${userCam}&password_cam=${passwordCam}`*/
    );
  }, []);

  return (
    <section className="contentCameraControl">
      <header className="headerContent">
        <i className="icon ri-video-on-line"></i>
        <h3 className="title">{name}</h3>
      </header>
      <section className="player">
        <CameraStream ip={cameraIp} name={name} videoUrl={videoUrl} />
      </section>
    </section>
  );
}

export default MainCameraControl;
