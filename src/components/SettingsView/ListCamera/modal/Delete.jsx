import React from "react";
import axiosInstance from "../../../../utils/axiosConfig";
import { toast } from "react-toastify";  // Asegúrate de importar toast si no está incluido
import "./Modal.css";

function Delete({ cameraName, closeModal, loadCameras }) {
    const deleteCamera = async () => {
        try {
            const response = await axiosInstance.delete(`/s/camera/remove/${cameraName}`);  // Se usa cameraName aquí

            if (response) {
                toast.success("Cámara eliminada con éxito.", { position: "bottom-right" });
            }
        } catch (error) {
            toast.error("Error al eliminar la cámara", { position: "bottom-right" });
        } finally {
            closeModal();  // Cierra la modal después de eliminar
            await loadCameras();  // Recargar la lista de cámaras después de eliminar
        }
    };

    return (
        <>
            <div className="content-modal">
                <h3>¿Estás seguro de eliminar la cámara: {cameraName}?</h3>
                <div className="btns">
                    <button className="modal-btn not" onClick={deleteCamera}>
                        <h3>Eliminar</h3>
                    </button>
                    <button
                        className="modal-btn ok"
                        onClick={closeModal}  // Cierra la modal al hacer clic en cancelar
                    >
                        <h3>Cancelar</h3>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Delete;
