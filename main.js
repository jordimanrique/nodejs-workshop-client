const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const isDevMode = (process.argv || []).indexOf('--dev') !== -1;
const appIcon = path.join(__dirname, 'icon.png');
const closeOnDock = !isDevMode;
const devTools = isDevMode;

if (isDevMode) {
    // Auto-reload on changes
    require('electron-reload')(__dirname, {
        electron: require(path.join(__dirname, 'node_modules', 'electron'))
    });
}

// Global reference of the window object
let win;

function createWindow () {
    win = new BrowserWindow({width: isDevMode? 1000 : 500, height: 600, icon: appIcon});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'public', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    if (devTools) {
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null
    });
}

// Application start
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // macOS specific behavior
    if (process.platform !== 'darwin' || !closeOnDock) {
        app.quit();
    }
});

app.on('activate', () => {
    // macOS specific behavior
    if (win === null && !closeOnDock) {
        createWindow();
    }
});
