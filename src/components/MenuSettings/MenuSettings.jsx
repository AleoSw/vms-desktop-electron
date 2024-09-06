// MenuSettings.jsx
import React, { useState } from "react";
import ItemSettings from "../ItemSettings/ItemSettings";


function MenuSettings() {
    const [activeOption, setActiveOption] = useState(null);

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    const CamarasOpciones = ["Agregar", "Modificar", "Ver todas las camaras"];
    const UsuariosOpciones = ["Agregar", "Modificar", "Ver todos los usuarios"];

    return (
        <section className="menu">
            <ItemSettings
                id="camaras"
                title="Gestión Camaras"
                options={CamarasOpciones}
                activeOption={activeOption}
                onOptionClick={handleOptionClick}
            />
            <ItemSettings
                id="usuarios"
                title="Gestión Usuarios"
                options={UsuariosOpciones}
                activeOption={activeOption}
                onOptionClick={handleOptionClick}
            />
        </section>
    );
}

export default MenuSettings;
