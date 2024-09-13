// MenuSettings.jsx
import React, { useState } from "react";
import ItemSettings from "../ItemSettings/ItemSettings";
import { useOption } from "../../OptionContext/OptionContext"; // Importa el hook

function MenuSettings() {
    const { setSelectedOption } = useOption();
    const [activeOption, setActiveOption] = useState(null);

    const handleOptionClick = (option) => {
        const optionArray = option.split("-");
        setActiveOption(option);
        setSelectedOption(optionArray);
    };

    const CamarasOpciones = ["Agregar", "Listar camaras"];
    const UsuariosOpciones = ["Agregar", "Listar usuarios"];

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
