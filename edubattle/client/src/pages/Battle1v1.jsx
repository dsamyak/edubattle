import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBattleStore } from '../stores/useBattleStore';
import { getRandomQuestions } from '../data/questions';

const Battle1v1 = () => {
  const navigate = useNavigate();
  const { playerHp, opponentHp, takeDamage, dealDamage, currentQuestionIndex, nextQuestion, resetBattle } = useBattleStore();
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [confidence, setConfidence] = useState('med');
  const [selectedOption, setSelectedOption] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);

  // Match Stats
  const [matchStats, setMatchStats] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    maxCombo: 0,
    damageDealt: 0,
    timeOuts: 0
  });

  useEffect(() => {
    setQuestions(getRandomQuestions(10));
    return () => resetBattle();
  }, [resetBattle]);

  useEffect(() => {
    if (gameOver || roundResult || questions.length === 0) return;
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    } else { handleTimeOut(); }
  }, [timeLeft, gameOver, roundResult, questions]);

  useEffect(() => {
    if (playerHp <= 0 || opponentHp <= 0 || currentQuestionIndex >= 10) setGameOver(true);
  }, [playerHp, opponentHp, currentQuestionIndex]);

  const handleTimeOut = () => {
    setRoundResult('loss'); 
    setCombo(0); 
    takeDamage(10); 
    setMatchStats(s => ({ ...s, timeOuts: s.timeOuts + 1 }));
    finishRound();
  };

  const handleAnswer = (idx) => {
    if (roundResult) return;
    setSelectedOption(idx);
    const q = questions[currentQuestionIndex];
    const isCorrect = idx === q.correct_idx;
    const opCorrect = Math.random() > 0.3;
    const mult = confidence === 'high' ? 2 : confidence === 'low' ? 0.5 : 1;
    const baseDmg = 15;

    if (isCorrect && !opCorrect) {
      setRoundResult('win'); 
      setCombo(c => { const newC = c + 1; setMatchStats(s => ({...s, maxCombo: Math.max(s.maxCombo, newC)})); return newC; }); 
      dealDamage(baseDmg * mult);
      setMatchStats(s => ({ ...s, correctAnswers: s.correctAnswers + 1, damageDealt: s.damageDealt + (baseDmg * mult) }));
    } else if (!isCorrect && opCorrect) {
      setRoundResult('loss'); setCombo(0); takeDamage(baseDmg * mult);
      setMatchStats(s => ({ ...s, wrongAnswers: s.wrongAnswers + 1 }));
    } else if (isCorrect && opCorrect) {
      setRoundResult('draw'); 
      setCombo(c => { const newC = c + 1; setMatchStats(s => ({...s, maxCombo: Math.max(s.maxCombo, newC)})); return newC; });
      setMatchStats(s => ({ ...s, correctAnswers: s.correctAnswers + 1 }));
    } else {
      setRoundResult('loss'); setCombo(0); takeDamage(baseDmg * mult * 0.5);
      setMatchStats(s => ({ ...s, wrongAnswers: s.wrongAnswers + 1 }));
    }
    finishRound();
  };

  const finishRound = () => {
    setTimeout(() => {
      if (!gameOver) { setRoundResult(null); setSelectedOption(null); setTimeLeft(20); nextQuestion(); }
    }, 2500);
  };

  if (questions.length === 0) return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-[#00ffcc] font-[Orbitron] text-xl animate-pulse">LOADING ARENA...</div>
    </div>
  );

  if (currentQuestionIndex >= questions.length) { setGameOver(true); }
  const q = questions[Math.min(currentQuestionIndex, questions.length - 1)];
  const timerPct = (timeLeft / 20) * 100;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* HUD Bar */}
      <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-4">
          {/* Player HP */}
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="font-bold text-[#00ffcc] tracking-widest text-sm font-[Orbitron] drop-shadow-[0_0_5px_#00ffcc]">YOU</span>
              <span className="font-mono text-sm">{Math.ceil(playerHp)} HP</span>
            </div>
            <div className="gaming-hp-container">
              <div className={`gaming-hp-fill ${playerHp > 60 ? 'hp-high' : playerHp > 30 ? 'hp-med' : 'hp-low'}`}
                style={{ width: `${playerHp}%` }} />
            </div>
          </div>

          {/* Center: Timer + Round */}
          <div className="text-center px-4 flex-shrink-0">
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#222" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none"
                  stroke={timeLeft <= 5 ? '#ff0055' : timeLeft <= 10 ? '#ffcc00' : '#00ffcc'}
                  strokeWidth="3" strokeDasharray={`${timerPct * 0.94} 100`}
                  strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center font-mono font-black text-lg ${timeLeft <= 5 ? 'text-[#ff0055] animate-pulse' : 'text-white'}`}>
                {timeLeft}
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#8a8a99] mt-1">ROUND {currentQuestionIndex + 1}/10</div>
          </div>

          {/* Opponent HP */}
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="font-mono text-sm">{Math.ceil(opponentHp)} HP</span>
              <span className="font-bold text-[#ff0055] tracking-widest text-sm font-[Orbitron] drop-shadow-[0_0_5px_#ff0055]">OPPONENT</span>
            </div>
            <div className="gaming-hp-container">
              <div className={`gaming-hp-fill ${opponentHp > 60 ? 'hp-high' : opponentHp > 30 ? 'hp-med' : 'hp-low'}`}
                style={{ width: `${opponentHp}%` }} />
            </div>
          </div>
        </div>
        {/* Combo indicator */}
        {combo > 1 && (
          <div className="text-center mt-2">
            <span className="text-[#ffcc00] font-[Orbitron] text-xs font-bold animate-pulse">🔥 {combo}x COMBO</span>
          </div>
        )}
      </div>

      {/* Round Result Flash */}
      <AnimatePresence>
        {roundResult && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className={`text-6xl font-[Orbitron] font-black tracking-widest ${roundResult === 'win' ? 'text-[#00ffcc] drop-shadow-[0_0_40px_#00ffcc]' : roundResult === 'loss' ? 'text-[#ff0055] drop-shadow-[0_0_40px_#ff0055]' : 'text-[#ffcc00] drop-shadow-[0_0_40px_#ffcc00]'}`}>
              {roundResult === 'win' ? 'HIT!' : roundResult === 'loss' ? 'MISS!' : 'DRAW!'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!gameOver ? (
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          {/* Question Area */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Question Card */}
            <div className="game-card-3d p-6 md:p-8 flex-1 flex flex-col justify-center bg-black/40">
              <div className="text-[10px] font-mono text-[#00ffcc] mb-3 uppercase tracking-widest flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-[#00ffcc]/10 border border-[#00ffcc]/30 rounded">{q.subject}</span>
                <span className="text-white/20">▸</span>
                <span className="text-[#8a8a99]">{q.topic}</span>
                <span className="text-white/20">▸</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] border ${q.difficulty === 'Hard' ? 'text-[#ff0055] border-[#ff0055]/30 bg-[#ff0055]/10' : q.difficulty === 'Medium' ? 'text-[#ffcc00] border-[#ffcc00]/30 bg-[#ffcc00]/10' : 'text-[#00ffcc] border-[#00ffcc]/30 bg-[#00ffcc]/10'}`}>
                  {q.difficulty}
                </span>
              </div>
              <h2 className="text-xl md:text-3xl leading-relaxed font-bold text-white font-[Space_Grotesk]">{q.body}</h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q.options.map((opt, idx) => {
                let stateClass = "border-white/10 hover:border-[#00ffcc]/40 hover:bg-[#00ffcc]/5";
                if (roundResult) {
                  if (idx === q.correct_idx) stateClass = "border-[#00ffcc] bg-[#00ffcc]/15 shadow-[0_0_15px_rgba(0,255,204,0.2)]";
                  else if (idx === selectedOption) stateClass = "border-[#ff0055] bg-[#ff0055]/15";
                  else stateClass = "border-white/5 opacity-40";
                }
                return (
                  <button key={idx} disabled={!!roundResult} onClick={() => handleAnswer(idx)}
                    className={`text-left p-4 rounded-xl border-2 transition-all font-[Rajdhani] text-base flex items-center gap-3 bg-black/30 backdrop-blur-sm ${stateClass}`}>
                    <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-[Orbitron] text-xs text-[#8a8a99] flex-shrink-0">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="text-white/90">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Side Panel */}
          <div className="w-full md:w-56 flex flex-col gap-3">
            {/* Confidence Wager */}
            <div className="game-card-3d p-4 border-[#a200ff]/30 bg-black/50">
              <h3 className="text-[10px] text-[#a200ff] mb-3 text-center font-[Orbitron] font-bold tracking-widest border-b border-[#a200ff]/20 pb-2">WAGER</h3>
              <div className="flex flex-col gap-2">
                {[
                  { level: 'high', label: 'HIGH RISK', mult: '×2.0', color: '#ff0055' },
                  { level: 'med', label: 'BALANCED', mult: '×1.0', color: '#ffcc00' },
                  { level: 'low', label: 'SAFE', mult: '×0.5', color: '#00ffcc' },
                ].map(({ level, label, mult, color }) => (
                  <button key={level} onClick={() => setConfidence(level)} disabled={!!roundResult}
                    className={`py-2.5 rounded-lg text-[10px] font-bold tracking-wider border transition-all font-[Orbitron] ${confidence === level ? `border-[${color}] text-[${color}]` : 'border-white/10 text-white/40 hover:border-white/20'}`}
                    style={confidence === level ? { borderColor: color, color: color, background: `${color}15` } : {}}>
                    {label} <span className="opacity-60">{mult}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {roundResult && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="game-card-3d p-4 border-[#00ffcc]/30 bg-[#00ffcc]/5">
                  <h4 className="text-[#00ffcc] text-[10px] mb-2 font-bold tracking-widest font-[Orbitron]">📡 INTEL</h4>
                  <p className="text-xs font-[Rajdhani] text-white/80 leading-relaxed">{q.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex items-center justify-center py-8">
          <div className="game-card-3d p-8 text-center max-w-2xl w-full relative overflow-hidden"
            style={{ borderColor: playerHp > 0 ? '#00ffcc50' : '#ff005550' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: `radial-gradient(circle, ${playerHp > 0 ? '#00ffcc' : '#ff0055'}, transparent)` }} />
            <div className="relative z-10">
              <div className="text-6xl mb-2">{playerHp > 0 ? '🏆' : '💀'}</div>
              <h1 className="text-4xl md:text-5xl mb-1 font-[Orbitron] font-black tracking-widest"
                style={{ color: playerHp > 0 ? '#00ffcc' : '#ff0055' }}>
                {playerHp > 0 ? 'VICTORY' : 'DEFEAT'}
              </h1>
              <div className="flex justify-center gap-4 mb-8">
                <span className="font-mono text-sm py-1.5 px-3 rounded border border-white/10 bg-black/30 flex items-center gap-2"
                  style={{ color: playerHp > 0 ? '#00ffcc' : '#ff0055' }}>
                  <span className="text-xs text-[#8a8a99]">ELO</span>
                  {playerHp > 0 ? '+24' : '-18'}
                </span>
                <span className="font-mono text-sm py-1.5 px-3 rounded border border-white/10 bg-black/30 flex items-center gap-2 text-[#a200ff]">
                  <span className="text-xs text-[#8a8a99]">XP</span>
                  {playerHp > 0 ? '+150' : '+50'}
                </span>
              </div>

              {/* Match Overview Stats */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-[Orbitron] text-white/80 text-sm tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                  <span className="text-[#a200ff]">📊</span> COMBAT ANALYSIS
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/50 p-3 rounded border border-white/5">
                    <div className="text-[10px] font-mono text-[#8a8a99]">ACCURACY</div>
                    <div className="text-xl font-[Orbitron] text-[#00ffcc] font-bold">
                      {Math.max(1, matchStats.correctAnswers + matchStats.wrongAnswers) > 1 
                        ? Math.round((matchStats.correctAnswers / (matchStats.correctAnswers + matchStats.wrongAnswers)) * 100) 
                        : 0}%
                    </div>
                  </div>
                  <div className="bg-black/50 p-3 rounded border border-white/5">
                    <div className="text-[10px] font-mono text-[#8a8a99]">MAX COMBO</div>
                    <div className="text-xl font-[Orbitron] text-[#ffcc00] font-bold">{matchStats.maxCombo}x</div>
                  </div>
                  <div className="bg-black/50 p-3 rounded border border-white/5">
                    <div className="text-[10px] font-mono text-[#8a8a99]">DMG DEALT</div>
                    <div className="text-xl font-[Orbitron] text-[#ff0055] font-bold">{Math.round(matchStats.damageDealt)}</div>
                  </div>
                  <div className="bg-black/50 p-3 rounded border border-white/5">
                    <div className="text-[10px] font-mono text-[#8a8a99]">TIMEOUTS</div>
                    <div className="text-xl font-[Orbitron] text-white/60 font-bold">{matchStats.timeOuts}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 max-w-md mx-auto">
                <button onClick={() => { 
                  resetBattle(); 
                  setQuestions(getRandomQuestions(10)); 
                  setGameOver(false); 
                  setTimeLeft(20); 
                  setMatchStats({ correctAnswers: 0, wrongAnswers: 0, maxCombo: 0, damageDealt: 0, timeOuts: 0 });
                }}
                  className="btn-action flex-1 text-sm py-4">REMATCH</button>
                <button onClick={() => navigate('/dashboard')} className="btn-action-purple flex-1 text-sm py-4">RETURN TO HUB</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Battle1v1;
