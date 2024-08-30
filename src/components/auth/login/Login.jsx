import react from "react";

function Login() {
  return (
    <main class="main-login">
      <section class="content">
        <section class="img-login">
          <picture>
            <img
              src="{% static 'images/logoSena.png' %}"
              alt="Servicio Nacional de Aprendizaje - SENA"
            />
          </picture>
        </section>
      </section>
    </main>
  );
}
