// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import MainCameras from "./components/MainView/MainCameras/MainCameras";
import { getCookie } from "./utils/cookieUtils";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Settings from "./components/SettingsView/Settings/Settings";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<ProtectedRoute element={<MainCameras onLogout={handleLogout} />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings onLogout={handleLogout} />} />} />
      </Routes>
    </Router>
  );
};

export default App;
