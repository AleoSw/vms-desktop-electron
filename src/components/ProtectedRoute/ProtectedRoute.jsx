// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookieUtils';

const ProtectedRoute = ({ element, ...rest }) => {
  const token = getCookie('authToken');
  const isAuthenticated = !!token;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
