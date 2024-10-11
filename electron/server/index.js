import express from "express";
import morgan from "morgan";
import cors from "cors";
import axisRoutes from "./routes/axisRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5002;

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/axis", axisRoutes);

// Definir un router
const screenshotsRouter = express.Router();
screenshotsRouter.use(express.static(path.join(__dirname, 'Videos', 'vms', 'screenshots')));
app.use('/screenshots', screenshotsRouter);

app.listen(PORT, () => {
  console.log("Proxy server is running on port:", PORT);
});
