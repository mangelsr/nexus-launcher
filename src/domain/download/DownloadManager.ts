import { DownloadProgress } from '@/types/download.d';
import { DownloadTask } from './DownloadTask';

export class DownloadManager {
    private activeTasks: Map<string, DownloadTask> = new Map();

    public async startDownload(id: string, url: string, destPath: string, onProgress: (progress: DownloadProgress) => void,): Promise<string> {
        if (this.activeTasks.has(id)) {
            throw new Error(`Task ${id} is already running`);
        }

        const task = new DownloadTask(url, destPath);
        this.activeTasks.set(id, task);

        return new Promise((resolve, reject) => {
            task.on('progress', (progress) => {
                onProgress(progress);
            });

            task.on('complete', (path) => {
                this.activeTasks.delete(id);
                resolve(path);
            });

            task.on('error', (err) => {
                this.activeTasks.delete(id);
                reject(err);
            });

            task.on('cancelled', () => {
                this.activeTasks.delete(id);
                reject(new Error('Download cancelled'));
            });

            task.start();
        });
    }

    public cancelDownload(id: string): void {
        const task = this.activeTasks.get(id);
        if (task) {
            task.cancel();
            this.activeTasks.delete(id);
        }
    }

    public isDownloading(id: string): boolean {
        return this.activeTasks.has(id);
    }
}

// Singleton instance for the main process
export const downloadManager = new DownloadManager();
