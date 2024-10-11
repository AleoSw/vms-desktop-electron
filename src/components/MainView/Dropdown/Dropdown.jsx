import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

const Dropdown = ({ name, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    onSelect(option);
  };

  return (
    <article className={`dropdown ${isOpen ? "open" : ""}`} ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        <h3 className="titleDp">{name}</h3>
        <i className="icon ri-arrow-right-s-line"></i>
      </button>
      {isOpen && (
        <section className="dropdown-menu">
          {options.length > 0 ? (
            <>
              {options.map((camera, index) => (
                <a
                  key={index}
                  href={`/camera/${camera.camera_name}?ip=${camera.camera_ip}`}
                >
                  {camera.camera_name}
                </a>
              ))}
            </>
          ) : (
            <div className="sectorAddCam">
              <a href="/settings/cameras/addCamera">Añadir una cámara</a>
            </div>
          )}
        </section>
      )}
    </article>
  );
};

export default Dropdown;
