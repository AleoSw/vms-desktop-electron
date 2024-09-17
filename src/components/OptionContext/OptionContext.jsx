// OptionContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const OptionContext = createContext();

// Crear un proveedor de contexto
export function OptionProvider({ children }) {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <OptionContext.Provider value={{ selectedOption, setSelectedOption }}>
            {children}
        </OptionContext.Provider>
    );
}


// Hook personalizado para usar el contexto
export function useOption() {
    return useContext(OptionContext);
}
