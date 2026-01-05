import { Sidebar } from './Sidebar';
import { HeroSection } from './HeroSection';
import { GameCard } from './GameCard';
import './Layout.css';

import image1 from '@/assets/images/game_card_1.png';
import image2 from '@/assets/images/game_card_2.png';
import image3 from '@/assets/images/game_card_3.png';


export function Layout() {
    const games = [
        { title: 'Dragon Soul', category: 'Fantasy RPG', image: image1 },
        { title: 'Velocity X', category: 'Sci-Fi Racing', image: image2 },
        { title: 'Ghost Squad', category: 'Tactical Shooter', image: image3 },
        { title: 'Epic Adventure', category: 'Sandbox', image: image1 },
        { title: 'Cyber Drift', category: 'Racing', image: image2 },
    ];

    return (
        <div className="app-container">
            {/* Background elements for depth */}
            <div className="bg-glow"></div>

            <div className="sidebar-container glass">
                <Sidebar />
            </div>

            <main className="main-content">
                <HeroSection />

                <div className="section-header">
                    <h2 className="section-title">Jump Back In</h2>
                    <span className="view-all">View All</span>
                </div>

                <div className="games-grid">
                    {games.map((game, index) => (
                        <GameCard key={index} {...game} />
                    ))}
                </div>
            </main>
        </div>
    );
}