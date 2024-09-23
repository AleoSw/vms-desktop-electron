// AnotherComponent.jsx
import React from 'react';

import AddCamera from '../AddCamera/AddCamera';
import ListCamera from '../ListCamera/ListCamera';
import AddUser from "../AddUser/AddUser"
import DefaultOption from "../DefaultOption/DefaultOption"
import "./MainSettings.css"

const componentMap = {
    'Camaras-Agregar': AddCamera,
    'Camaras-Listar camaras': ListCamera,
    'Usuarios-Agregar': AddUser,
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
