// src/components/auth/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookieUtils"; // Importar la función para establecer cookies

const Login = ({ onLogin }) => {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${process.env.DB_IP}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ document, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCookie("authToken", data.token, 1); // Establecer el token en una cookie con 1 día de expiración
        onLogin(); // Actualizar el estado de autenticación
        navigate("/"); // Redirigir al usuario a la ruta protegida
      } else {
        // Manejar errores de inicio de sesión
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <i className="icon ri-video-on-line"></i>
        <h1>Inicia Sesión</h1>
      </header>
      <div className="form-group">
        <label htmlFor="document">
          <i className="icon ri-profile-line"></i>
          <h3>Documento</h3>
        </label>
        <input
          type="text"
          id="document"
          placeholder="Ingresa un documento, Ej. 1234567890"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">
          <i className="icon ri-key-2-line"></i>
          <h3>Contraseña</h3>
        </label>
        <input
          type="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
