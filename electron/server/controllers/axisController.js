import { send } from "vite";
import { AxisCamera } from "../lib/axis.js";

const cameras = {}; // Almacenar las instancias de las cámaras

// Función para conectar la cámara
export const connectCamera = async (req, res) => {
  const { ip, user, password } = req.query; // Obtener las credenciales de la URL

  // Crear o utilizar una instancia existente de AxisCamera
  let camera = cameras[ip];

  if (!camera) {
    console.log(user, password, "<------");

    if (!user || !password) {
      return res.status(401).json({
        "message": "Se requieren credenciales para conectar la cámara."
      })
    }
    
    camera = new AxisCamera(ip, user, password);
    cameras[ip] = camera; // Almacenar la instancia
  }

  const isConnected = await camera.connect();
  if (isConnected) {
    res.status(200).json({ message: "Conexión exitosa a la cámara" });
  } else {
    res.status(500).json({ message: "Error al conectar a la cámara" });
  }
};

// Función para iniciar el stream de video
export const getCameraStream = async (req, res) => {
  const { ip, user, password } = req.query; // Obtener el IP y las credenciales de la URL
  let camera = cameras[ip]; // Obtener la instancia de la cámara

  // Si la cámara no existe, intenta conectarla
  if (!camera) {
    // Si la cámara no existe y no se proporcionan credenciales, retorna un error
    if (!user || !password) {
      return res.status(400).json({
        message: "Se requieren credenciales para conectar la cámara.",
      });
    }

    // Crear una nueva instancia de la cámara
    camera = new AxisCamera(ip, user, password);
    cameras[ip] = camera; // Almacenar la nueva instancia
  } else if (!camera.isConnected) {
    // Si la cámara existe pero no está conectada, intenta conectarla
    const isConnected = await camera.connect();
    if (!isConnected) {
      return res
        .status(500)
        .json({ message: "Error al conectar a la cámara." });
    }
  }

  // Si la cámara ya está conectada, devolver el flujo de video
  return camera.getVideoStream(req, res);
};

// Función para desconectar el stream
export const disconnectCamera = (req, res) => {
  const { ip } = req.query; // Obtener el IP de la URL
  const camera = cameras[ip]; // Obtener la instancia de la cámara

  if (!camera) {
    return res.status(404).json({ message: "Cámara no encontrada." });
  }

  const result = camera.disconnect(ip);
  delete cameras[ip];
  res.json(result);
};

export const getCameras = (req, res) => {
  return res.status(200).json({
    cameras,
  });
};

export const isDomeCamera = async (req, res) => {
  const { ip } = req.query;

  let camera = cameras[ip];

  if (!camera) {
    return res.status(404).json({ message: "Cámara no encontrada." });
  }

  res.status(200).json({
    isDome: camera.isDome,
  });
};

// En el controlador
export const recordCamera = async (req, res) => {
  const { ip } = req.query; // Obtener el IP de la URL
  const camera = cameras[ip]; // Obtener la instancia de la cámara

  if (!camera || !camera.isConnected) {
    return res.status(400).json({ message: "Cámara no conectada." });
  }

  try {
    const result = await camera.record(ip, camera.user, camera.password);
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStreams = (req, res) => {
  const activeStreams = Object.keys(cameras).map((ip) => {
    // Verifica si la cámara está conectada antes de agregarla al arreglo
    if (cameras[ip]?.isConnected) {
      return {
        ip,
        isActive: !!cameras[ip],
      };
    }
    return null; // Devuelve null si no está conectada
  }).filter(stream => stream !== null); // Filtra los nulls

  return res.status(200).json({
    streams: activeStreams,
  });
};

export const moveCamera = async (req, res) => {
  const { ip, direction } = req.body;

  let camera = cameras[ip];

  if (!camera) {
    res.status(404).json({
      message: "Camara no encontrada.",
    });
  }

  try {
    const result = await camera.moveCamera(
      ip,
      camera.user,
      camera.password,
      direction
    );
    res.json({ message: `Movimiento hacia ${direction} ejecutado`, result });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error en caso de fallo
  }
};

export const stopCamera = async (req, res) => {
  const { ip } = req.body; // Solo necesitas estos datos para parar

  let camera = cameras[ip];

  if (!camera) {
    res.status(404).json({
      message: "Camara no encontrada.",
    });
  }

  try {
    const result = await camera.moveCamera(
      ip,
      camera.user,
      camera.password,
      "stop"
    ); // Envía el comando 'stop'
    res.json({ message: `Movimiento detenido`, result });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error en caso de fallo
  }
};

export const makeScreenshot = async (req, res) => {
  const { ip } = req.query; // Obtén la IP de la cámara desde el body de la solicitud

  let camera = cameras[ip];

  if (!camera) {
    return res.status(404).json({
      message: "Cámara no encontrada.",
    });
  }

  try {
    // Captura la captura de pantalla
    const response = await camera.captureScreenshot();

    if (response.path) {
      // Si la captura fue exitosa, responde con la ruta de la imagen
      res.json({
        message: "Captura de pantalla obtenida con éxito.",
        imagePath: response.path,
      });
    } else {
      // Si hubo un error al capturar la imagen
      res.status(500).json({
        message: "Error al capturar la captura de pantalla.",
        error: response.error || "Error desconocido.",
      });
    }
  } catch (error) {
    // Maneja errores inesperados
    res.status(500).json({
      message: "Error en el servidor al capturar la imagen.",
      error: error.message,
    });
  }
};

export const getScreenshots = async (req, res) => {
  const { ip } = req.query; // Obtén la IP de la cámara desde el query de la solicitud

  let camera = cameras[ip];

  if (!camera) {
    return res.status(404).json({
      message: "Cámara no encontrada.",
    });
  }

  try {
    const screenshots = await camera.getScreenshots(); // Llama a la función para obtener los screenshots
    return res.status(200).json(screenshots); // Devuelve los screenshots en formato JSON
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los screenshots.",
      error: error.message,
    });
  }
};

export const status = async (req, res) => {
  const { ip } = req.query;

  let camera = cameras[ip];

  try {
    const response = await fetch(`http://${ip}/axis-cgi/pingtest.cgi?ip=${ip}`);

    if (response.status === 200 || response.status === 401 || response.status == 304) {

      if (camera) {
        camera.isConnected = true;
      }

      return res.json({ isConnected: true });
    } else {

      if (camera) {
        camera.isConnected = false;        
      }

      return res.json({ isConnected: false });
    }
  } catch (error) {
    if (camera) {
      camera.isConnected = false;
    }
    // Maneja los errores como una respuesta fallida
    return res.json({ isConnected: false });
  }
};
