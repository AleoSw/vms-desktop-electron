// AnotherComponent.jsx
import React from 'react';

import AddCamera from '../AddCamera/AddCamera';
import ListCamera from '../ListCamera/ListCamera';
import DefaultOption from "../DefaultOption/DefaultOption"
import "./MainSettings.css"

const componentMap = {
    'Camaras-Agregar': AddCamera,
    'Camaras-Listar camaras': ListCamera,
    'Usuarios-Agregar': "",
    'Usuarios-Listar usuarios': ""
}

function MainSettings({ selectedAction }) {
    const ComponentToRender = componentMap[selectedAction] || (() => <DefaultOption />)

    return (
        <section className='contentSettings'>
            <ComponentToRender />
        </section>
    );
}

export default MainSettings;
