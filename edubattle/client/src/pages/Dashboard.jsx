import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/useUserStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const modes = [
    { id: '1v1', title: '1V1 DUEL', desc: 'Ranked matchmaking. Wage confidence, destroy your opponent.', color: '#00ffcc', icon: '⚔️', badge: 'RANKED' },
    { id: 'team', title: 'TEAM BATTLE', desc: '3v3 strategic warfare. Assign roles, vote on powerups.', color: '#a200ff', icon: '👥', badge: 'COMING SOON' },
    { id: 'speed', title: 'BLITZ MODE', desc: '50 questions in 60 seconds. Race the clock for leaderboard glory.', color: '#ff0055', icon: '⚡', badge: 'SOLO' },
  ];

  const stats = [
    { label: 'WINS', value: '47', color: '#00ffcc' },
    { label: 'LOSSES', value: '23', color: '#ff0055' },
    { label: 'WIN RATE', value: '67%', color: '#a200ff' },
    { label: 'STREAK', value: '5🔥', color: '#ffcc00' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <header className="mb-12 text-center relative">
        <motion.div initial={{ opacity: 0, y: -30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }} className="relative mb-6">
          <div className="absolute inset-0 bg-[#00ffcc] blur-[80px] opacity-10 rounded-full"></div>
          <h1 className="text-5xl md:text-7xl font-[Orbitron] font-black tracking-wider relative">
            <span className="bg-gradient-to-b from-white via-white to-[#8a8a99] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,204,0.4)]">
              EDUBATTLE
            </span>
          </h1>
          <div className="text-lg md:text-xl font-bold tracking-[0.3em] text-[#00ffcc] mt-1 font-[Orbitron]">SELECT ARENA</div>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-[#8a8a99] text-sm max-w-xl mx-auto font-[Rajdhani] bg-black/40 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
          ⟐ System operational. Awaiting command. Enter the grid to boost your academic rating. ⟐
        </motion.p>
      </header>

      {/* Stats Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center hover:border-white/20 transition-colors">
            <div className="text-[10px] font-mono text-[#8a8a99] tracking-widest mb-1">{s.label}</div>
            <div className="text-xl font-bold font-[Orbitron]" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </motion.div>

      {/* Game Mode Cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {modes.map((mode, i) => (
          <motion.div key={mode.id}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="game-card-3d p-6 cursor-pointer group flex flex-col justify-between min-h-[260px] relative"
            style={{ borderColor: `${mode.color}30` }}
            onClick={() => navigate(`/lobby/${mode.id}`)}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-60"
              style={{ background: `linear-gradient(90deg, transparent, ${mode.color}, transparent)` }} />
            {/* Badge */}
            <div className="absolute top-3 right-3 text-[9px] font-bold font-mono tracking-widest px-2 py-0.5 rounded border"
              style={{ color: mode.color, borderColor: `${mode.color}50`, background: `${mode.color}10` }}>
              {mode.badge}
            </div>
            <div>
              <div className="text-4xl mb-3 opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110 inline-block">{mode.icon}</div>
              <h2 className="text-xl font-bold mb-2 tracking-wide font-[Orbitron]" style={{ color: mode.color }}>{mode.title}</h2>
              <p className="text-xs text-[#8a8a99] font-[Rajdhani] leading-relaxed">{mode.desc}</p>
            </div>
            <div className="mt-5">
              <button className="w-full py-3 rounded-lg text-sm font-bold font-[Orbitron] tracking-wider border-none cursor-pointer transition-all"
                style={{
                  background: `linear-gradient(135deg, ${mode.color}, ${mode.color}99)`,
                  color: '#000',
                  boxShadow: `0 4px 0 ${mode.color}66, 0 8px 20px ${mode.color}40`
                }}>
                INITIATE
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Daily Mission + Leaderboard Row */}
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="game-card-3d p-5 border-[#a200ff]/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#a200ff] to-transparent opacity-50" />
          <h3 className="text-sm text-[#a200ff] mb-3 font-[Orbitron] font-bold flex items-center gap-2">🎯 DAILY MISSION</h3>
          <div className="space-y-2">
            {[
              { task: 'Win 3 matches in 1v1', progress: '1/3', pct: 33 },
              { task: 'Score 500+ in Blitz Mode', progress: '0/1', pct: 0 },
              { task: 'Answer 20 questions correctly', progress: '12/20', pct: 60 },
            ].map((m, i) => (
              <div key={i} className="bg-black/50 p-3 rounded-lg border border-[#a200ff]/20">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-[Rajdhani] text-sm text-white/80">{m.task}</span>
                  <span className="text-[#00ffcc] font-mono text-xs font-bold">{m.progress}</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#a200ff] to-[#00ffcc] rounded-full transition-all" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="game-card-3d p-5 border-[#ffcc00]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffcc00] to-transparent opacity-50" />
          <h3 className="text-sm text-[#ffcc00] mb-3 font-[Orbitron] font-bold flex items-center gap-2">🏆 TOP PLAYERS</h3>
          <div className="space-y-2">
            {[
              { name: 'ShadowByte', elo: 1890, rank: 1 },
              { name: 'NeuralNinja', elo: 1720, rank: 2 },
              { name: 'QuantumAce', elo: 1650, rank: 3 },
              { name: user.username, elo: user.elo, rank: 14, isYou: true },
            ].map((p) => (
              <div key={p.rank} className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${p.isYou ? 'bg-[#00ffcc]/5 border-[#00ffcc]/30' : 'bg-black/30 border-white/5 hover:border-white/10'}`}>
                <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-mono ${p.rank <= 3 ? 'bg-[#ffcc00]/20 text-[#ffcc00]' : 'bg-white/5 text-[#8a8a99]'}`}>
                  {p.rank}
                </span>
                <span className={`flex-1 text-sm font-[Rajdhani] font-bold ${p.isYou ? 'text-[#00ffcc]' : 'text-white/80'}`}>
                  {p.name} {p.isYou && <span className="text-[8px] text-[#00ffcc]/60 ml-1">(YOU)</span>}
                </span>
                <span className="font-mono text-xs text-[#8a8a99]">{p.elo}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
