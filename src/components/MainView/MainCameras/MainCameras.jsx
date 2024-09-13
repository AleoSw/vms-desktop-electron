import React from "react";
import MainContent from "../MainContent/MainContent";
import Sidebar from "../SidebarCameras/Sidebar";
import Toolbar from "../../ToolBar/ToolBar";

function Main({ onLogout }) {

  return (
    <>
      <Toolbar onLogout={onLogout} />
      <main className="main-cameras">
        <Sidebar />
        <MainContent />
      </main>
    </>
  );
}

export default Main;
