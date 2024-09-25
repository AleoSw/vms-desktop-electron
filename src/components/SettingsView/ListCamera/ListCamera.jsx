import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../utils/apiUtils";
import Alert from "../Alert/Alert";
import "./ListCamera.css";

function ListCamera() {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cameras, setCameras] = useState([]);

  const loadCameras = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetchWithAuth(
        `http://${process.env.DB_IP}/s/camera/all`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        setCameras(Array.isArray(result.cameras) ? result.cameras : []);
      }
    } catch (error) {
      console.log("Error al cargar las camaras: ", err.message);
      setCameras([]);
    }
  };

  useEffect(() => {
    loadCameras();
  }, []);

  const handleDeleteCam = (name) => {
    setSelectedCamera(name);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setSelectedCamera(null);
  };

  const confirmAction = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetchWithAuth(
        `http://${process.env.DB_IP}/s/camera/remove/${selectedCamera}`,
        requestOptions
      );

      if (response.ok) {
        console.log("Cámara eliminada con exito.", response.statusText);
      }
    } catch (error) {
      console.log("Error al eliminar la cámara", error.message);
    } finally {
      closeAlert();
      await loadCameras();
    }
  };

  const handleEditCam = async (name) => {
    console.log(name);
  };

  return (
    <>
      <header className="headerContent">
        <i className="icon ri-video-on-line"></i>
        <h3 className="title">Cámaras en el sistema</h3>
      </header>
      <section className="listCameras">
        <section className="tableContent">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>IP</th>
                <th>Usuario</th>
                <th>Contraseña</th>
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
      {showAlert && (
        <Alert
          message={`¿Deseas eliminar la camara: ${selectedCamera} permanentemente?`}
          action={"Eliminar"}
          onCloseAlert={closeAlert}
          onConfirmAction={confirmAction}
        />
      )}
    </>
  );
}

export default ListCamera;
