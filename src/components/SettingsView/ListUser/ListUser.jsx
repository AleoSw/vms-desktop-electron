import React from "react";

function ListUser() {
  return (
    <>
      <header className="headeContent">
        <i className="icon ri-user-line"></i>
        <h3>Usuarios en el sistema</h3>
      </header>
      <section className="list">
        <section className="tableContent">
            <table className="table">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Contraseña</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </section>
      </section>
    </>
  );
}

export default ListUser;
