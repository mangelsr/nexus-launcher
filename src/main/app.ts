import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './windows/main.window'
import { setupDownloadIpc } from './ipc';
import { createTray } from './tray';

let isQuitting = false;

if (require('electron-squirrel-startup')) {
    app.quit();
}

app.on('ready', () => {
    setupDownloadIpc();
    const mainWindow = createMainWindow();
    createTray(mainWindow);

    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });
});

app.on('before-quit', () => {
    isQuitting = true;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length === 0) {
        createMainWindow();
    } else {
        windows[0].show();
    }
});

export { app };