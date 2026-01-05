import { Play, Info } from 'lucide-react';
import './HeroSection.css';

import heroImage from '@/assets/images/cyberpunk_hero_bg.png';

export function HeroSection() {
    return (
        <div className="hero-section">
            <div className="hero-bg-wrapper">
                <img src={heroImage} alt="Cyberpunk City" className="hero-bg" />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <div className="tag glass">Featured Game</div>
                <h1 className="hero-title">Neon Overdrive</h1>
                <p className="hero-description">
                    Experience the ultimate high-speed chase in a sprawling cyberpunk metropolis.
                    Upgrade your ride, outrun the corp-sec, and become a legend of the underground.
                </p>

                <div className="hero-actions">
                    <button className="btn-primary">
                        <Play size={18} fill="currentColor" />
                        <span>Play Now</span>
                    </button>
                    <button className="btn-secondary glass">
                        <Info size={18} />
                        <span>Details</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
