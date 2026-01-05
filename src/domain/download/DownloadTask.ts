import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';

import { DownloadProgress } from '@/types/download.d';

export class DownloadTask extends EventEmitter {
    private url: string;
    private destPath: string;
    private bytesDownloaded: number = 0;
    private totalBytes: number = 0;
    private startTime: number = 0;
    private request: http.ClientRequest | null = null;

    constructor(url: string, destPath: string) {
        super();
        this.url = url;
        this.destPath = destPath;
    }

    public start(): void {
        this.startTime = Date.now();

        // Ensure directory exists
        const dir = path.dirname(this.destPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const fileStream = fs.createWriteStream(this.destPath);

        this.request = https.get(this.url, (response) => {
            if (response.statusCode !== 200) {
                this.emit('error', new Error(`Failed to download: ${response.statusCode}`));
                return;
            }

            this.totalBytes = parseInt(response.headers['content-length'] || '0', 10);

            response.on('data', (chunk) => {
                this.bytesDownloaded += chunk.length;
                this.emitProgress();
            });

            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                this.emit('complete', this.destPath);
            });
        });

        this.request.on('error', (err: any) => {
            fs.unlink(this.destPath, () => { }); // Delete partial file
            this.emit('error', err);
        });
    }

    public cancel(): void {
        if (this.request) {
            this.request.destroy();
            this.emit('cancelled');
        }
    }

    private emitProgress(): void {
        const currentTime = Date.now();
        const duration = (currentTime - this.startTime) / 1000;
        const speed = duration > 0 ? this.bytesDownloaded / duration : 0;
        const percentage = this.totalBytes > 0 ? (this.bytesDownloaded / this.totalBytes) * 100 : 0;

        const progress: DownloadProgress = {
            bytesDownloaded: this.bytesDownloaded,
            totalBytes: this.totalBytes,
            percentage,
            speed
        };

        this.emit('progress', progress);
    }
}
