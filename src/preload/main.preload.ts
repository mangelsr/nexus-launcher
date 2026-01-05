import { contextBridge, ipcRenderer } from 'electron';
import { DownloadProgress } from '@/types/download.d';

contextBridge.exposeInMainWorld('downloadApi', {
    start: (id: string, url: string, fileName: string) => ipcRenderer.invoke('download:start', { id, url, fileName }),
    cancel: (id: string) => ipcRenderer.send('download:cancel', id),
    onProgress: (id: string, callback: (progress: DownloadProgress) => void) => {
        const listener = (_event: any, progress: DownloadProgress) => callback(progress);
        ipcRenderer.on(`download:progress:${id}`, listener);
        return () => ipcRenderer.removeListener(`download:progress:${id}`, listener);
    }
});
