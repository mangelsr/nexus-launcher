import React from 'react';
import { Home, Library, ShoppingBag, Download, Settings, User, Search } from 'lucide-react';
import './Sidebar.css';

export function Sidebar() {
    const navItems = [
        { icon: Home, label: 'Home', active: true },
        { icon: ShoppingBag, label: 'Store', active: false },
        { icon: Library, label: 'Library', active: false },
        { icon: Download, label: 'Downloads', active: false },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-icon glass"></div>
                    <span className="logo-text gradient-text">Launcher</span>
                </div>

                <div className="search-container glass">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-group">
                    <p className="nav-group-title">Menu</p>
                    {navItems.map((item, index) => (
                        <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                            <item.icon size={20} className="nav-icon" />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="nav-item">
                    <Settings size={20} className="nav-icon" />
                    <span>Settings</span>
                </div>

                <div className="user-profile glass">
                    <div className="avatar">
                        <User size={20} />
                    </div>
                    <div className="user-info">
                        <p className="user-name">Miguel Sanchez</p>
                        <p className="user-status">Online</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
