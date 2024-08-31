import React, { useState, useRef, useEffect } from 'react';
import "./Dropdown.css";

const Dropdown = ({ name, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.className != "sectores") {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionSelect = (option) => {
        onSelect(option);
        //setIsOpen(false);
    };

    return (
        <article className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-toggle">
                <h3 className="titleDp">{name}</h3>
                <i className="icon ri-arrow-right-s-line"></i>
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
};

export default Dropdown;
