import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBattleStore } from '../stores/useBattleStore';
import { getRandomQuestions } from '../data/questions';

const Battle1v1 = () => {
  const navigate = useNavigate();
  const { playerHp, opponentHp, takeDamage, dealDamage, currentQuestionIndex, nextQuestion, resetBattle } = useBattleStore();
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [confidence, setConfidence] = useState('med'); // low, med, high
  const [selectedOption, setSelectedOption] = useState(null);
  const [roundResult, setRoundResult] = useState(null); // 'win', 'loss', 'draw'
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Load 10 random questions on mount
    setQuestions(getRandomQuestions(10));
    return () => resetBattle();
  }, [resetBattle]);

  useEffect(() => {
    if (gameOver || roundResult) return;
    
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    } else {
      handleTimeOut();
    }
  }, [timeLeft, gameOver, roundResult]);

  useEffect(() => {
    if (playerHp <= 0 || opponentHp <= 0 || currentQuestionIndex >= 10) {
      setGameOver(true);
    }
  }, [playerHp, opponentHp, currentQuestionIndex]);

  const handleTimeOut = () => {
    setRoundResult('loss');
    takeDamage(10); // Penalty for timeout
    finishRound();
  };

  const handleAnswer = (idx) => {
    if (roundResult) return;
    setSelectedOption(idx);
    
    const q = questions[currentQuestionIndex];
    const isCorrect = idx === q.correct_idx;
    
    // Simulate opponent answer (random timing, 70% accuracy)
    const opCorrect = Math.random() > 0.3;
    
    // Confidence Multiplier
    const mult = confidence === 'high' ? 2 : confidence === 'low' ? 0.5 : 1;
    const baseDmg = 15;
    
    if (isCorrect && !opCorrect) {
      setRoundResult('win');
      dealDamage(baseDmg * mult);
    } else if (!isCorrect && opCorrect) {
      setRoundResult('loss');
      takeDamage(baseDmg * mult);
    } else if (isCorrect && opCorrect) {
      setRoundResult('draw');
      // No damage
    } else {
      setRoundResult('loss');
      // Both wrong
      takeDamage(baseDmg * mult * 0.5);
    }

    finishRound();
  };

  const finishRound = () => {
    setTimeout(() => {
      if (!gameOver) {
        setRoundResult(null);
        setSelectedOption(null);
        setTimeLeft(20);
        nextQuestion();
      }
    }, 3000);
  };

  if (questions.length === 0) return <div>Loading arena...</div>;
  
  const q = questions[currentQuestionIndex];

  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex flex-col">
      {/* Top HUD */}
      <div className="flex justify-between items-center mb-8 bg-black/40 p-4 border border-white/10 rounded-lg">
        {/* Player 1 */}
        <div className="w-1/3">
          <div className="flex justify-between mb-2">
            <span className="font-bold text-[#00ffcc]">YOU</span>
            <span className="font-mono text-sm">{Math.ceil(playerHp)} HP</span>
          </div>
          <div className="hp-bar-container">
            <div 
              className={`hp-bar-fill ${playerHp > 60 ? 'high' : playerHp > 30 ? 'med' : 'low'}`}
              style={{ width: `${playerHp}%` }}
            />
          </div>
        </div>

        {/* Timer & Round */}
        <div className="text-center w-1/4">
          <div className="text-3xl font-display font-bold text-white mb-1">
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-mono text-[#8a8a99]">
            ROUND {currentQuestionIndex + 1}/10
          </div>
        </div>

        {/* Player 2 */}
        <div className="w-1/3">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-sm">{Math.ceil(opponentHp)} HP</span>
            <span className="font-bold text-[#ff0055]">OPPONENT</span>
          </div>
          <div className="hp-bar-container" style={{ transform: 'scaleX(-1)' }}>
            <div 
              className={`hp-bar-fill ${opponentHp > 60 ? 'high' : opponentHp > 30 ? 'med' : 'low'}`}
              style={{ width: `${opponentHp}%` }}
            />
          </div>
        </div>
      </div>

      {!gameOver ? (
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          {/* Main Question Area */}
          <div className="flex-1 flex flex-col">
            <div className="cyber-card p-8 mb-6 flex-1 flex flex-col justify-center">
              <div className="text-xs font-mono text-[#00ffcc] mb-4 uppercase tracking-widest">
                {q.subject} // {q.topic} // {q.difficulty}
              </div>
              <h2 className="text-2xl md:text-3xl leading-relaxed mb-8">{q.body}</h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((opt, idx) => {
                let stateClass = "border-white/10 hover:border-[#00ffcc]/50 hover:bg-[#00ffcc]/5";
                if (roundResult) {
                  if (idx === q.correct_idx) stateClass = "border-[#00ffcc] bg-[#00ffcc]/20 shadow-[0_0_15px_rgba(0,255,204,0.3)]";
                  else if (idx === selectedOption) stateClass = "border-[#ff0055] bg-[#ff0055]/20";
                  else stateClass = "border-white/5 opacity-50";
                }

                return (
                  <button
                    key={idx}
                    disabled={!!roundResult}
                    onClick={() => handleAnswer(idx)}
                    className={`text-left p-6 rounded-lg border-2 transition-all font-mono text-lg ${stateClass}`}
                  >
                    <span className="text-[#8a8a99] mr-4">{['A', 'B', 'C', 'D'][idx]}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Side Strategy Panel */}
          <div className="w-full md:w-64 flex flex-col gap-4">
            <div className="cyber-card p-4 border-[#a200ff]/30">
              <h3 className="text-sm text-[#a200ff] mb-4 text-center">WAGER CONFIDENCE</h3>
              <div className="flex flex-col gap-2">
                {['high', 'med', 'low'].map(level => (
                  <button
                    key={level}
                    onClick={() => setConfidence(level)}
                    disabled={!!roundResult}
                    className={`py-3 rounded text-xs font-bold uppercase tracking-wider border transition-colors
                      ${confidence === level 
                        ? (level === 'high' ? 'bg-[#ff0055]/20 border-[#ff0055] text-[#ff0055]' : 
                           level === 'med' ? 'bg-[#ffcc00]/20 border-[#ffcc00] text-[#ffcc00]' : 
                           'bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc]')
                        : 'border-white/10 text-white/50 hover:border-white/30'
                      }
                    `}
                  >
                    {level} (x{level === 'high' ? '2.0' : level === 'med' ? '1.0' : '0.5'} DMG)
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation Area (Shows after answer) */}
            <AnimatePresence>
              {roundResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="cyber-card p-4 border-[#00ffcc]/30 bg-[#00ffcc]/5"
                >
                  <h4 className="text-[#00ffcc] text-xs mb-2">SYSTEM LOG</h4>
                  <p className="text-sm font-mono text-white/80">{q.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Game Over Screen */
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="cyber-card p-12 text-center max-w-lg w-full border-[#00ffcc]/50">
            <h1 className="text-5xl mb-2 font-display">
              {playerHp > 0 ? (
                <span className="text-[#00ffcc] glitch" data-text="VICTORY">VICTORY</span>
              ) : (
                <span className="text-[#ff0055] glitch" data-text="DEFEAT">DEFEAT</span>
              )}
            </h1>
            <p className="font-mono text-[#8a8a99] mb-8">
              {playerHp > 0 ? '+24 ELO RATING GAINED' : '-18 ELO RATING LOST'}
            </p>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn-neon w-full"
            >
              RETURN TO HUB
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Battle1v1;
