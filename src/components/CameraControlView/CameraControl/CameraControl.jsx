import React from "react";
import Toolbar from "../../ToolBar/ToolBar";
import "./CameraControl.css"
import Sidebar from "../../MainView/SidebarCameras/Sidebar";
import MainCameraControl from "../MainCameraControl/MainCameraControl";

function CameraControl({ onLogout }) {
  return (
    <>
      <Toolbar onLogout={onLogout} />
      <section className="mainCameraControl">
        <Sidebar />
        <MainCameraControl />
      </section>
    </>
  );
}

export default CameraControl;
