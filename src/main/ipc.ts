import * as path from 'path';

import { app, ipcMain } from 'electron';
import { downloadManager } from '../domain/download/DownloadManager';

export function setupDownloadIpc() {
    ipcMain.handle('download:start', async (event, { id, url, fileName }) => {
        const destPath = path.join(app.getPath('downloads'), 'LauncherGames', fileName);

        try {
            const resultPath = await downloadManager.startDownload(id, url, destPath, (progress) => {
                // Send progress updates to the specific window that requested it
                const webContents = event.sender;
                webContents.send(`download:progress:${id}`, progress);
            });

            return { success: true, path: resultPath };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    });

    ipcMain.on('download:cancel', (event, id) => {
        downloadManager.cancelDownload(id);
    });
}
