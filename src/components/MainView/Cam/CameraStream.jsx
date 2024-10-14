import React, { useState, useEffect } from "react";
import "./CameraStream.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";

const CameraStream = ({ ip, name, user, password }) => {
  const path = window.document.location.pathname;
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [reloading, setReloading] = useState(false);

  const handlePlayer = () => {
    navigate(`/camera/${name}?ip=${ip}`);
  };

  const handleError = () => {
    setError(true)
  }

  const handleReload = async () => {
    setReloading(true);
    toast.info(`Intentanfo recargar la cámara ${name}`, { position: "bottom-right" })
    const url = `http://localhost:5002/axis/connect-camera?ip=${ip}&user=${user}&password=${password}`

    try {
      const response = await axios.get(url)

      if (response.status == 401) {
        setError(true);
        setReloading(false);
      }

      if (response.status == 200) {
        setError(false)
      }

      setReloading(false)
    } catch (error) {
      console.log("Error:", error);
      setReloading(false)
    }

  }

  useEffect(() => {
    setVideoUrl(`http://localhost:5002/axis/camera-stream?ip=${ip}&user=${user}&password=${password}`)
  }, [])

  return (
    <>
      {error ? (
        <div className="cam">
          <article className="error-cam">
            <p>La camará no se encuentra disponible</p>
            <p>o</p>
            <p>no está conectada.</p>
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
      ) : (
        <div className="cam">
          <img
            src={videoUrl}
            alt={`Stream de la cámara ${name}`}
            onError={handleError}
          />
          <section className="action-cameras">
            <span className="reload-cam">
              <i className="icon ri-restart-line"></i>
            </span>
            {!path.includes("/camera") ? (
              <span className="player-cam" onClick={handlePlayer}>
                <i className="icon ri-fullscreen-line"></i>
              </span>
            ) : null}
          </section>
        </div>
      )}
    </>
  );
};

export default CameraStream;
