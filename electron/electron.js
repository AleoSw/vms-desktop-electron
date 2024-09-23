const path = require("path");
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { fork } = require("child_process");
require('dotenv').config();

const isDev = process.env.IS_DEV === "true";

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

app.whenReady().then(() => {
  
  // Iniciar el servidor proxy de Express en un proceso separado
  const proxyServer = fork(path.join(__dirname, "proxy.js"));
  
  proxyServer.on("error", (err) => {
    console.error("Error starting the proxy server:", err);
  });
  
  // Crear la ventana de Electron
  createWindow();
  
  if (!isDev) {
    const serverReact = fork(path.join(__dirname, "server.js"));
  
    serverReact.on("error", (err) => {
      console.error("Error starting the dist server:", err);
    });
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
