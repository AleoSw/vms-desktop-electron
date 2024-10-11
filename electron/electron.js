const path = require("path");
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { spawn, fork } = require("child_process"); // Asegúrate de importar spawn aquí
require("dotenv").config();

const isDev = process.env.IS_DEV === "true";

function installDependencies() {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, "install_dependencies.py");

    const process = spawn("py", [pythonScript]);

    process.stdout.on("data", (data) => {
      console.log(`STDOUT: ${data}`);
    });

    process.stderr.on("data", (data) => {
      console.error(`STDERR: ${data}`);
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Proceso de instalación fallido con código: ${code}`);
      }
    });
  });
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL("http://localhost:3002");
  }
}

app.whenReady().then(async () => {
  try {
    await installDependencies();
    console.log("Dependencias instaladas. Iniciando la aplicación...");
    
    // Crear la ventana de Electron aquí después de instalar dependencias
    createWindow();

    // Iniciar el servidor proxy de Express en un proceso separado
    const proxyServer = fork(path.join(__dirname, "server/index.js"));

    proxyServer.on("error", (err) => {
      console.error("Error starting the proxy server:", err);
    });

    if (!isDev) {
      const serverReact = fork(path.join(__dirname, "server.js"));

      serverReact.on("error", (err) => {
        console.error("Error starting the dist server:", err);
      });
    }

  } catch (error) {
    console.error(`Error al instalar dependencias: ${error}`);
    app.quit();
  }

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("minimize-window", () => {
  mainWindow.minimize();
});

ipcMain.on("maximize-window", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("close-window", () => {
  mainWindow.close();
});
