import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomQuestions } from '../data/questions';

const SpeedChallenge = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [flash, setFlash] = useState(null);

  useEffect(() => { setQuestions(getRandomQuestions(50)); }, []);

  useEffect(() => {
    if (gameOver || questions.length === 0) return;
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    } else { setGameOver(true); }
  }, [timeLeft, gameOver, questions]);

  const handleAnswer = (idx) => {
    const isCorrect = idx === questions[currentIndex].correct_idx;
    if (isCorrect) {
      const newStreak = streak + 1;
      const bonus = newStreak >= 5 ? 50 : newStreak >= 3 ? 25 : 0;
      setScore(s => s + 100 + bonus);
      setStreak(newStreak);
      setBestStreak(b => Math.max(b, newStreak));
      setCorrect(c => c + 1);
      setFlash('correct');
    } else {
      setScore(s => Math.max(0, s - 50));
      setStreak(0);
      setWrong(w => w + 1);
      setFlash('wrong');
    }
    setTimeout(() => setFlash(null), 300);
    if (currentIndex + 1 < questions.length) setCurrentIndex(i => i + 1);
    else setGameOver(true);
  };

  if (questions.length === 0) return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-[#ff0055] font-[Orbitron] text-xl animate-pulse">LOADING BLITZ...</div>
    </div>
  );

  const timerPct = (timeLeft / 60) * 100;
  const q = questions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div initial={{ opacity: 0.4 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 pointer-events-none z-40 ${flash === 'correct' ? 'bg-[#00ffcc]/10' : 'bg-[#ff0055]/10'}`} />
        )}
      </AnimatePresence>

      {!gameOver ? (
        <>
          {/* HUD */}
          <div className="bg-black/60 backdrop-blur-sm border border-[#ff0055]/20 rounded-xl p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Score */}
              <div className="text-center">
                <div className="text-[9px] font-mono text-[#8a8a99] tracking-widest">SCORE</div>
                <div className="text-2xl font-[Orbitron] font-bold text-[#00ffcc] drop-shadow-[0_0_8px_#00ffcc]">{score}</div>
              </div>

              {/* Streak */}
              <div className="text-center">
                <div className="text-[9px] font-mono text-[#8a8a99] tracking-widest">STREAK</div>
                <div className={`text-xl font-[Orbitron] font-bold ${streak >= 5 ? 'text-[#ffcc00] animate-pulse' : streak >= 3 ? 'text-[#ff8800]' : 'text-white/60'}`}>
                  {streak > 0 ? `${streak}🔥` : '—'}
                </div>
              </div>

              {/* Timer */}
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none"
                    stroke={timeLeft <= 10 ? '#ff0055' : timeLeft <= 20 ? '#ffcc00' : '#00ffcc'}
                    strokeWidth="3" strokeDasharray={`${timerPct * 0.94} 100`}
                    strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`font-mono font-black text-xl ${timeLeft <= 10 ? 'text-[#ff0055] animate-pulse' : 'text-white'}`}>{timeLeft}</span>
                  <span className="text-[7px] text-[#8a8a99] font-mono">SEC</span>
                </div>
              </div>

              {/* Progress */}
              <div className="text-center">
                <div className="text-[9px] font-mono text-[#8a8a99] tracking-widest">PROGRESS</div>
                <div className="text-xl font-mono font-bold text-[#a200ff]">{currentIndex + 1}<span className="text-[#8a8a99] text-sm">/50</span></div>
              </div>

              {/* Accuracy */}
              <div className="text-center">
                <div className="text-[9px] font-mono text-[#8a8a99] tracking-widest">ACCURACY</div>
                <div className="text-xl font-[Orbitron] font-bold text-white/80">
                  {correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0}%
                </div>
              </div>
            </div>

            {/* Timer bar */}
            <div className="mt-3 w-full h-1 bg-black/50 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${timerPct}%`, background: timeLeft <= 10 ? '#ff0055' : timeLeft <= 20 ? '#ffcc00' : '#00ffcc' }} />
            </div>
          </div>

          {/* Question + Answers */}
          <div className="flex-1 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.15 }} className="flex-1 flex flex-col gap-4">

                {/* Question */}
                <div className="game-card-3d p-6 md:p-8 flex-1 flex flex-col justify-center text-center bg-black/40 border-[#ff0055]/20">
                  <div className="text-[10px] font-mono text-[#ff0055] mb-3 tracking-widest flex items-center justify-center gap-2">
                    <span className="px-2 py-0.5 bg-[#ff0055]/10 border border-[#ff0055]/30 rounded">{q.subject}</span>
                    <span className="text-white/20">▸</span>
                    <span className="text-[#8a8a99]">{q.topic}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold leading-tight font-[Space_Grotesk]">{q.body}</h2>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(idx)}
                      className="text-left p-4 rounded-xl border-2 border-white/10 hover:border-[#a200ff]/40 hover:bg-[#a200ff]/5 transition-all bg-black/30 backdrop-blur-sm flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-[Orbitron] text-xs text-[#8a8a99] flex-shrink-0">
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <span className="font-[Rajdhani] text-base text-white/90">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex items-center justify-center">
          <div className="game-card-3d p-10 text-center max-w-md w-full border-[#ff0055]/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff0055]/5 to-transparent" />
            <div className="relative z-10">
              <div className="text-5xl mb-2">⚡</div>
              <h1 className="text-4xl mb-2 font-[Orbitron] font-black text-[#ff0055] tracking-widest">TIME'S UP!</h1>

              <div className="grid grid-cols-2 gap-3 my-6">
                {[
                  { label: 'SCORE', value: score, color: '#00ffcc' },
                  { label: 'CORRECT', value: correct, color: '#00ffcc' },
                  { label: 'WRONG', value: wrong, color: '#ff0055' },
                  { label: 'BEST STREAK', value: `${bestStreak}🔥`, color: '#ffcc00' },
                ].map(s => (
                  <div key={s.label} className="bg-black/40 border border-white/10 rounded-lg p-3">
                    <div className="text-[9px] font-mono text-[#8a8a99] tracking-widest">{s.label}</div>
                    <div className="text-xl font-bold font-[Orbitron]" style={{ color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => {
                  setQuestions(getRandomQuestions(50)); setCurrentIndex(0); setScore(0);
                  setTimeLeft(60); setGameOver(false); setStreak(0); setBestStreak(0);
                  setCorrect(0); setWrong(0);
                }} className="btn-action flex-1 text-sm py-3">RETRY</button>
                <button onClick={() => navigate('/dashboard')} className="btn-action-purple flex-1 text-sm py-3">HUB</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpeedChallenge;
