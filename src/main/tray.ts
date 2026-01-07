import { Tray, Menu, nativeImage, BrowserWindow, app } from 'electron';
import path from 'path';
import trayIconPath from '../assets/images/logo.png';

let tray: Tray | null = null;

export const createTray = (mainWindow: BrowserWindow) => {
    if (tray) return tray;

    const icon = nativeImage.createFromPath(path.join(__dirname, trayIconPath));
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open Nexus Launcher',
            click: () => {
                mainWindow.show();
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                app.quit();
            }
        }
    ]);

    tray.setToolTip('Nexus Launcher');
    tray.setContextMenu(contextMenu);

    tray.on('double-click', () => {
        mainWindow.show();
    });

    return tray;
};

export const getTray = () => tray;
