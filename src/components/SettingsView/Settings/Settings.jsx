import React, { useState } from "react";
import Toolbar from "../../ToolBar/ToolBar";
import SidebarSettings from "../SidebarSettings/SidebarSettings";
import MainSettings from "../MainSettings/MainSettings"
import "./Settings.css";

const modules = [
  {
    name: 'Camaras',
    actions: ['Agregar', 'Listar camaras']
  },
  {
    name: 'Usuarios',
    actions: ['Agregar', 'Listar usuarios']
  },
];

function Settings({ onLogout }) {
  const [selectedAction, setSelectedAction] = useState(null);

  const handleActionSelect = (action) => {
    setSelectedAction(action);
  };

  return (
    <>
      <Toolbar onLogout={onLogout} />
      <main className="mainSettings">
        <SidebarSettings modules={modules} onActionSelect={handleActionSelect} selectedAction={selectedAction} />
        <MainSettings selectedAction={selectedAction} />
      </main>
    </>
  );
}

export default Settings;
