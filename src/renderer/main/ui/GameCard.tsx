import React from 'react';
import { Play } from 'lucide-react';
import './GameCard.css';

interface GameCardProps {
    title: string;
    category: string;
    image: string;
}

export function GameCard({ title, category, image }: GameCardProps) {
    return (
        <div className="game-card">
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image" />
                <div className="card-hover-overlay glass">
                    <div className="play-button-small glass">
                        <Play size={20} fill="currentColor" />
                    </div>
                </div>
            </div>
            <div className="card-info">
                <h3 className="card-title">{title}</h3>
                <p className="card-category">{category}</p>
            </div>
        </div>
    );
}
