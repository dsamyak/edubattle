export default function IntroScreen({
  onStartLearning, onStartPractice, onStartChallenge,
  learningComplete, practiceComplete, audioEnabled, onToggleAudio
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 24, textAlign: 'center', gap: 8 }}>
      {/* Audio toggle */}
      <button onClick={onToggleAudio} className="btn btn-sm btn-outline"
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 100 }}>
        {audioEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
      </button>

      {/* Curriculum badge */}
      <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '8px 24px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>
        ✨ Singapore MOE Curriculum · Grade 1
      </div>

      {/* Title */}
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: 0, lineHeight: 1.2 }}>
        Reading &amp; Writing{' '}
        <span style={{ color: 'var(--gold)' }}>Numbers</span>
      </h1>

      {/* Mascot */}
      <div className="mascot-container">
        <div className="mascot">🐻</div>
        <div className="speech-bubble">
          Let's learn numbers together! 🎉
        </div>
      </div>

      {/* Description */}
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 500, lineHeight: 1.6 }}>
        Learn to read, write, and spell numbers 0–100 with fun simulations and interactive activities!
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn-secondary btn-lg" onClick={onStartLearning} id="start-learning-btn">
          📖 Start Learning
        </button>
        <button className="btn btn-primary btn-lg" onClick={onStartPractice} id="start-practice-btn"
          style={!learningComplete ? { opacity: 0.6 } : {}}>
          🎮 Practice
        </button>
      </div>

      {/* Feature cards */}
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-card-icon">🔢</div>
          <div className="feature-card-label">Count &amp; Spell</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🧱</div>
          <div className="feature-card-label">Simulations</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🏆</div>
          <div className="feature-card-label">100 Questions</div>
        </div>
      </div>

      {/* Completion indicators */}
      {learningComplete && (
        <div style={{ marginTop: 16, color: 'var(--green-light)', fontSize: '0.9rem', fontWeight: 600 }}>
          ✅ Learning Complete
        </div>
      )}
      {practiceComplete && (
        <div style={{ color: 'var(--green-light)', fontSize: '0.9rem', fontWeight: 600 }}>
          ✅ Practice Complete
        </div>
      )}
    </div>
  );
}
