import React from "react";
import Toolbar from "../ToolBar/ToolBar";
import SidebarSettings from "../SidebarSettings/SidebarSettings";

function Settings({ onLogout }) {
  return (
    <>
      <Toolbar onLogout={onLogout} />
      <main className="main-settings">
        <SidebarSettings />
      </main>
    </>
  );
}

export default Settings;
