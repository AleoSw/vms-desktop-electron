// ItemSettings.jsx
import React from "react";
import "./ItemSettings.css"

function ItemSettings({ id, title, options, activeOption, onOptionClick }) {
    return (
        <article className="itemSettings">
            <header className="labelSettings">
                <h3 className="title">{title}</h3>
            </header>
            <ul className="menuItem">
                {options.map(option => {
                    const uniqueOption = `${id}-${option}`;
                    return (
                        <li
                            key={uniqueOption}
                            className={`option ${activeOption === uniqueOption ? 'activeOption' : ''}`}
                            onClick={() => onOptionClick(uniqueOption)}
                        >
                            {option}
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default ItemSettings;

