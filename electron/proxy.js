const express = require('express');
const cors = require('cors');
const DigestClient = require('digest-fetch');
const { Readable } = require('stream');

const app = express();
const port = 5002;

// Configuración de cámaras (puedes agregar más cámaras)
const cameras = {
    camera1: {
        url: 'http://192.168.1.15/mjpg/video.mjpg',
        username: 'root',
        password: 'POND4J3'
    },
    camera2: {
        url: 'http://192.168.1.73/mjpg/video.mjpg',
        username: 'root',
        password: 'POND4J3'
    }
};

// Habilitar CORS
app.use(cors());

// Ruta para obtener el video de una cámara
app.use('/video/:cameraId', async (req, res) => {
    const { cameraId } = req.params;
    
    // Verificar si la cámara existe en la configuración
    const camera = cameras[cameraId];
    if (!camera) {
        return res.status(404).send('Camera not found.');
    }

    // Crear una instancia del cliente Digest con las credenciales de la cámara específica
    const digestClient = new DigestClient(camera.username, camera.password);
    
    try {
        const response = await digestClient.fetch(camera.url);

        if (response.ok) {
            res.setHeader('Content-Type', 'multipart/x-mixed-replace; boundary=--myboundary');
            res.setHeader('Content-Disposition', 'inline');
            response.body.pipe(res);
        } else {
            res.status(response.status).send('Failed to fetch video.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).send('Internal Server Error.');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
