// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login/Login";
import MainCameras from "./components/MainView/MainCameras/MainCameras";
import { getCookie } from "./utils/cookieUtils";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Settings from "./components/SettingsView/Settings/Settings";
import MainSettings from "./components/SettingsView/MainSettings/MainSettings";
import CameraControl from "./components/CameraControlView/CameraControl/CameraControl";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wsMessage, setWsMessage] = useState('');

  // Verificar autenticación al iniciar el componente
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5002');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWsMessage(data.message); // Actualiza el estado con el mensaje recibido
    };

    const token = getCookie("authToken"); // Obtener el token de las cookies
    if (token) {
      setIsAuthenticated(true);
    }

    // Limpiar la conexión WebSocket al desmontar el componente
    return () => {
      ws.close();
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Eliminar el token
  };

  return (
    <Router>
      <div>
        {/* Mostrar el mensaje del WebSocket */}
        {wsMessage && <div>WebSocket Message: {wsMessage}</div>}
        
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<ProtectedRoute element={<MainCameras onLogout={handleLogout} />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings onLogout={handleLogout} />} />} >
            <Route path=":module/:option" element={<MainSettings />}/>
          </Route>
          <Route path="/camera/:name" element={<ProtectedRoute element={<CameraControl onLogout={handleLogout} />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
