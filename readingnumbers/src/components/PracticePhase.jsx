import { useState, useEffect, useMemo, useCallback } from 'react';
import { generatePracticeSet } from '../utils/questionBank';
import { speak, sounds } from '../utils/audio';
import QuestionRenderer from './QuestionRenderer';

export default function PracticePhase({ onComplete, audioEnabled }) {
  const questions = useMemo(() => generatePracticeSet(), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);

  const q = questions[index];
  const total = questions.length;
  const pct = Math.round(((index) / total) * 100);

  const handleAnswer = useCallback((isCorrect) => {
    setAnswered(true);
    if (isCorrect) {
      setScore(s => s + 1);
      sounds.correct();
      speak('Correct! Well done!', audioEnabled);
      setFeedback({ type: 'correct', message: 'Amazing! 🎉', sub: q.explanation });
    } else {
      sounds.wrong();
      if (hintLevel < 2) {
        setHintLevel(h => h + 1);
        setHintsUsed(h => h + 1);
        setFeedback({ type: 'wrong', message: 'Not quite! 🤔', sub: hintLevel === 0 ? q.hint1 : q.hint2 });
        setAnswered(false);
        return;
      }
      setFeedback({ type: 'wrong', message: 'Let\'s learn from this!', sub: q.explanation });
    }
    setTimeout(() => {
      setFeedback(null);
      setHintLevel(0);
      setAnswered(false);
      if (index + 1 < total) {
        setIndex(i => i + 1);
      } else {
        onComplete(score + (isCorrect ? 1 : 0));
      }
    }, 2000);
  }, [index, total, score, hintLevel, q, audioEnabled, onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 40px', width: '100%', minHeight: '100vh' }}>
      {/* Mascot */}
      <div className="mascot-container" style={{ marginBottom: 8 }}>
        <div className={`mascot ${feedback?.type === 'correct' ? 'happy' : feedback?.type === 'wrong' ? 'thinking' : ''}`}>🐻</div>
        <div className="speech-bubble">
          {feedback ? (feedback.type === 'correct' ? 'Great job! 🎉' : 'Try again! 💪') : 'You can do it! 📚'}
        </div>
      </div>

      {/* Progress */}
      <div style={{ width: '100%', maxWidth: 700 }}>
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

      {/* Hint display */}
      {hintLevel > 0 && !feedback && (
        <div className="hint-text" style={{ margin: '12px 0' }}>
          💡 {hintLevel === 1 ? q.hint1 : q.hint2}
        </div>
      )}

      {/* Question */}
      <div style={{ marginTop: 16, width: '100%', maxWidth: 700 }}>
        <QuestionRenderer
          question={q}
          onAnswer={handleAnswer}
          disabled={answered}
          showHint={hintLevel > 0}
        />
      </div>

      {/* Feedback overlay */}
      {feedback && (
        <div className="feedback-overlay" onClick={() => {}}>
          <div className={`feedback-content ${feedback.type}`}>
            <div className="feedback-emoji">{feedback.type === 'correct' ? '🎉' : '💡'}</div>
            <div className="feedback-message">{feedback.message}</div>
            <div className="feedback-sub">{feedback.sub}</div>
          </div>
        </div>
      )}
    </div>
  );
}
