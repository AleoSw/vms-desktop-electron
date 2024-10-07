import React from "react";
import { useParams } from "react-router-dom";
import AddCamera from "../AddCamera/AddCamera";
import ListCamera from "../ListCamera/ListCamera";
import AddUser from "../AddUser/AddUser";
import ListUser from "../ListUser/ListUser";
import DefaultOption from "../DefaultOption/DefaultOption";
import "./MainSettings.css";

// Mapa de secciones a componentes
const componentMap = {
  addCamera: AddCamera,
  listCamera: ListCamera,
  addUser: AddUser,
  listUser: ListUser, // Puedes reemplazarlo con el componente correspondiente
};

function MainSettings() {
  const { module, option } = useParams(); // Obtener módulo y opción de la URL  

  // Obtener el componente correspondiente al option
  const ActiveComponent = componentMap[option] || DefaultOption;

  return (
    <section className="contentSettings">
      <ActiveComponent />
    </section>
  );
}

export default MainSettings;
