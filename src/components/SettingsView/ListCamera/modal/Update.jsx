import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Importa useForm de react-hook-form
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../utils/axiosConfig";

function Update({ cameraName, closeModal, loadCameras }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [sectors, setSectors] = useState([]);
    const [camera, setCamera] = useState({});

    const loadSectors = async () => {
        try {
            const response = await axiosInstance.get("/s/sector/all");
            setSectors(response.data.sectors);
        } catch (error) {
            console.error("Error en la solicitud de sectores:", error);
        }
    };

    const getCameraData = async () => {
        try {
            const response = await axiosInstance.get(`/s/cameraName/${cameraName}`);
            if (response) {
                setCamera(response.data.camera[0]);
                reset(response.data.camera[0]); // Resetea el formulario con los datos de la cámara
            }
        } catch (error) {<ToastContainer />
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        loadSectors();
        getCameraData();
    }, []);

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.put(`/s/camera/update/${cameraName}`, data);
            if (response) {  
                toast.success(`Cámara ${response.data.cameraName} actualizada exitosamente.`, { position: 'bottom-right' });
            }
        } catch (error) {
            toast.error("Error al actualizar la cámara" + error, { position: 'bottom-right' });
        } finally {
            closeModal();  // Cierra la modal después de eliminar
            await loadCameras();  // Recargar la lista de cámaras después de eliminar
        }
    };

    return (
        <>
            <div className="content-modal">
                <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="name">
                            <i className="icon ri-camera-lens-line"></i>
                            <h3>Nombre</h3>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ingresa un nombre, Ej. AMBIENTE A211"
                            {...register("name", {
                                required: "El nombre de la cámara es requerido",
                            })}
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ip">
                            <i className="icon ri-hashtag"></i>
                            <h3>Número de IP</h3>
                        </label>
                        <input
                            type="text"
                            name="ip"
                            placeholder="Ingresa una IP, Ej. 192.167.1.34"
                            {...register("ip", { required: "La IP es requerida" })}
                        />
                        {errors.ip && <p className="error">{errors.ip.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_cam">
                            <i className="icon ri-user-line"></i>
                            <h3>Usuario de la cámara</h3>
                        </label>
                        <input
                            type="text"
                            name="user_cam"
                            placeholder="Ingresa el usuario de la cámara"
                            {...register("user_cam", {
                                required: "El usuario de la cámara es requerido",
                            })}
                        />
                        {errors.user_cam && <p className="error">{errors.user_cam.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_cam">
                            <i className="icon ri-key-2-line"></i>
                            <h3>Contraseña de la cámara</h3>
                        </label>
                        <input
                            type="password"
                            name="password_cam"
                            placeholder="Ingresa la contraseña de la cámara"
                            {...register("password_cam", {
                                required: "La contraseña de la cámara es requerida",
                            })}
                        />
                        {errors.password_cam && <p className="error">{errors.password_cam.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sector_name">
                            <i className="icon ri-layout-masonry-line"></i>
                            <h3>Sector donde se ubica</h3>
                        </label>
                        <select
                            name="sector_name"
                            {...register("sector_name")}
                            defaultValue={camera.sector_name || ""} // Setea el sector por defecto desde los datos de la cámara
                        >
                            {sectors.map((sector) => (
                                <option key={sector.name} value={sector.name}>
                                    {sector.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="btns">
                        <button className="modal-btn ok" type="submit">
                            <h3>Actualizar</h3>
                        </button>
                        <button className="modal-btn not" type="button" onClick={closeModal}>
                            <h3>Cancelar</h3>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Update;
