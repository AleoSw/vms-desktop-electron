// src/utils/apiUtils.js
export const fetchWithAuth = async (url, options) => {
    const token = getCookie('authToken'); // Obtén el token desde la cookie o almacenamiento
  
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 401) {
        // Si el token ha expirado, redirige al usuario al login
        window.location.href = '/login'; // Redirige al inicio de sesión
      }
  
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  