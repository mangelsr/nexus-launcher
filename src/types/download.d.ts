export interface DownloadProgress {
    bytesDownloaded: number;
    totalBytes: number;
    percentage: number;
    speed: number; // bytes per second
}

declare global {
    interface Window {
        downloadApi: {
            start: (id: string, url: string, fileName: string) => Promise<{ success: boolean; path?: string; error?: string }>;
            cancel: (id: string) => void;
            onProgress: (id: string, callback: (progress: DownloadProgress) => void) => () => void;
        };
    }
}

export { };
