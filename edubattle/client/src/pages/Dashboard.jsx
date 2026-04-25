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
      <header className="mb-12 text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          SELECT <span className="text-[#00ffcc]">ARENA</span>
        </motion.h1>
        <p className="text-[#8a8a99] text-lg max-w-2xl font-mono">
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
            className={`cyber-card p-6 cursor-pointer group flex flex-col justify-between min-h-[250px] border-${mode.color === 'primary' ? '[#00ffcc]' : mode.color === 'secondary' ? '[#ff0055]' : '[#a200ff]'}/20 hover:border-${mode.color === 'primary' ? '[#00ffcc]' : mode.color === 'secondary' ? '[#ff0055]' : '[#a200ff]'}`}
            onClick={() => navigate(`/lobby/${mode.id}`)}
          >
            <div>
              <div className="text-4xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{mode.icon}</div>
              <h2 className="text-2xl font-bold mb-3 tracking-wide">{mode.title}</h2>
              <p className="text-sm text-[#8a8a99] font-mono leading-relaxed">{mode.desc}</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className={`btn-neon${mode.color === 'secondary' ? '-red' : mode.color === 'tertiary' ? '-purple' : ''} text-sm px-4 py-2`}>
                INITIATE
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 cyber-card p-6 border-[#a200ff]/20">
        <h3 className="text-xl text-[#a200ff] mb-4">DAILY MISSION</h3>
        <div className="flex justify-between items-center bg-black/50 p-4 rounded border border-[#a200ff]/30">
          <div className="font-mono">Win 3 matches in 1v1 Ranked Mode</div>
          <div className="text-[#00ffcc]">0/3</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
