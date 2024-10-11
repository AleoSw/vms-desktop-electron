import react from "react";
import Toolbar from "../../ToolBar/ToolBar";
import "./Screenshot.css";
import MainScreenshots from "../MainScreenshots/MainScreenshots";

function Screenshot({ onLogout }) {
  const queryParams = new URLSearchParams(location.search);
  const cameraIp = queryParams.get("ip"); // Obtener el valor de camera_ip
  const name = queryParams.get("name"); // Obtener el valor de camera_ip

  return (
    <>
      <Toolbar
        onLogout={onLogout}
        lastLocation={`/camera/${name}?ip=${cameraIp}`}
      />
      <MainScreenshots name={name} ip={cameraIp}/>
    </>
  );
}

export default Screenshot;
