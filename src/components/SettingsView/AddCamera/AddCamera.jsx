import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../utils/apiUtils.js"; // Importa tu función fetchWithAuth
import "./AddCamera.css";

function AddCamera() {
  const [cameraIP, setCameraIP] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraVerified, setIsCameraVerified] = useState(false); // Estado para verificar la cámara antes de permitir el envío

  const checkCameraStatus = async () => {
    setLoading(true);
    setStatus("");
    setIsCameraVerified(false); // Deshabilitar el submit hasta que la cámara se verifique

    try {
      const res = await fetch(`http://${cameraIP}/mjpg/video.mjpg`, {
        method: "GET",
        mode: "no-cors", // Configuración para evitar CORS
      });

      if (res) {
        console.log(res, "<-----");

        // Dado que la respuesta es opaca (por el modo no-cors), no podemos verificar el estado, pero asumimos que si no falla, está disponible
        setStatus("Cámara disponible");
        setIsCameraVerified(true); // Habilitar el submit si se ha verificado la cámara
      } else {
        setStatus("Camara no conectada");
      }
    } catch (error) {
      setStatus("Camara no conectada");
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    setCameraIP(e.target.value);
  };

  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    user_cam: "",
    password_cam: "",
    sector_name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [sectors, setSectors] = useState([]);
  const keysArr = Object.keys(formData);

  useEffect(() => {
    const loadSectors = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/s/sector/all`,
          requestOptions
        );
        if (response.ok) {
          const data = await response.json();
          setSectors(data.sectors);

          if (data.sectors.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              sector_name: data.sectors[0].name,
            }));
          }
        } else {
          console.error("Error al cargar los sectores:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud de sectores:", error);
      }
    };

    loadSectors();
  }, []);

  const cleanData = () => {
    setFormData({
      name: "",
      ip: "",
      user_cam: "",
      password_cam: "",
      sector_name: sectors.length > 0 ? sectors[0].name : "",
    });
    setCameraIP("");
    setStatus("");
    setLoading(false);
    setIsCameraVerified(false);

    for (let i = 0; i < keysArr.length; i++) {
      document.querySelector(`input[name="${keysArr[i]}"]`).value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCameraVerified) {
      console.log("Por favor, verifica la cámara antes de agregarla.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convertir los datos del formulario a JSON
    };

    try {
      const response = await fetchWithAuth(
        `http://${process.env.DB_IP}/s/camera/add`,
        requestOptions
      ); // Cambia la URL al endpoint adecuado

      if (response.ok) {
        const result = await response.json();
        console.log("Cámara agregada con éxito:", result);

        cleanData();
      } else {
        console.error("Error al agregar la cámara:", response);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  return (
    <>
      <header className="headerContent">
        <i className="icon ri-video-on-line"></i>
        <h3 className="title">Agregar cámara de video</h3>
      </header>
      <section className="addCamera">
        <form className="formAddCamera" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
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
            <label htmlFor="ip">
              <i className="icon ri-hashtag"></i>
              <h3>Número de IP</h3>
            </label>
            <div className="validateIp">
              <input
                type="text"
                name="ip"
                placeholder="Ingresa una IP, Ej. 192.167.1.34"
                value={formData.ipCamera}
                onChange={(e) => {
                  handleChange(e);
                  handleInputChange(e);
                }}
              />
              <button
                type="button"
                className="btnVerifyCamera"
                onClick={checkCameraStatus}
                disabled={loading || !cameraIP}
              >
                {loading ? "Verificando..." : "Verificar"}
              </button>
            </div>
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
              value={formData.userCamera}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_cam">
              <i className="icon ri-key-2-line"></i>
              <h3>Contraseña de la cámara</h3>
            </label>
            <input
              type="password" // Cambié a "password" para ocultar la contraseña
              name="password_cam"
              placeholder="Ingresa la contraseña de la cámara"
              value={formData.passwordCamera}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sector_name">
              <i className="icon ri-layout-masonry-line"></i>
              <h3>Sector donde se ubica</h3>
            </label>
            <select
              name="sector_name"
              value={formData.sector_name}
              onChange={handleChange}
            >
              {sectors.map((sector, i) => (
                <option key={sector.name} value={sector.name}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              <i className="icon ri-camera-line"></i>
              <h3>Estado de la cámara</h3>
            </label>
            <div className="statusCam">
              <h3 className="statusText">
                {status === "" ? "Sin verificar" : status}
              </h3>
              <span
                className={`status ${isCameraVerified ? "on" : "off"}`}
              ></span>
            </div>
          </div>
          <button
            className="btnAddCam"
            type="submit"
            disabled={!isCameraVerified} // Deshabilitar el botón de envío hasta que la cámara esté verificada
          >
            Agregar
          </button>
        </form>
      </section>
    </>
  );
}

export default AddCamera;
