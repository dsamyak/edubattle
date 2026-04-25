import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Lobby from './pages/Lobby';
import Battle1v1 from './pages/Battle1v1';
import SpeedChallenge from './pages/SpeedChallenge';

function App() {
  return (
    <div className="relative min-h-screen text-white">
      <div className="hex-bg"></div>
      <div className="grid-overlay"></div>
      <div className="scanlines"></div>
      
      {/* Navbar Placeholder */}
      <nav className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-widest text-[#00ffcc] font-display uppercase glitch" data-text="EDUBATTLE">
          EDUBATTLE
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-1 border border-[#00ffcc]/30 rounded-full font-mono text-[#00ffcc] text-sm">
            ELO: 1250
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8 pt-8">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lobby/:mode" element={<Lobby />} />
          <Route path="/battle/1v1" element={<Battle1v1 />} />
          <Route path="/battle/speed" element={<SpeedChallenge />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
