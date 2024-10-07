import DigestClient from "digest-fetch";
import { PassThrough } from "stream";
import { Readable } from "stream";

// Definimos cameraStreams como un objeto global
const cameraStreams = {};

export class AxisCamera {
  constructor(ip, user, password) {
    this.ip = ip;
    this.user = user;
    this.password = password;
    this.auth = new DigestClient(user, password);
    this.abortController = null;
    this.isConnected = false;
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return { message: `Error en la conexión: ${this.ip}`, error: error.message };
    }
  }

  getVideoStream(req, res) {
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
                  this.push(null); // Cierra el stream
                } else {
                  console.error("Error leyendo el stream:", error.message);
                  this.push(null);
                }
              }
            },
          });

          stream.pipe(passthrough);
          passthrough.pipe(res);

          // Guardar el stream en la memoria para reutilizar
          cameraStreams[this.ip] = passthrough;

          // Limpiar el stream después de que la conexión se cierre
          res.on("close", () => {
            delete cameraStreams[this.ip];
            passthrough.end(); // Finaliza el PassThrough
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
          // Asegúrate de terminar el passthrough para evitar seguir enviando datos
          if (cameraStreams[this.ip]) {
            cameraStreams[this.ip].end(); // Finaliza el stream
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

  disconnect(cameraIp) {
    try {
      if (this.abortController) {
        this.abortController.abort(); // Intentamos abortar el stream
        
        // Limpiar el controlador de abortos
        this.abortController = null;

        // Limpiar el stream de la cámara específica si existe
        if (cameraStreams[cameraIp]) {
          try {
            cameraStreams[cameraIp].unpipe(); // Desconectar el flujo
            cameraStreams[cameraIp].end();    // Terminar el flujo
          } catch (streamError) {
            return { message: `Error al desconectar el stream de la cámara ${cameraIp}: ${streamError.message}` };
          }

          // Eliminar el stream de la memoria
          delete cameraStreams[cameraIp];

          return { message: `Stream de la cámara ${cameraIp} abortado.` };
        } else {
          return { message: `No hay stream activo para la cámara ${cameraIp}.` };
        }
      } else {
        return { message: `No hay stream activo para la cámara ${cameraIp}.` };
      }
    } catch (error) {
      return { message: `Error en disconnect para la cámara ${cameraIp}: ${error.message}` };
    }
  }

  static streams() {
    const activeStreams = Object.keys(cameraStreams).map((ip) => {
      return {
        ip,
        isActive: !!cameraStreams[ip],
      };
    });

    return { activeStreams };
  }
}
