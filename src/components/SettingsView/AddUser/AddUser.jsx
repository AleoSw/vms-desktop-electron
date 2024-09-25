import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../utils/apiUtils";
import "./AddUser.css";
import { useForm } from "react-hook-form";

function AddUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    };

    const addUser = async () => {
      try {
        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/auth/register`,
          requestOptions
        );

        if (response.ok) {
          reset();
        } else {
          console.error('Error en la solicitud:', response.status);
        }
      } catch (error) {
        console.log("Error:", error);

      }
    }

    addUser();
  };

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loadRoles = async () => {
      try {
        const response = await fetchWithAuth(
          `http://${process.env.DB_IP}/s/role/all`,
          requestOptions
        );

        if (response.ok) {
          const data = await response.json();
          setRoles(data.roles);
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
      <section className="addUser">
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
    </>
  );
}

export default AddUser;
