import React, { useState, useEffect } from "react";
import "./CameraStream.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const CameraStream = ({ videoUrl, name, ip }) => {
  const path = window.document.location.pathname;
  const navigate = useNavigate();

  const handlePlayer = () => {
    navigate(`/camera/${name}?ip=${ip}`);
  };

  return (
    <>
      <div className="cam">
        <img
          src={videoUrl} // Evita caché añadiendo timestamp
          alt={`Stream de la cámara ${name}`}
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
    </>
  );
};

export default CameraStream;
