// import { app, BrowserWindow}from 'electron';
// import  path from 'path';
// import isDev from 'electron-is-dev';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

import  { app, BrowserWindow } from "electron";
import  path from "path";
import  isDev from "electron-is-dev";
import  { fileURLToPath } from "url";
import  { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    const startURL = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`;

    mainWindow.loadURL(startURL);

    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
