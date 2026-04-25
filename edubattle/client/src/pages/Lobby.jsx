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
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-48 h-48 rounded-full border-4 border-[#00ffcc] border-t-transparent animate-spin mb-8"
      />
      
      <h1 className="text-4xl text-[#00ffcc] mb-4 font-display glitch" data-text="MATCHMAKING">MATCHMAKING</h1>
      
      <p className="font-mono text-xl text-[#8a8a99] mb-8">
        Searching for opponent in {mode.toUpperCase()} grid...
      </p>

      <div className="text-6xl font-mono text-white/50 mb-12">
        00:{timer.toString().padStart(2, '0')}
      </div>

      <button 
        onClick={() => navigate('/dashboard')}
        className="btn-neon-red"
      >
        ABORT MATCHMAKING
      </button>
    </div>
  );
};

export default Lobby;
