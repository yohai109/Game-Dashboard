# System Monitor Dashboard

A real-time system monitoring dashboard that displays CPU and GPU metrics in a clean, modern interface.

![Dashboard Screenshot](public/screenshot.png)

## Features

- Real-time CPU monitoring (load, temperature)
- GPU monitoring (utilization, temperature, VRAM)
- Clean, responsive UI with dark theme
- Auto-refresh toggle
- Error handling and loading states

## Technologies Used

- **Frontend**:
  - React with TypeScript
  - Vite for development server and build
  - CSS Modules for scoped styling
  - Custom hooks for data fetching and state management

- **Backend**:
  - Node.js with Express
  - System information library for hardware metrics
  - WebSocket for real-time updates

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- NVIDIA GPU (for GPU monitoring)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/system-monitor-dashboard.git
   cd system-monitor-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
watch/
├── public/              # Static assets
├── server/              # Backend server code
│   ├── api/             # API endpoints
│   ├── sysInfoRetrivers/# Hardware information retrieval
│   └── index.ts         # Server entry point
├── src/
│   ├── components/      # Reusable React components
│   │   ├── HardwareInfo/# Hardware monitoring components
│   │   │   ├── CpuSection/  # CPU monitoring component
│   │   │   └── GpuSection/  # GPU monitoring component
│   │   ├── TasksCard/   # Tasks card component
│   │   └── WatchCard/   # Watch card component
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
└── types/               # TypeScript type definitions
```

## Configuration

Environment variables for the server can be configured in `.env`:

```
PORT=3001
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [systeminformation](https://www.npmjs.com/package/systeminformation) - For system information retrieval
- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Frontend tooling
