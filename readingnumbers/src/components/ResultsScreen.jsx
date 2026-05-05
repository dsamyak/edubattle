export default function ResultsScreen({ score, totalAnswered, xp, maxStreak, badges, earnedBadges, practiceScore, onRestart, onGoHome }) {
  const pct = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;

  return (
    <div className="results-container" style={{ minHeight: '100vh', justifyContent: 'center', padding: '80px 24px' }}>
      {/* Mascot celebration */}
      <div className="mascot-container">
        <div className="mascot happy" style={{ width: 100, height: 100, fontSize: '2.8rem' }}>🐻</div>
        <div className="speech-bubble">
          {pct >= 80 ? 'Incredible work! 🏆' : pct >= 50 ? 'Great effort! 💪' : 'Keep practicing! 📚'}
        </div>
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700 }}>
        Challenge Complete!
      </h1>

      {/* Score circle */}
      <div className="score-circle">
        <span className="score-number">{pct}%</span>
        <span className="score-label">{score}/{totalAnswered}</span>
      </div>

      {/* Stars */}
      <div style={{ fontSize: '2.5rem', display: 'flex', gap: 8 }}>
        {[1, 2, 3].map(i => (
          <span key={i} style={{ opacity: i <= stars ? 1 : 0.2, animation: i <= stars ? `bounceIn ${0.3 + i * 0.15}s ease` : 'none' }}>⭐</span>
        ))}
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: '100%', maxWidth: 500 }}>
        <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold)' }}>{xp}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>XP Earned</div>
        </div>
        <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--coral)' }}>🔥 {maxStreak}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Max Streak</div>
        </div>
        <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--green-light)' }}>{practiceScore}/10</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Practice</div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 12, color: 'var(--text-secondary)' }}>Badges</h3>
        <div className="badge-display">
          {badges.map(b => (
            <div key={b.id} className={`badge ${earnedBadges.includes(b.id) ? 'earned' : 'locked'}`}>
              <span className="badge-icon">{b.icon}</span>
              <span className="badge-label">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn-primary btn-lg" onClick={onRestart}>🔄 Play Again</button>
        <button className="btn btn-secondary" onClick={onGoHome}>🏠 Home</button>
      </div>
    </div>
  );
}
