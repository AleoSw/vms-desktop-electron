import { AxisCamera } from "../lib/axis.js";

const cameras = {}; // Almacenar las instancias de las cámaras

// Función para conectar la cámara
export const connectCamera = async (req, res) => {
  const { ip, user, password } = req.query; // Obtener las credenciales de la URL

  // Crear o utilizar una instancia existente de AxisCamera
  let camera = cameras[ip];

  if (!camera) {
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
export const getCameraStream = (req, res) => {
  const { ip } = req.query; // Obtener el IP de la URL
  const camera = cameras[ip]; // Obtener la instancia de la cámara

  if (!camera || !camera.isConnected) {
    return res.status(400).json({ message: "Cámara no conectada." });
  }

  camera.getVideoStream(req, res);
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

export const getStreams = (req, res) => {
  return res.status(200).json({
    streams: AxisCamera.streams(),
  });
};
