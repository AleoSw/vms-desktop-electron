import React, { useEffect, useState } from "react";
import { fetchWithAuth } from '../../../utils/apiUtils.js'; // Importa tu función fetchWithAuth
import { getCookie } from "../../../utils/cookieUtils.js";
import "./AddCamera.css";

function AddCamera() {
    const [formData, setFromData] = useState({
        name: '',
        ip: '',
        user_cam: '',
        password_cam: '',
        sector_name: ''
    });

    const handleChange = (e) => {
        setFromData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [sectors, setSectors] = useState([]);

    useEffect(() => {
        const loadSectors = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const response = await fetchWithAuth('http://localhost:4001/s/sector/all', requestOptions);
                if (response.ok) {
                    const data = await response.json();
                    setSectors(data.sectors);
                } else {
                    console.error('Error al cargar los sectores:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud de sectores:', error);
            }
        };

        loadSectors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),  // Convertir los datos del formulario a JSON
        };

        try {
            const response = await fetchWithAuth('http://localhost:4001/s/camera/add', requestOptions);  // Cambia la URL al endpoint adecuado

            if (response.ok) {
                const result = await response.json();
                console.log('Cámara agregada con éxito:', result);
                // Aquí puedes manejar el éxito de la solicitud, como limpiar el formulario o mostrar un mensaje
            } else {
                console.error('Error al agregar la cámara:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    return (
        <>
            <header className="headerAddCam">
                <i className="icon ri-video-on-line"></i>
                <h3 className="title">Agregar cámara de video</h3>
            </header>
            <section className="addCamera">
                <form className="formAddCamera" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nameCamera">
                            <i className="icon ri-camera-lens-line"></i>
                            <h3>Nombre</h3>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ingresa un nombre, Ej. AMBIENTE A211"
                            value={formData.nameCamera}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ipCamera">
                            <i className="icon ri-hashtag"></i>
                            <h3>Número de IP</h3>
                        </label>
                        <input
                            type="text"
                            name="ip"
                            placeholder="Ingresa una IP, Ej. 192.167.1.34"
                            value={formData.ipCamera}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userCamera">
                            <i className="icon ri-user-line"></i>
                            <h3>Usuario de la cámara</h3>
                        </label>
                        <input
                            type="text"
                            name="user_cam"
                            placeholder="Ingresa el usuario de la cámara"
                            value={formData.userCamera}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordCamera">
                            <i className="icon ri-key-2-line"></i>
                            <h3>Contraseña de la cámara</h3>
                        </label>
                        <input
                            type="password"  // Cambié a "password" para ocultar la contraseña
                            name="password_cam"
                            placeholder="Ingresa la contraseña de la cámara"
                            value={formData.passwordCamera}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordCamera">
                            <i className="icon ri-layout-masonry-line"></i>
                            <h3>Sector donde se ubica</h3>
                        </label>
                        <select name="sector_name" value={formData.sector_name} onChange={handleChange}>
                            {sectors.map((sector) => (
                                <option key={sector.name} value={sector.name}>
                                    {sector.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btnAddCam" type="submit">Agregar</button>
                </form>
            </section>
        </>
    )
}

export default AddCamera;
