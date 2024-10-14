import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosConfig";

function ListUser() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/auth/user/all')

      setUsers(response.data.users);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <header className="headerContent">
        <i className="icon ri-user-line"></i>
        <h3>Usuarios en el sistema</h3>
      </header>
      <section className="scroll-settings">
        <section className="tableContent">
          <table className="table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Contraseña</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.document}</td>
                    <td>********</td>
                    <td>{user.role_name}</td>
                    <td>
                      <div className="lastTd">
                        <button
                          className="btnTable edit"
                          onClick={() => handleEditCam(camera.name)}
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          className="btnTable delete"
                          onClick={() => handleDeleteCam(camera.name)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No hay usuairos registrados en el sistema.</td>

                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
}

export default ListUser;
