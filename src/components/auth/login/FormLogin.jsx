import React from "react";

function FormLogin() {
  return (
    <form action="/accounts/login/?next=/cameras/" method="POST">
      <header>
        <img
          class="icon"
          src="{% static 'images/icons/video-on-line.svg' %}"
          alt="Camera VMS - CDTI"
        />
        <h1>Inicia Sesión</h1>
      </header>
      <div class="form-group">
        <label for="documento">
          <img
            class="icon"
            src="{% static 'images/icons/profile-line.svg' %}"
            alt="Camera VMS - CDTI"
          />
          <h3>Documento</h3>
        </label>

        <input
          type="text"
          placeholder="Ingresa un documento, Ej. 1234567890"
          name="username"
        />
      </div>
      <div class="form-group">
        <label for="documento">
          <img
            class="icon"
            src="{% static 'images/icons/key-2-line.svg' %}"
            alt="Camera VMS - CDTI"
          />
          <h3>Contraseña</h3>
        </label>

        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          name="password"
        />
      </div>

      <button type="submit">Ingresar</button>
    </form>
  );
}

export default FormLogin;
