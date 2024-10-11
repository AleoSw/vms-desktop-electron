import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./PTZControl.css";

export default function PTZControl({ ip }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("Center");
  const controllerRef = useRef(null);

  const moveCamera = async (dir) => {
    try {
      await axios.post(`http://localhost:5002/axis/move-camera`, {
        ip,
        direction: dir,
      });
    } catch (error) {
      console.error("Error al mover la cámara:", error);
    }
  };

  const stopCamera = async () => {
    try {
      await axios.post(`http://localhost:5002/axis/stop-camera`, {
        ip,
      });
    } catch (error) {
      console.error("Error al detener la cámara:", error);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging && controllerRef.current) {
      const rect = controllerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = Math.max(-100, Math.min(100, mouseX - centerX));
      const newY = Math.max(-100, Math.min(100, mouseY - centerY));

      setPosition({ x: newX, y: newY });

      const newDirection = getDirection(newX, newY);
      if (newDirection !== direction) {
        setDirection(newDirection);
        moveCamera(newDirection);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    setDirection("Center");
    stopCamera();
  };

  const getDirection = (x, y) => {
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle > -45 && angle <= 45) return "right";
    if (angle > 45 && angle <= 135) return "down";
    if (angle > 135 || angle <= -135) return "left";
    if (angle > -135 && angle <= -45) return "up";
    return "center";
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setPosition({ x: 0, y: 0 });
      setDirection("center");
      stopCamera();
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="ptz-controller">
      <div
        ref={controllerRef}
        className="controller"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="indicator"
          style={{
            left: `calc(50% + ${position.x}px)`,
            top: `calc(50% + ${position.y}px)`,
          }}
        >
          <i className="icon ri-drag-move-line"></i>
        </div>
      </div>
    </div>
  );
}
