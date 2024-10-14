// UserContext.js
import React, { createContext, useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookieUtils';
import axiosInstance from '../../utils/axiosConfig';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = getCookie('authToken');
        
        if (token) {
          const response = await axiosInstance.get("/auth/user")
          
          setUserRole(response.data.user.role_name); // Ajusta según la estructura de tu respuesta
        } else {
          setUserRole(null);
        }
      } catch (err) {
        console.error('Error al obtener el rol del usuario:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
