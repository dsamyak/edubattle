import { useState, useCallback, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import LearningPhase from './components/LearningPhase';
import PracticePhase from './components/PracticePhase';
import ChallengePhase from './components/ChallengePhase';
import ResultsScreen from './components/ResultsScreen';
import FloatingNumbers from './components/FloatingNumbers';

const STORAGE_KEY = 'intellia_rw_numbers_v1';

const BADGES = [
  { id: 'number_newbie', label: 'Number Newbie', icon: '🏅', condition: (s) => s.learningComplete },
  { id: 'practice_pro', label: 'Practice Pro', icon: '🥈', condition: (s) => s.practiceComplete },
  { id: 'number_master', label: 'Number Master', icon: '🥇', condition: (s) => s.challengeScore >= 80 },
  { id: 'perfect_speller', label: 'Perfect Speller', icon: '💎', condition: (s) => s.wordCorrect >= 20 },
  { id: 'streak_star', label: 'Streak Star', icon: '🔥', condition: (s) => s.maxStreak >= 10 },
  { id: 'century_champ', label: 'Century Champ', icon: '👑', condition: (s) => s.challengeScore === 100 },
];

function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data && (Date.now() - data.timestamp) < 24 * 60 * 60 * 1000) return data;
  } catch (e) { /* fresh start */ }
  return null;
}

function saveProgress(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, timestamp: Date.now() }));
}

export default function App() {
  const [phase, setPhase] = useState('intro');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [learningComplete, setLearningComplete] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [badges, setBadges] = useState([]);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeXP, setChallengeXP] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [wordCorrect, setWordCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);

  // Check and unlock badges
  const checkBadges = useCallback((state) => {
    const newBadges = BADGES.filter(b => b.condition(state)).map(b => b.id);
    setBadges(prev => {
      const merged = [...new Set([...prev, ...newBadges])];
      return merged;
    });
  }, []);

  const goHome = useCallback(() => setPhase('intro'), []);

  const handleLearningComplete = useCallback(() => {
    setLearningComplete(true);
    checkBadges({ learningComplete: true, practiceComplete, challengeScore, maxStreak, wordCorrect });
    setPhase('practice');
  }, [practiceComplete, challengeScore, maxStreak, wordCorrect, checkBadges]);

  const handlePracticeComplete = useCallback((score) => {
    setPracticeComplete(true);
    setPracticeScore(score);
    checkBadges({ learningComplete: true, practiceComplete: true, challengeScore, maxStreak, wordCorrect });
    setPhase('challenge');
  }, [challengeScore, maxStreak, wordCorrect, checkBadges]);

  const handleChallengeComplete = useCallback((stats) => {
    setChallengeScore(stats.score);
    setChallengeXP(stats.xp);
    setMaxStreak(stats.maxStreak);
    setWordCorrect(stats.wordCorrect || 0);
    setTotalAnswered(stats.totalAnswered);
    const state = {
      learningComplete: true, practiceComplete: true,
      challengeScore: stats.score, maxStreak: stats.maxStreak, wordCorrect: stats.wordCorrect || 0,
    };
    checkBadges(state);
    saveProgress({ phase: 'results', badges, ...state, challengeXP: stats.xp });
    setPhase('results');
  }, [badges, checkBadges]);

  const handleRestart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setPhase('intro');
    setLearningComplete(false);
    setPracticeComplete(false);
    setBadges([]);
    setChallengeScore(0);
    setChallengeXP(0);
    setMaxStreak(0);
  }, []);

  return (
    <>
      <FloatingNumbers />
      <div className="app-container">
        {phase !== 'intro' && (
          <button className="home-btn" onClick={goHome} aria-label="Go home">
            🏠 Home
          </button>
        )}

        {phase === 'intro' && (
          <IntroScreen
            onStartLearning={() => setPhase('learn')}
            onStartPractice={() => setPhase(learningComplete ? 'practice' : 'learn')}
            onStartChallenge={() => setPhase(practiceComplete ? 'challenge' : learningComplete ? 'practice' : 'learn')}
            learningComplete={learningComplete}
            practiceComplete={practiceComplete}
            audioEnabled={audioEnabled}
            onToggleAudio={() => setAudioEnabled(a => !a)}
          />
        )}

        {phase === 'learn' && (
          <LearningPhase
            onComplete={handleLearningComplete}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'practice' && (
          <PracticePhase
            onComplete={handlePracticeComplete}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'challenge' && (
          <ChallengePhase
            onComplete={handleChallengeComplete}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'results' && (
          <ResultsScreen
            score={challengeScore}
            totalAnswered={totalAnswered}
            xp={challengeXP}
            maxStreak={maxStreak}
            badges={BADGES}
            earnedBadges={badges}
            practiceScore={practiceScore}
            onRestart={handleRestart}
            onGoHome={goHome}
          />
        )}
      </div>
    </>
  );
}
