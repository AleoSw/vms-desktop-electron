const express = require("express");
const cors = require("cors");
const DigestClient = require("digest-fetch");
const { PassThrough } = require("stream");

const app = express();
const port = 5002;

// Habilitar CORS
app.use(cors());

// Almacenar los clientes de las cámaras
const cameraClients = {};
const cameraStreams = {};

// Función para autenticar las cámaras una sola vez
async function authenticateCamera(cameraIp, user_cam, password_cam) {
  if (!cameraClients[cameraIp]) {
    const digestClient = new DigestClient(user_cam, password_cam);
    cameraClients[cameraIp] = digestClient;

    // Verificar la autenticación con un ping a la cámara
    try {
      const response = await digestClient.fetch(`http://${cameraIp}/mjpg/video.mjpg`);
      if (!response.ok) {
        delete cameraClients[cameraIp]; // Eliminar si falla la autenticación
        throw new Error(`Failed to authenticate camera ${cameraIp}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error.message);
      delete cameraClients[cameraIp]; // Eliminar si ocurre un error
      throw new Error(`Failed to authenticate camera ${cameraIp}: ${error.message}`);
    }
  }
}

// Ruta para obtener el video de una cámara
app.get("/video/:cameraIp", async (req, res) => {
  const { cameraIp } = req.params;
  const { user_cam, password_cam } = req.query;

  try {
    await authenticateCamera(cameraIp, user_cam, password_cam); // Autenticar la cámara

    // Si ya tenemos un stream para esta cámara, reutilízalo
    if (cameraStreams[cameraIp]) {
      cameraStreams[cameraIp].pipe(res);
    } else {
      const digestClient = cameraClients[cameraIp]; // Obtener el cliente autenticado
      const response = await digestClient.fetch(`http://${cameraIp}/mjpg/video.mjpg`);

      if (response.ok) {
        res.setHeader("Content-Type", "multipart/x-mixed-replace; boundary=--myboundary");
        res.setHeader("Content-Disposition", "inline");

        const passthrough = new PassThrough();
        response.body.pipe(passthrough);
        passthrough.pipe(res);
        
        // Guardar el stream en la memoria para reutilizar
        cameraStreams[cameraIp] = passthrough;

        // Limpiar el stream después de que la conexión se cierre
        res.on("close", () => {
          passthrough.unpipe(res);
          passthrough.end();
          delete cameraStreams[cameraIp];
        });
      } else {
        console.error(`Failed to fetch video from camera ${cameraIp}: ${response.statusText}`);
        res.status(response.status).send("Failed to fetch video.");
      }
    }
  } catch (error) {
    console.error(`Error fetching video from camera ${cameraIp}:`, error);
    res.status(500).send("Internal Server Error.");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
