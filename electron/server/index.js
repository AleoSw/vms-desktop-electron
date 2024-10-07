import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import axisRoutes from './routes/axisRoutes.js';

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use('/axis', axisRoutes);

// Crear servidor WebSocket
const wss = new WebSocketServer({ port: 5003 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Received from client:', message);
        // Aquí puedes realizar alguna acción cuando recibas un mensaje del cliente

        // Por ejemplo, podrías enviar una señal de vuelta cuando se completa una tarea
        const responseMessage = { message: 'Task completed!' };
        ws.send(JSON.stringify(responseMessage));
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.listen(PORT, () => {
    console.log('Proxy server is running on port:', PORT);
});
