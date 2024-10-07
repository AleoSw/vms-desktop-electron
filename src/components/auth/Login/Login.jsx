import react from "react";
import LogoSena from "/public/images/logoSena.png";
import FormLogin from "../FormLogin/FormLogin";
import Toolbar from "../../ToolBar/ToolBar";
import "./Login.css"

function Login({ onLogin }) {
  return (
    <>
      <Toolbar />
      <main className="main-login">
        <section className="content">
          <section className="img-login">
            <picture>
              <img
                src={LogoSena}
                alt="Servicio Nacional de Aprendizaje - SENA"
              />
            </picture>
          </section>

          <FormLogin onLogin={onLogin} />
        </section>
      </main>
    </>
  );
}

export default Login;
