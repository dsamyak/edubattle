import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  const modes = [
    {
      id: '1v1',
      title: '1v1 DUEL',
      desc: 'Ranked matchmaking. Wage confidence, destroy your opponent.',
      color: 'primary',
      icon: '⚔️'
    },
    {
      id: 'team',
      title: 'TEAM BATTLE',
      desc: '3v3 strategic warfare. Assign roles, vote on powerups.',
      color: 'tertiary',
      icon: '👥'
    },
    {
      id: 'speed',
      title: 'BLITZ MODE',
      desc: '50 questions. Fastest correct answers win the daily leaderboard.',
      color: 'secondary',
      icon: '⚡'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="inline-block relative animate-float mb-6"
        >
          <div className="absolute inset-0 bg-[#00ffcc] blur-3xl opacity-20 rounded-full"></div>
          <h1 className="game-title" data-text="EDUBATTLE">
            EDUBATTLE
          </h1>
          <div className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#00ffcc] mt-[-10px] ml-2">SELECT ARENA</div>
        </motion.div>
        <p className="text-[#8a8a99] text-lg max-w-2xl mx-auto font-mono bg-black/40 p-3 rounded border border-white/10 backdrop-blur-sm">
          System operational. Awaiting command. Enter the grid to boost your academic rating.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`game-card-3d p-6 cursor-pointer group flex flex-col justify-between min-h-[280px] border-${mode.color === 'primary' ? '[#00ffcc]' : mode.color === 'secondary' ? '[#ff0055]' : '[#a200ff]'}/30`}
            onClick={() => navigate(`/lobby/${mode.id}`)}
          >
            <div>
              <div className="text-4xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{mode.icon}</div>
              <h2 className="text-2xl font-bold mb-3 tracking-wide">{mode.title}</h2>
              <p className="text-sm text-[#8a8a99] font-mono leading-relaxed">{mode.desc}</p>
            </div>
            
            <div className="mt-6 flex justify-end relative z-10">
              <button className={`btn-action${mode.color === 'secondary' ? '-danger' : mode.color === 'tertiary' ? '-purple' : ''} text-sm px-6 py-3 w-full`}>
                INITIATE
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 game-card-3d p-6 border-[#a200ff]/40 bg-black/60 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a200ff] to-transparent opacity-50"></div>
        <h3 className="text-xl text-[#a200ff] mb-4 font-display font-bold flex items-center gap-2">
          <span className="text-2xl">🎯</span> DAILY MISSION
        </h3>
        <div className="flex justify-between items-center bg-black/80 p-5 rounded-lg border border-[#a200ff]/30 shadow-[inset_0_0_20px_rgba(162,0,255,0.1)]">
          <div className="font-mono text-lg text-white/90">Win 3 matches in 1v1 Ranked Mode</div>
          <div className="text-[#00ffcc] font-display text-2xl font-bold bg-[#00ffcc]/10 px-4 py-1 rounded">0/3</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
