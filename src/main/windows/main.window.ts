import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const createMainWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.webContents.openDevTools();
};

export { createMainWindow };