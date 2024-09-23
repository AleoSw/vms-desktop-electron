const express = require("express");
const cors = require("cors");
const DigestClient = require("digest-fetch");
const { PassThrough } = require("stream");

const app = express();
const port = 5002;

// Habilitar CORS
app.use(cors());

// Ruta para obtener el video de una cámara
app.get("/video/:cameraIp", async (req, res) => {
  const { cameraIp } = req.params;
  const { user_cam, password_cam } = req.query;

  const digestClient = new DigestClient(user_cam, password_cam);
    
  try {
    const response = await digestClient.fetch(`http://${cameraIp}/mjpg/video.mjpg`);

    if (response.ok) {
      res.setHeader(
        "Content-Type",
        "multipart/x-mixed-replace; boundary=--myboundary"
      );
      res.setHeader("Content-Disposition", "inline");

      const passthrough = new PassThrough();
      response.body.pipe(passthrough);
      passthrough.pipe(res);
    } else {
      console.error(
        `Failed to fetch video from camera ${cameraIp}: ${response.statusText}`
      );
      res.status(response.status).send("Failed to fetch video.");
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
