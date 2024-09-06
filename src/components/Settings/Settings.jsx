import React from "react";
import Toolbar from "../ToolBar/ToolBar";
import SidebarSettings from "../SidebarSettings/SidebarSettings";
import "./Settings.css";

function Settings({ onLogout }) {
  return (
    <>
      <Toolbar onLogout={onLogout} />
      <main className="mainSettings">
        <SidebarSettings />
      </main>
    </>
  );
}

export default Settings;
