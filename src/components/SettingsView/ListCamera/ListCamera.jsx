import React, { useEffect, useState } from "react";

import "./ListCamera.css";
import axiosInstance from "../../../utils/axiosConfig";
import Modal from "../../Modal/Modal"
import Delete from "./modal/Delete";
import Update from "./modal/Update";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

function ListCamera() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cameras, setCameras] = useState([]);

  const openModal = (content, selectedCamera) => {
    setSelectedCamera(selectedCamera);
    setModalContent(content);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCamera(null);
    setModalContent(null);
  };

  const loadCameras = async () => {
    try {
      const response = await axiosInstance.get("/s/camera/all");

      if (response) {
        setCameras(Array.isArray(response.data.cameras) ? response.data.cameras : []);
      }
    } catch (error) {
      console.log("Error al cargar las camaras: ", err.message);
      setCameras([]);
    }
  };

  useEffect(() => {
    loadCameras();
  }, []);

  const handleEditCam = async (name) => {
    openModal("edit", name); // Abrir el modal para editar
  };

  const handleDeleteCam = async (name) => {
    openModal("delete", name); // Abrir el modal para eliminar
  };

  return (
    <>
      <header className="headerContent">
        <i className="icon ri-video-on-line"></i>
        <h3 className="title">Cámaras en el sistema</h3>
      </header>
      <section className="scroll-settings">
        <section className="tableContent">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>IP</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Sector</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cameras) && cameras.length > 0 ? (
                cameras.map((camera) => (
                  <tr key={camera.name}>
                    <td>{camera.name}</td>
                    <td>{camera.ip}</td>
                    <td>{camera.user_cam}</td>
                    <td>{camera.password_cam}</td>
                    <td>{camera.sector_name}</td>
                    <td>
                      <div className="lastTd">
                        <button
                          className="btnTable edit"
                          onClick={() => handleEditCam(camera.name)}
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          className="btnTable delete"
                          onClick={() => handleDeleteCam(camera.name)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay cámaras disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>


      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {modalContent === "delete" ? (
          <Delete
            cameraName={selectedCamera}
            closeModal={closeModal}
            loadCameras={loadCameras}
          />
        ) : modalContent === "edit" ? (
          <Update
            cameraName={selectedCamera}
            closeModal={closeModal}
            loadCameras={loadCameras}
          />
        ) : null}
      </Modal>
      
      <ToastContainer />
    </>

  );
}

export default ListCamera;
