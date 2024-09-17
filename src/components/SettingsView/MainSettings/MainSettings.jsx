// AnotherComponent.jsx
import React from 'react';

import AddCamera from '../AddCamera/AddCamera';
import "./MainSettings.css"

const componentMap = {
    'Camaras-Agregar': AddCamera,
    'Camaras-Listar camaras': "",
    'Usuarios-Agregar': "",
    'Usuarios-Listar usuarios': ""
}

function MainSettings({ selectedAction }) {
    const ComponentToRender = componentMap[selectedAction] || (() => <div>Selecciona una acción</div>)

    return (
        <section className='contentSettings'>
            <ComponentToRender />
        </section>
    );
}

export default MainSettings;
