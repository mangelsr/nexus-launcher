import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './windows/main.window'
import { setupDownloadIpc } from './ipc';

if (require('electron-squirrel-startup')) {
    app.quit();
}

app.on('ready', () => {
    setupDownloadIpc();
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

export { app };