# Nexus Launcher - Game Download Manager

A robust and modern download manager component for a game launcher application, built with Electron, React, and TypeScript. This project provides efficient file downloading with progress tracking, IPC communication, and a sleek user interface.

## 🚀 Features

- **Efficient Downloads**: Uses Node.js `https` and streams for high-performance file downloading.
- **Real-time Progress Tracking**: Reports download progress, speed, and status via IPC from the main process to the renderer.
- **Modern UI**: Polished interface built with React, styled with Vanilla CSS, and featuring Lucide React icons.
- **IPC Communication**: Seamless integration between Main and Renderer processes for controlling and monitoring downloads.
- **TypeScript Core**: Fully typed codebase for reliability and maintainability.

## 🛠️ Tech Stack

- **Framework**: [Electron](https://www.electronjs.org/)
- **Frontend**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Electron Forge](https://www.electronforge.io/) with Webpack
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
src/
├── main/           # Main process logic (IPC setup, window management)
├── renderer/       # React components and UI logic
│   ├── main/       # Main window entry and layout
│   │   └── ui/     # UI Components (GameCard, HeroSection, Sidebar)
├── domain/         # Business logic (DownloadManager)
├── preload/        # Preload scripts for secure IPC communication
└── types/          # Type definitions
```

## 🚥 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-new-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the application in development mode with live reloading:
```bash
npm start
```

### Packaging

To package the application for your current platform:
```bash
npm run package
```

To create installers (make):
```bash
npm run make
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by miguel-sanchez
