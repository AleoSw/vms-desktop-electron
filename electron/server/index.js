import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import axisRoutes from './routes/axisRoutes.js';

const app = express();
const PORT = 5002;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/axis', axisRoutes);

app.listen(PORT, () => {
    console.log('Proxy server is running on port:', PORT);
});
