import React, { useEffect, useState } from "react";
import "./AddUser.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from '../../../utils/axiosConfig.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

function AddUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const addUser = async () => {
      try {
        const response = await axiosInstance.post("/auth/register", data);

        if (response) {
          toast.success("Usuario registrado con exito.", {position: "bottom-right"})
          reset();
        }
      } catch (error) {
        toast.error("No se posible registrar el usuario.", {position: "bottom-right"})
        console.log("Error:", error);
      }
    }

    addUser();
  };

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await axiosInstance.get("/s/role/all");

        if (response) {
          setRoles(response.data.roles);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadRoles();
  }, []);

  return (
    <>
      <header className="headerContent">
        <i className="icon ri-user-line"></i>
        <h3 className="title">Agregar usuario</h3>
      </header>
      <section className="scroll-settings">
        <form className="formAddUser" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="document">
              <i className="icon ri-user-line"></i>
              <h3>Documento</h3>
            </label>
            <input
              {...register("document", { required: "El documento es obligatorio", maxLength: { value: 10, message: "El numero de documento no puede exceder los 10 caracteres" } })}
              type="text"
              placeholder="Ingresa un documento, Ej. 1238761231"
            />
            {errors.document && <p className="error">{errors.document.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="icon ri-key-2-line"></i>
              <h3>Contraseña</h3>
            </label>
            <input
              {...register("password", { required: "La contraseña es obligatoria" })}
              type="password"
              placeholder="Ingresa una contraseña"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="rol_name">
              <i className="icon ri-shield-user-line"></i>
              <h3>Rol</h3>
            </label>
            <select {...register("rol_name", { required: "El rol es obligatorio" })}>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.rol_name && <p className="error">{errors.rol_name.message}</p>}
          </div>

          <button className="btnAddUser">Agregar</button>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default AddUser;
