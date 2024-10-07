import { Router } from "express";
import {
  connectCamera,
  getCameraStream,
  disconnectCamera,
  getCameras,
  getStreams
} from "../controllers/axisController.js";

const router = Router();

// Ruta para conectar a la cámara
router.get("/connect-camera", connectCamera);

// Ruta para obtener el flujo de video de la cámara
router.get("/camera-stream", getCameraStream);

// Ruta para desconectar el flujo de video de la cámara
router.get("/disconnect-camera", disconnectCamera);

router.get("/cameras", getCameras);
router.get("/streams", getStreams);

export default router;
