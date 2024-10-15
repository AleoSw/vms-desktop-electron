// src/components/auth/Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../utils/cookieUtils"; // Importar la función para establecer cookies
import "./FormLogin.css"
import axiosInstance from "../../../utils/axiosConfig";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);

      if (response.status == 200) {
        setCookie("authToken", response.data.token, 1); // Establecer el token en una cookie con 1 día de expiración
        onLogin(); // Actualizar el estado de autenticación
        navigate("/"); // Redirigir al usuario a la ruta ponSubmitrotegida
      } else {
        // Manejar errores de inicio de sesión
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("document", { required: "Este campo es requerido" })}
        />
        {errors.document && <span className="error">{errors.document.message}</span>}
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
          {...register("password", { required: "Este campo es requerido" })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <button className="btnSubmit" type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
