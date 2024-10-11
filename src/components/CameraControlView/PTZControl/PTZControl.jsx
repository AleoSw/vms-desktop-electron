import { useState } from "react";
import "./PTZControl.css";
import axios from "axios";

function PTZControl({ ip }) {
  const [moving, setMoving] = useState(false); // Estado para controlar el movimiento

  const moveCamera = async (direction) => {
    try {
      const response = await axios.post(
        `http://localhost:5002/axis/move-camera`,
        {
          ip,
          direction,
        }
      );
    } catch (error) {
      console.error("Error al mover la cámara:", error);
    }
  };

  const stopCamera = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5002/axis/stop-camera`,
        {
          ip,
        }
      );
    } catch (error) {
      console.error("Error al detener la cámara:", error);
    }
  };

  // Maneja el clic y el estado del movimiento
  const handleClick = (direction) => {
    setMoving(true);
    moveCamera(direction);
  };

  // Maneja el evento de soltar el botón
  const handleMouseUp = () => {
    setMoving(false);
    stopCamera();
  };

  return (
    <section className="PTZ">
      <header className="ptz-header">
        <h3 className="title">Controles PTZ</h3>
      </header>
      <div className="ptz-control">
        <button
          className="direction-button"
          onMouseDown={() => handleClick("up")}
          onMouseUp={handleMouseUp}
        >
          <i className="icon ri-arrow-up-line"></i>
        </button>
        <button
          className="direction-button"
          onMouseDown={() => handleClick("down")}
          onMouseUp={handleMouseUp}
        >
          <i className="icon ri-arrow-down-line"></i>
        </button>
        <button
          className="direction-button"
          onMouseDown={() => handleClick("left")}
          onMouseUp={handleMouseUp}
        >
          <i className="icon ri-arrow-left-line"></i>
        </button>
        <button
          className="direction-button"
          onMouseDown={() => handleClick("right")}
          onMouseUp={handleMouseUp}
        >
          <i className="icon ri-arrow-right-line"></i>
        </button>
      </div>
    </section>
  );
}

export default PTZControl;
