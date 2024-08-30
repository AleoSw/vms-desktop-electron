import React from 'react';
import "./ToolBar.css"
import logoSena from "/public/images/logoSena.png"

const Toolbar = () => {
    const handleMinimize = () => {
        window.electronAPI.minimize(); // Llama a la función de minimizar
    };

    const handleMaximize = () => {
        window.electronAPI.maximize(); // Llama a la función de maximizar
    };

    const handleClose = () => {
        window.electronAPI.close(); // Llama a la función de cerrar
    };

    return (
        <header className='toolbar'>
            <div className='toolbarBrand'>
                <img className='logo' src={logoSena} alt="Servicio Nacional de Aprendizaje" />
                <h3 className='titleLogo'>VMS CDTI</h3>
            </div>

            <span className="roleName">Administrador</span>

            <div className='windowBtns'>
                <button className='btn' onClick={handleMinimize}>
                    <i class="ri-subtract-line"></i>
                </button>
                <button className='btn' onClick={handleMaximize}>
                    <i class="ri-square-line"></i>
                </button>
                <button className='btn' onClick={handleClose}>
                    <i class="ri-close-line"></i>
                </button>
            </div>
        </header>
    );
};

export default Toolbar;
