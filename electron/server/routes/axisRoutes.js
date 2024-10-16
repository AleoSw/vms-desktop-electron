import { Router } from "express";
import {
  connectCamera,
  getCameraStream,
  disconnectCamera,
  getCameras,
  getStreams,
  recordCamera,
  isDomeCamera,
  moveCamera,
  stopCamera,
  getScreenshots,
  makeScreenshot,
  status
} from "../controllers/axisController.js";

const router = Router();

// Ruta para conectar a la cámara
router.get("/connect-camera", connectCamera);

// Ruta para obtener el flujo de video de la cámara
router.get("/camera-stream", getCameraStream);

// Ruta para desconectar el flujo de video de la cámara
router.get("/disconnect-camera", disconnectCamera);

router.get("/record-camera", recordCamera);

router.get("/dome-camera", isDomeCamera);

router.post("/move-camera", moveCamera);

router.post("/stop-camera", stopCamera);

router.get("/camera-screenshot", makeScreenshot)

router.get("/screenshots", getScreenshots)

router.get("/cameras", getCameras);

router.get("/streams", getStreams);

router.get("/status", status);

export default router;
