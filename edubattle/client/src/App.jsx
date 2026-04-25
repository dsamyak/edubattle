import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from './stores/useUserStore';
import Dashboard from './pages/Dashboard';
import Lobby from './pages/Lobby';
import Battle1v1 from './pages/Battle1v1';
import SpeedChallenge from './pages/SpeedChallenge';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const isBattle = location.pathname.startsWith('/battle') || location.pathname.startsWith('/lobby');

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="hex-bg"></div>
      <div className="grid-overlay"></div>
      <div className="scanlines"></div>

      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              background: ['#00ffcc', '#ff0055', '#a200ff'][i % 3],
              animationDelay: `${i * 0.5}s`, animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: `0 0 6px ${['#00ffcc', '#ff0055', '#a200ff'][i % 3]}`
            }}
          />
        ))}
      </div>

      {/* Top Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl sticky top-0 z-50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/dashboard')}
              className="text-2xl font-bold tracking-[0.3em] text-[#00ffcc] font-[Orbitron] uppercase cursor-pointer bg-transparent border-none hover:drop-shadow-[0_0_12px_#00ffcc] transition-all">
              EDUBATTLE
            </button>
            {!isBattle && (
              <div className="hidden md:flex items-center gap-1 text-xs font-mono text-[#8a8a99]">
                <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse inline-block mr-1"></span>
                SYSTEM ONLINE
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Level Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#a200ff]/10 border border-[#a200ff]/30 rounded-lg">
              <span className="text-[#a200ff] text-xs font-bold font-[Orbitron]">LVL</span>
              <span className="text-white font-mono font-bold text-sm">{user.level}</span>
            </div>

            {/* XP Bar */}
            <div className="hidden lg:flex flex-col items-end gap-0.5">
              <span className="text-[8px] font-mono text-[#8a8a99] tracking-widest">XP {user.xp}/10000</span>
              <div className="w-24 h-1.5 bg-black/60 rounded-full border border-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#a200ff] to-[#00ffcc] rounded-full transition-all"
                  style={{ width: `${(user.xp / 10000) * 100}%` }} />
              </div>
            </div>

            {/* ELO */}
            <div className="px-3 py-1.5 border border-[#00ffcc]/30 rounded-lg font-mono text-[#00ffcc] text-sm bg-[#00ffcc]/5 flex items-center gap-2">
              <span className="text-[8px] text-[#8a8a99]">ELO</span>
              <span className="font-bold">{user.elo}</span>
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00ffcc] to-[#a200ff] flex items-center justify-center text-black font-bold text-sm font-[Orbitron] shadow-[0_0_15px_rgba(0,255,204,0.3)]">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <Routes location={location}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lobby/:mode" element={<Lobby />} />
              <Route path="/battle/1v1" element={<Battle1v1 />} />
              <Route path="/battle/speed" element={<SpeedChallenge />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
