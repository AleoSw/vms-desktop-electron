import React, { useState } from "react";
import "./Cam.css";

function Cam({ url }) {
  const [fullScreenCam, setFullScreenCam] = useState("");
  const [imgSrc, setImgSrc] = useState(url);

  const openCam = () => {
    setFullScreenCam((prevElem) => (prevElem === "" ? "on" : ""));
  };

  const handleError = () => {
    // Cambia la fuente de la imagen a una predeterminada si ocurre un error
    setImgSrc("/public/images/default-cam.png"); // Ruta a tu imagen predeterminada
  };

  return (
    <div className={`cam ${fullScreenCam}`} onClick={openCam}>
      {fullScreenCam === "on" && <header className="header-cam"></header>}
      <img src={imgSrc} alt="" onError={handleError} />
    </div>
  );
}

export default Cam;
