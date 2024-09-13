import React from "react";
import Toolbar from "../../ToolBar/ToolBar";
import SidebarSettings from "../SidebarSettings/SidebarSettings";
import MainSettings from "../MainSettings/MainSettings"
import { OptionProvider } from "../../OptionContext/OptionContext";
import "./Settings.css";

function Settings({ onLogout }) {
  return (
    <OptionProvider>
      <Toolbar onLogout={onLogout} />
      <main className="mainSettings">
        <SidebarSettings />
        <MainSettings />
      </main>
    </OptionProvider>
  );
}

export default Settings;
