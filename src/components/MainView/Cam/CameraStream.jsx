import React, { useState, useEffect } from "react";
import "./CameraStream.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const CameraStream = ({ videoUrl, name }) => {
  const navigate = useNavigate();

  console.log(videoUrl, "<--------------------");
  

  return (
    <>
      <div className="cam">
          <img
            src={videoUrl} // Evita caché añadiendo timestamp
            alt={`Stream de la cámara ${name}`}
          />
          <span className="reload-cam">
            <i className="icon ri-restart-line"></i>
          </span>
        </div>
    </>
  );
};

export default CameraStream;
