import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Importa useForm de react-hook-form
import { fetchWithAuth } from "../../../utils/apiUtils.js"; // Importa tu función fetchWithAuth
import "./AddCamera.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCamera() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraVerified, setIsCameraVerified] = useState(false); // Estado para verificar la cámara antes de permitir el envío

  const cameraIP = watch("ip"); // Observa el valor del campo IP

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
        // Dado que la respuesta es opaca (por el modo no-cors), no podemos verificar el estado, pero asumimos que si no falla, está disponible
        setStatus("Cámara disponible");
        setIsCameraVerified(true); // Habilitar el submit si se ha verificado la cámara
      } else {
        setStatus("Cámara no conectada");
      }
    } catch (error) {
      setStatus("Cámara no conectada");
    }

    setLoading(false);
  };

  const [sectors, setSectors] = useState([]);

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
        } else {
          console.error("Error al cargar los sectores:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud de sectores:", error);
      }
    };

    loadSectors();
  }, []);

  const onSubmit = async (data) => {
    if (!isCameraVerified) {
      console.log("Por favor, verifica la cámara antes de agregarla.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convertir los datos del formulario a JSON
    };

    try {
      const response = await fetchWithAuth(
        `http://${process.env.DB_IP}/s/camera/add`,
        requestOptions
      ); // Cambia la URL al endpoint adecuado

      if (response.ok) {
        const result = await response.json();

        toast.success(`Cámara: ${result.cameraName} agreagada exitosamente`, {position: 'bottom-right'});

        reset(); // Reinicia el formulario después de agregar la cámara
      } else {
        toast.error("Error al agregar la cámara", {position: 'bottom-right'})
      }
    } catch (error) {
      toast.error("Error al agregar la cámara", {position: 'bottom-right'})
    }
  };

  return (
    <>
      <header className="headerContent">
        <i className="icon ri-video-on-line"></i>
        <h3 className="title">Agregar cámara de video</h3>
      </header>
      <section className="addCamera">
        <form className="formAddCamera" onSubmit={handleSubmit(onSubmit)}>
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
              })} // Registra el campo en react-hook-form
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
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
                {...register("ip", { required: "La ip debe ser validada" })} // Registra el campo en react-hook-form
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
              })} // Registra el campo en react-hook-form
            />
            {errors.user_cam && (
              <p className="error">{errors.user_cam.message}</p>
            )}
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
              {...register("password_cam", {
                required: "La cotraseña de la cámara es requerida",
              })} // Registra el campo en react-hook-form
            />
            {errors.password_cam && (
              <p className="error">{errors.password_cam.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="sector_name">
              <i className="icon ri-layout-masonry-line"></i>
              <h3>Sector donde se ubica</h3>
            </label>
            <select
              name="sector_name"
              {...register("sector_name")} // Registra el campo en react-hook-form
            >
              {sectors.map((sector) => (
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
      <ToastContainer />
    </>
  );
}

export default AddCamera;
