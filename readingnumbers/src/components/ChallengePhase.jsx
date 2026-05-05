import { useState, useMemo, useCallback } from 'react';
import { generateQuestionBank } from '../utils/questionBank';
import { speak, sounds } from '../utils/audio';
import QuestionRenderer from './QuestionRenderer';

function calculateXP(attempt, hintsUsed, streak) {
  const base = attempt === 1 ? 10 : hintsUsed === 0 ? 7 : 5;
  const bonus = streak >= 5 ? 5 : 0;
  return base + bonus;
}

export default function ChallengePhase({ onComplete, audioEnabled }) {
  const questions = useMemo(() => generateQuestionBank(), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [xpPopup, setXpPopup] = useState(null);
  const [attempt, setAttempt] = useState(1);
  const [wordCorrect, setWordCorrect] = useState(0);

  const q = questions[index];
  const total = questions.length;
  const pct = Math.round(((index) / total) * 100);
  const diffLabel = q?.difficulty === 1 ? 'easy' : q?.difficulty === 2 ? 'medium' : 'hard';

  const advance = useCallback(() => {
    setFeedback(null);
    setAnswered(false);
    setAttempt(1);
    if (index + 1 < total && lives > 0) {
      setIndex(i => i + 1);
    } else {
      onComplete({ score, xp, maxStreak, wordCorrect, totalAnswered: index + 1 });
    }
  }, [index, total, lives, score, xp, maxStreak, wordCorrect, onComplete]);

  const handleAnswer = useCallback((isCorrect) => {
    setAnswered(true);
    if (isCorrect) {
      const newStreak = streak + 1;
      const earned = calculateXP(attempt, 0, newStreak);
      setScore(s => s + 1);
      setStreak(newStreak);
      setMaxStreak(ms => Math.max(ms, newStreak));
      setXp(x => x + earned);
      if (q.type === 'numeral_to_word' || q.type === 'word_to_numeral' || q.type === 'match_numeral_word') {
        setWordCorrect(w => w + 1);
      }
      sounds.correct();
      if (newStreak >= 5 && newStreak % 5 === 0) sounds.streak();
      setXpPopup(`+${earned} XP`);
      setTimeout(() => setXpPopup(null), 1500);
      setFeedback({ type: 'correct', message: newStreak >= 5 ? `🔥 ${newStreak} Streak!` : 'Correct! 🎉', sub: q.explanation });
      setTimeout(advance, 1800);
    } else {
      setStreak(0);
      setLives(l => l - 1);
      sounds.wrong();
      setFeedback({ type: 'wrong', message: 'Not quite!', sub: q.explanation });
      if (lives - 1 <= 0) {
        setTimeout(() => onComplete({ score, xp, maxStreak, wordCorrect, totalAnswered: index + 1 }), 2000);
      } else {
        setTimeout(advance, 2000);
      }
    }
  }, [streak, attempt, q, advance, lives, score, xp, maxStreak, wordCorrect, index, onComplete]);

  if (!q) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 40px', width: '100%', minHeight: '100vh' }}>
      {/* HUD */}
      <div className="hud">
        <div className="hud-item">⭐ {xp}</div>
        <div className="hearts">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} style={{ opacity: i < lives ? 1 : 0.2 }}>❤️</span>
          ))}
        </div>
        <div className={`hud-item ${streak >= 5 ? 'streak-fire' : ''}`}>
          🔥 {streak}x
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 700, marginBottom: 16 }}>
        <div className="progress-bar-container">
          <div className="progress-bar-label">
            <span>Question {index + 1}/{total}</span>
            <span>{pct}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="question-card" style={{ animation: 'slideUp 0.3s ease' }}>
        <span className={`difficulty-badge ${diffLabel}`}>{diffLabel.toUpperCase()}</span>
        <QuestionRenderer question={q} onAnswer={handleAnswer} disabled={answered} />
      </div>

      {/* XP popup */}
      {xpPopup && <div className="xp-popup">{xpPopup}</div>}

      {/* Feedback overlay */}
      {feedback && (
        <div className="feedback-overlay">
          <div className={`feedback-content ${feedback.type}`}>
            <div className="feedback-emoji">{feedback.type === 'correct' ? '🎉' : '😢'}</div>
            <div className="feedback-message">{feedback.message}</div>
            <div className="feedback-sub">{feedback.sub}</div>
          </div>
        </div>
      )}
    </div>
  );
}
