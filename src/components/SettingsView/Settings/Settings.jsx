import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "../../ToolBar/ToolBar";
import SidebarSettings from "../SidebarSettings/SidebarSettings";
import MainSettings from "../MainSettings/MainSettings";
import "./Settings.css";

function Settings({ onLogout }) {
  const navigate = useNavigate();

  const modules = [
    {
      name: "Cámaras",
      value: "cameras",
      options: [
        { name: "Añadir una cámara", value: "addCamera" },
        { name: "Listar cámaras", value: "listCamera" },
      ],
    },
    {
      name: "Usuarios",
      value: "users",
      options: [
        { name: "Añadir un usuario", value: "addUser" },
        { name: "Listar usuarios", value: "listUser" },
      ],
    },
  ];

  const handleActionSelect = (moduleValue, optionValue) => {
    console.log("Navego a:", `/settings/${moduleValue}/${optionValue}`);
    
    navigate(`/settings/${moduleValue}/${optionValue}`); // Navegar a la nueva ruta
  };

  return (
    <>
      <Toolbar onLogout={onLogout} />
      <main className="mainSettings">
        <SidebarSettings modules={modules} onActionSelect={handleActionSelect} />
        <MainSettings />
      </main>
    </>
  );
}

export default Settings;
