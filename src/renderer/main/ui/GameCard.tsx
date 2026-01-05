import React, { useState, useEffect } from 'react';
import { Play, Download, CheckCircle, XCircle } from 'lucide-react';
import './GameCard.css';
import { DownloadProgress } from '@/types/download.d';

interface GameCardProps {
    title: string;
    category: string;
    image: string;
}

type Status = 'idle' | 'downloading' | 'completed' | 'error';

export function GameCard({ title, category, image }: GameCardProps) {
    const [status, setStatus] = useState<Status>('idle');
    const [progress, setProgress] = useState(0);
    const [downloadSpeed, setDownloadSpeed] = useState(0);

    const gameId = title.toLowerCase().replace(/\s+/g, '-');

    useEffect(() => {
        if (status === 'downloading') {
            const cleanup = window.downloadApi.onProgress(gameId, (p: DownloadProgress) => {
                setProgress(Math.round(p.percentage));
                setDownloadSpeed(p.speed);
            });
            return cleanup;
        }
    }, [status, gameId]);

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (status !== 'idle') return;

        setStatus('downloading');
        // Mock URL for testing - in a real app this would come from a game service
        const posibleSizes = ['100MB', '1GB'];
        const randomSize = posibleSizes[Math.floor(Math.random() * posibleSizes.length)];
        const mockUrl = `https://nbg1-speed.hetzner.com/${randomSize}.bin`;
        const result = await window.downloadApi.start(gameId, mockUrl, `${gameId}.zip`);

        if (result.success) {
            setStatus('completed');
        } else {
            setStatus('error');
            console.error('Download failed:', result.error);
        }
    };

    const formatSpeed = (bytesPerSecond: number) => {
        if (bytesPerSecond === 0) return '0 B/s';
        const k = 1024;
        const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
        const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k));
        return parseFloat((bytesPerSecond / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className="game-card">
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image" />

                <div className="card-hover-overlay">
                    {status === 'idle' && (
                        <div className="play-button-small" onClick={handleDownload} title="Download">
                            <Download size={20} />
                        </div>
                    )}
                    {status === 'completed' && (
                        <div className="play-button-small success" title="Play Now">
                            <Play size={20} fill="currentColor" />
                        </div>
                    )}
                </div>

                {status === 'downloading' && (
                    <div className="download-overlay">
                        <div className="progress-container">
                            <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="download-info">
                                <span>{progress}%</span>
                                <span>{formatSpeed(downloadSpeed)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="card-info">
                <div className="title-row">
                    <h3 className="card-title">{title}</h3>
                    {status === 'completed' && <CheckCircle size={14} className="status-icon completed" />}
                    {status === 'error' && <XCircle size={14} className="status-icon error" />}
                </div>
                <p className="card-category">{category}</p>
            </div>
        </div>
    );
}
