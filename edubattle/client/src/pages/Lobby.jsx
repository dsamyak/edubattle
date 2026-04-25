import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBattleStore } from '../stores/useBattleStore';

const Lobby = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { setMatchStatus } = useBattleStore();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Simulate matchmaking
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);

    const timeout = setTimeout(() => {
      setMatchStatus('active');
      if (mode === '1v1') navigate('/battle/1v1');
      else if (mode === 'speed') navigate('/battle/speed');
      // For team mode, we might just redirect back for now as it's complex
      else navigate('/dashboard'); 
    }, Math.random() * 3000 + 2000); // 2-5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [mode, navigate, setMatchStatus]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="relative w-48 h-48 mb-12"
      >
        <div className="absolute inset-0 rounded-full border-4 border-[#00ffcc] border-t-transparent border-b-transparent animate-spin" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-2 rounded-full border-4 border-[#ff0055] border-l-transparent border-r-transparent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-4 rounded-full border-4 border-[#a200ff] border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 flex items-center justify-center text-[#00ffcc] font-display font-bold text-2xl animate-pulse">
          VS
        </div>
      </motion.div>
      
      <h1 className="text-5xl md:text-7xl text-[#00ffcc] mb-4 font-display font-black tracking-widest drop-shadow-[0_0_15px_#00ffcc] glitch" data-text="MATCHMAKING">
        MATCHMAKING
      </h1>
      
      <div className="game-card-3d px-8 py-4 mb-8 bg-black/60 border-[#a200ff]/30 text-center">
        <p className="font-mono text-xl text-white/80 mb-2">
          Searching for opponent in <span className="text-[#a200ff] font-bold drop-shadow-[0_0_5px_#a200ff]">{mode.toUpperCase()}</span> grid...
        </p>
        <div className="text-6xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          00:{timer.toString().padStart(2, '0')}
        </div>
      </div>

      <button 
        onClick={() => navigate('/dashboard')}
        className="btn-action-danger mt-4"
      >
        ABORT MATCHMAKING
      </button>
    </div>
  );
};

export default Lobby;
