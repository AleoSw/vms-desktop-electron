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
import Screenshot from "./components/ScreenshotsView/Screenshots/Screenshot";

import { UserProvider } from "./components/userContext/userContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wsMessage, setWsMessage] = useState('');

  // Verificar autenticación al iniciar el componente
  useEffect(() => {
    const token = getCookie("authToken"); // Obtener el token de las cookies
    if (token) {
      setIsAuthenticated(true);
    }
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
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<ProtectedRoute element={<MainCameras onLogout={handleLogout} />} />} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings onLogout={handleLogout} />} />} >
              <Route path=":module/:option" element={<MainSettings />} />
            </Route>
            <Route path="/camera/:name" element={<ProtectedRoute element={<CameraControl onLogout={handleLogout} />} />} />
            <Route path="/screenshots" element={<ProtectedRoute element={<Screenshot onLogout={handleLogout} />} />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
