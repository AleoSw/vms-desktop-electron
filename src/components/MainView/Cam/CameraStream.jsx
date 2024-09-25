import React, { useState } from 'react';
import "./CameraStream.css";

const CameraStream = ({ videoUrl, name }) => {
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0); // Para forzar el re-render

  const handleError = () => {
    setError(true);
  };

  const handleReload = () => {
    setError(false); // Resetear el estado de error
    setKey(prevKey => prevKey + 1); // Cambiar la clave para forzar el re-render del componente
  };

  return (
    <div className='cam'>
      {error ? (
        <article className='error-cam'>
          <p>No se pudo conectar con la cámara</p>
          <p>{name}</p>
          <button className='btnReloadCam' onClick={handleReload}>Recargar</button>
        </article>
      ) : (
        <>
          <img key={key} src={videoUrl} onError={handleError} alt="Stream de la cámara" />
          <div className="reload-cam" onClick={handleReload}>
            <i className="icon ri-restart-line"></i>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraStream;
