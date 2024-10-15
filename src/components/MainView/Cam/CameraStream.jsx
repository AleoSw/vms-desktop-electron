import React, { useState, useEffect } from "react";
import "./CameraStream.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";

const CameraStream = ({ ip, name, user, password }) => {
  const path = window.document.location.pathname;
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState("");
  const [reloading, setReloading] = useState(false);
  const [status, setStatus] = useState(null); // Estado para el resultado (true/false)

  const handlePlayer = () => {
    navigate(`/camera/${name}?ip=${ip}`);
  };

  const checkStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/axis/status?ip=${ip}&_${Date.now()}`
      );
      const data = response.data.isConnected;

      setStatus(data ? true : false);
      setReloading(false);
    } catch (error) {
      setReloading(false);
      setStatus(false);
    }
  };

  const handleReload = async () => {
    toast.info(`Verificando el estado de la cámara ${name}`, {
      position: "bottom-right",
    });
    // Verificar el estado de la cámara antes de intentar recargarla
    const isConnected = await checkStatus();

    // Si la cámara no está conectada, detener el proceso
    if (isConnected) {
      setReloading(false);
      return;
    }

    setReloading(true);
    toast.info(`Intentando recargar la cámara ${name}`, {
      position: "bottom-right",
    });
    const url = `http://localhost:5002/axis/connect-camera?ip=${ip}&user=${user}&password=${password}`;

    try {
      const response = await axios.get(url);

      if (response.status == 401) {
        setReloading(false);
        setStatus(false);
        toast.warning("Credenciales de la cámara incorrectos.", {
          position: "bottom-right",
        });
      }

      if (response.status == 200) {
        setStatus(true);
        setReloading(false);
        toast.success("La cámara fue conectada con éxito.", {
          position: "bottom-right",
        });
      }

      setReloading(false);
    } catch (error) {
      console.log("Error:", error);
      setStatus(true);
      setReloading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    setVideoUrl(
      `http://localhost:5002/axis/camera-stream?ip=${ip}&user=${user}&password=${password}`
    );
  }, []);

  return (
    <>
      {status ? (
        <div className="cam">
          <img src={videoUrl} alt={`Stream de la cámara ${name}`} />
          <section className="action-cameras">
            <span className="reload-cam" onClick={handleReload}>
              <i className="icon ri-restart-line"></i>
            </span>
            {!path.includes("/camera") ? (
              <span className="player-cam" onClick={handlePlayer}>
                <i className="icon ri-fullscreen-line"></i>
              </span>
            ) : null}
          </section>
        </div>
      ) : (
        <div className="cam">
          <article className="error-cam">
            <p>La cámara no se encuentra disponible</p>
            <p>o</p>
            <p>no está conectada. {status ? "error" : "no error"}</p>
            <div className="cam-error-name">
              <i className="icon ri-video-off-line"></i>
              <p>{name}</p>
            </div>
            <button
              className="btnReloadCam"
              onClick={handleReload}
              disabled={reloading}
            >
              {reloading ? (
                <>
                  <i className="icon ri-loop-left-line reload-animate"></i>
                  <h3>Reconectando...</h3>
                </>
              ) : (
                <>
                  <i className="icon ri-loop-left-line"></i>
                  <h3>Recargar</h3>
                </>
              )}
            </button>
          </article>
        </div>
      )}
    </>
  );
};

export default CameraStream;
