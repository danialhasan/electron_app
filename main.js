try {
    require('electron-reloader')(module)
} catch (_) {}
const {
    app,
    BrowserWindow
} = require("electron");
const path = require("path");

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.on('ready', loadMainWindow);

//fixes app still running after windows closed, on non-macos platforms
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
/**
 * this code ensures that the app opens when its icon is clicked on the 
 * mac's application dock, the one on the bottom. 
 * 
 * If the number of open windows is zero when the app icon is clicked, 
 * load the main window.
 */
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});