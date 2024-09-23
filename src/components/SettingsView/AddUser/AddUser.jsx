import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../../utils/apiUtils";
import "./AddUser.css";

function AddUser() {
  const [formData, setFormData] = useState({
    document: "",
    password: "",
    sector_name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

          if (data.roles.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              sector_name: data.roles[0].name,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadRoles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log();
    
  }

  return (
    <>
      <header className="headerContent">
        <i className="icon ri-user-line"></i>
        <h3 className="title">Agregar usuario</h3>
      </header>
      <section className="addUser">
        <form className="formAddUser" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="document">
              <i className="icon ri-user-line"></i>
              <h3>Documento</h3>
            </label>
            <input
              type="text"
              name="document"
              placeholder="Ingresa un documento, Ej. 1238761231"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="icon ri-key-2-line"></i>
              <h3>Contraseña</h3>
            </label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="sector_name">
              <i className="icon ri-shield-user-line"></i>
              <h3>Rol</h3>
            </label>
            <select name="sector_name" onChange={handleChange}>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btnAddUser">Agregar</button>
        </form>
      </section>
    </>
  );
}

export default AddUser;
