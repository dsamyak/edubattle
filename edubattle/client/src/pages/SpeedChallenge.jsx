import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomQuestions } from '../data/questions';

const SpeedChallenge = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for blitz
  const [gameOver, setGameOver] = useState(false);
  const [flashColor, setFlashColor] = useState(null); // for correct/incorrect flash

  useEffect(() => {
    // We get 50 random questions for blitz mode
    setQuestions(getRandomQuestions(50));
  }, []);

  useEffect(() => {
    if (gameOver || questions.length === 0) return;
    
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, questions]);

  const handleAnswer = (idx) => {
    const isCorrect = idx === questions[currentIndex].correct_idx;
    
    if (isCorrect) {
      setScore(s => s + 100);
      setFlashColor('bg-[#00ffcc]/20');
    } else {
      setScore(s => Math.max(0, s - 50)); // Penalty for wrong
      setFlashColor('bg-[#ff0055]/20');
    }

    setTimeout(() => setFlashColor(null), 200);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setGameOver(true);
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className={`max-w-4xl mx-auto h-[80vh] flex flex-col transition-colors duration-200 ${flashColor || ''}`}>
      {!gameOver ? (
        <>
          <div className="flex justify-between items-center mb-8 bg-black/40 p-4 border border-white/10 rounded-lg">
            <div className="text-3xl font-display text-[#00ffcc]">SCORE: {score}</div>
            <div className={`text-5xl font-mono font-bold ${timeLeft <= 10 ? 'text-[#ff0055] animate-pulse' : 'text-white'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
            <div className="text-xl font-mono text-[#a200ff]">Q: {currentIndex + 1}/50</div>
          </div>

          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <div className="cyber-card p-8 mb-6 flex-1 flex flex-col justify-center text-center">
                  <h2 className="text-3xl leading-relaxed">{questions[currentIndex].body}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="text-left p-6 rounded-lg border-2 border-white/10 hover:border-[#a200ff]/50 hover:bg-[#a200ff]/5 transition-all font-mono text-lg"
                    >
                      <span className="text-[#8a8a99] mr-4">{['A', 'B', 'C', 'D'][idx]}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="cyber-card p-12 text-center max-w-lg w-full border-[#00ffcc]/50">
            <h1 className="text-5xl mb-4 font-display text-[#00ffcc] glitch" data-text="TIME'S UP!">
              TIME'S UP!
            </h1>
            <p className="font-mono text-2xl mb-8">FINAL SCORE: <span className="text-white font-bold">{score}</span></p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setQuestions(getRandomQuestions(50));
                  setCurrentIndex(0);
                  setScore(0);
                  setTimeLeft(60);
                  setGameOver(false);
                }}
                className="btn-neon flex-1"
              >
                RETRY
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-neon-purple flex-1"
              >
                HUB
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpeedChallenge;
