/* global console, process */
import { app, Tray, Menu, BrowserWindow } from "electron";
import { spawn } from "child_process";
import path from "path";
import notifier from "node-notifier";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Enable Node.js integration in renderer process
app.allowRendererProcessReuse = true;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let tray = null;
let serverProcess = null;
let devServerProcess = null;

function createTray() {
  const iconPath = path.join(__dirname, "public", "icon.ico");

  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Dashboard",
      click: () => {
        const win = new BrowserWindow({
          width: 1200,
          height: 800,
          webPreferences: {
            nodeIntegration: true,
          },
        });
        win.loadURL("http://localhost:5173");
      },
    },
    {
      label: "Start Servers",
      click: startServers,
    },
    {
      label: "Stop Servers",
      click: stopServers,
    },
    {
      label: "Exit",
      click: () => {
        stopServers();
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Watch App");
  tray.setContextMenu(contextMenu);

  // Show notification when app starts
  notifier.notify({
    title: "Watch App",
    message: "Running in system tray",
    icon: iconPath,
  });

  // Start servers when app starts
  startServers();
}

function startServers() {
  if (!serverProcess) {
    serverProcess = spawn("npm", ["run", "server"], {
      cwd: __dirname,
      shell: true,
      detached: true,
      stdio: "ignore",
    });
  }

  if (!devServerProcess) {
    devServerProcess = spawn("npm", ["run", "dev"], {
      cwd: __dirname,
      shell: true,
      detached: true,
      stdio: "ignore",
    });
  }
}

function stopServers() {
  try {
    if (serverProcess) {
      if (process.platform === "win32") {
        spawn("taskkill", ["/PID", serverProcess.pid, "/F", "/T"]);
      } else {
        process.kill(-serverProcess.pid, "SIGTERM");
      }
      serverProcess = null;
    }

    if (devServerProcess) {
      if (process.platform === "win32") {
        spawn("taskkill", ["/PID", devServerProcess.pid, "/F", "/T"]);
      } else {
        process.kill(-devServerProcess.pid, "SIGTERM");
      }
      devServerProcess = null;
    }
  } catch (error) {
    console.error("Error stopping servers:", error);
  }
}

function handleError(error, context) {
  console.error(`[ERROR] ${context}:`, error);
  if (!app.isReady()) {
    app.quit();
  }
}

app
  .whenReady()
  .then(() => {
    try {
      createTray();
      console.log("Tray application started successfully");
    } catch (error) {
      handleError(error, "Failed to initialize tray");
    }
  })
  .catch((error) => {
    handleError(error, "App initialization failed");
  });

app.on("window-all-closed", (event) => {
  if (process.platform !== "darwin") {
    event.preventDefault();
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Cleanup on exit
process.on("exit", () => {
  stopServers();
  app.quit();
});
