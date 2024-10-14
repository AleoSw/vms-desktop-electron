import DigestClient from "digest-fetch";
import { PassThrough } from "stream";
import { Readable } from "stream";
import { spawn } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import os from "os";

// Definimos cameraStreams como un objeto global
const cameraStreams = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class AxisCamera {
  constructor(ip, user, password) {
    this.ip = ip;
    this.user = user;
    this.password = password;
    this.auth = new DigestClient(user, password);
    this.abortController = null;
    this.isConnected = false;
    this.isDome = false;
  }

  async connect() {
    if (this.isConnected) {
      return true;
    }

    const url = `http://${this.ip}/axis-cgi/pingtest.cgi?ip=${this.ip}`;
    try {
      const response = await this.auth.fetch(url);
      if (response.ok) {
        this.isConnected = true;

        const isDome = await this.isDomeCamera();

        if (isDome) {
          this.isDome = true;
        }
        // Llamar a `record` para comenzar la grabación automáticamente
        //this.record(this.ip, this.user, this.password).catch(console.error);
        return true;
      } else {
        this.isConnected = false;
        return false;
      }
    } catch (error) {
      this.isConnected = false;
      return false;
    }
  }

  async getVideoStream(req, res) {
    const isConnected = await this.connect();
    if (!isConnected) {
      return res.status(500).json({
        message: `No se pudo conectar a la cámara ${this.ip}`,
      });
    }

    const url = `http://${this.ip}/axis-cgi/mjpg/video.cgi`;

    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    this.auth
      .fetch(url, { signal })
      .then((response) => {
        if (response.ok) {
          res.setHeader(
            "Content-Type",
            "multipart/x-mixed-replace; boundary=--myboundary"
          );
          res.setHeader("Content-Disposition", "inline");

          const passthrough = new PassThrough();
          const reader = response.body.getReader();

          const stream = new Readable({
            async read(size) {
              try {
                const { done, value } = await reader.read();
                if (done) {
                  this.push(null);
                } else {
                  this.push(value);
                }
              } catch (error) {
                if (error.name === "AbortError") {
                  this.push(null);
                } else {
                  console.error("Error leyendo el stream:", error.message);
                  this.push(null);
                }
              }
            },
          });

          stream.pipe(passthrough);
          passthrough.pipe(res);

          cameraStreams[this.ip] = passthrough;

          res.on("close", () => {
            delete cameraStreams[this.ip];
            passthrough.end();
          });
        } else {
          return res.status(response.status).json({
            message: `Fallo al obtener video de la cámara ${this.ip}`,
            error: response.statusText,
          });
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          if (cameraStreams[this.ip]) {
            cameraStreams[this.ip].end();
          }
          return res.json({ message: "Stream abortado exitosamente." });
        } else {
          return res.status(500).json({
            message: "Error interno al obtener el stream de video.",
            error: error.message,
          });
        }
      });
  }

  async record(ip, user, password) {
    // Ruta del script de Python
    const pythonScript = path.join(__dirname, "record_camera.py");

    // Crear el proceso para ejecutar el script de Python
    const process = spawn("python3", [pythonScript, ip, user, password]);

    //process.stdout.on("data", (data) => {
    console.log(`STDOUT: ${data}`);
    //});

    process.stderr.on("data", (data) => {
      console.error(`STDERR: ${data}`);
    });

    //process.on("close", (code) => {
    //  console.log(`Proceso de grabación finalizado con código: ${code}`);
    //});
  }

  disconnect(cameraIp) {
    try {
      if (this.abortController) {
        this.abortController.abort();

        this.abortController = null;

        if (cameraStreams[cameraIp]) {
          try {
            cameraStreams[cameraIp].unpipe();
            cameraStreams[cameraIp].end();
          } catch (streamError) {
            return {
              message: `Error al desconectar el stream de la cámara ${cameraIp}: ${streamError.message}`,
            };
          }

          delete cameraStreams[cameraIp];

          return { message: `Stream de la cámara ${cameraIp} abortado.` };
        } else {
          return {
            message: `No hay stream activo para la cámara ${cameraIp}.`,
          };
        }
      } else {
        return { message: `No hay stream activo para la cámara ${cameraIp}.` };
      }
    } catch (error) {
      return {
        message: `Error en disconnect para la cámara ${cameraIp}: ${error.message}`,
      };
    }
  }

  async isDomeCamera() {
    return new Promise((resolve, reject) => {
      // Ruta del script de Python
      const pythonScript = path.join(__dirname, "isDome.py");

      // Crear el proceso para ejecutar el script de Python
      const process = spawn("python3", [
        pythonScript,
        this.ip,
        this.user,
        this.password,
      ]);

      process.stdout.on("data", (data) => {
        const output = data.toString(); // Convertir el buffer a string
        // Aquí puedes agregar lógica para analizar la salida y determinar si es un dome
        if (output.includes("Dome")) {
          resolve(true); // Resuelve la promesa con true
        } else {
          resolve(false); // Resuelve la promesa con false
        }
      });

      process.stderr.on("data", (data) => {
        console.error(`STDERR: ${data}`);
        reject(`Error: ${data}`); // Rechaza la promesa en caso de error
      });

      //process.on("close", (code) => {
      //  console.log(`Proceso isDome finalizado con código: ${code}`);
      //});
    });
  }

  async moveCamera(ip, user, password, direction) {
    return new Promise((resolve, reject) => {
      // Ruta del script de Python
      const pythonScript = path.join(__dirname, "moveCamera.py");

      // Crear el proceso para ejecutar el script de Python
      const process = spawn("python3", [
        pythonScript,
        ip,
        user,
        password,
        direction, // Pasar la dirección al script
      ]);

      process.stdout.on("data", (data) => {
        const output = data.toString(); // Convertir el buffer a string
        console.log(`Output: ${output}`); // Log para ver el output del script
        resolve(output); // Resuelve la promesa con la salida
      });

      process.stderr.on("data", (data) => {
        console.error(`STDERR: ${data}`);
        reject(`Error: ${data}`); // Rechaza la promesa en caso de error
      });

      process.on("close", (code) => {
        console.log(`Proceso moveCamera finalizado con código: ${code}`);
        if (code !== 0) {
          reject(`El proceso terminó con código: ${code}`);
        }
      });
    });
  }

  async captureScreenshot() {
    const url = `http://${this.ip}/axis-cgi/jpg/image.cgi`;

    try {
      const response = await this.auth.fetch(url);

      if (response.ok) {
        // Obtener la imagen como blob
        const blob = await response.blob();

        // Generar el directorio de destino
        const screenshotsDir = path.join(
          os.homedir(),
          "Videos",
          "vms",
          "screenshots",
          this.ip
        );
        await fs.mkdir(screenshotsDir, { recursive: true });

        // Crear un nombre único para la imagen
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Reemplazar caracteres no válidos para el sistema de archivos
        const imagePath = path.join(
          screenshotsDir,
          `screenshot-${timestamp}.jpg`
        );

        // Guardar la imagen en el directorio
        const buffer = Buffer.from(await blob.arrayBuffer());
        await fs.writeFile(imagePath, buffer);

        console.log(`Imagen guardada correctamente en: ${imagePath}`);
        return {
          message: "Imagen capturada y guardada con éxito.",
          path: imagePath,
        };
      } else {
        return {
          message: `Error al capturar imagen de la cámara: ${this.ip}`,
          status: response.status,
        };
      }
    } catch (error) {
      return {
        message: `Error al realizar la solicitud a la cámara: ${this.ip}`,
        error: error.message,
      };
    }
  }

  async getScreenshots() {
    const pathScreenshots = path.join(
      os.homedir(),
      "Videos",
      "vms",
      "screenshots",
      this.ip
    );

    try {
      const archivos = await fs.readdir(pathScreenshots);
      const archivosJSON = await Promise.all(
        archivos.map(async (archivo) => {
          const rutaCompleta = path.join(pathScreenshots, archivo);
          const contenidoArchivo = await fs.readFile(rutaCompleta);
          const base64 = contenidoArchivo.toString("base64"); // Convierte el buffer a base64

          return {
            nombre: archivo,
            imagen: `data:image/jpeg;base64,${base64}`, // Asumiendo que las imágenes son JPEG
          };
        })
      );

      return archivosJSON; // Retorna el JSON con los archivos
    } catch (error) {
      console.error("Error al leer el directorio:", error);
      throw error; // Lanza el error para ser manejado por quien llame a esta función
    }
  }
}
