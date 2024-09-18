import React from "react";
import "./Alert.css";

function Alert({ message, action, onCloseAlert, onConfirmAction }) {
  return (
    <footer className="alert">
      <header className="titleAlert">
        <h3>{message}</h3>
      </header>
      <div className="btnsAlert">
        <button className="btn cancel" onClick={onCloseAlert}>
          <h3>Cancelar</h3>
        </button>
        <button className="btn ok" onClick={onConfirmAction}>
          <h3>{action}</h3>
        </button>
      </div>
    </footer>
  );
}

export default Alert;
