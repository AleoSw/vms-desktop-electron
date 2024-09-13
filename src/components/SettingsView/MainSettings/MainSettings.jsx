// AnotherComponent.jsx
import React from 'react';
import { useOption } from '../../OptionContext/OptionContext'; // Importa el hook del contexto

function MainSettings() {
    const { selectedOption } = useOption(); // Usa el hook para acceder a la opción seleccionada
     const modulo = selectedOption[0];
     const opcion = selectedOption[1];
    
    return (
        <div>
            <h2>Opción Seleccionada:</h2>
            <p>{modulo}</p>
            <p>{opcion}</p>
        </div>
    );
}

export default MainSettings;
