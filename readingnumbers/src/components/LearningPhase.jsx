import { useState, useCallback } from 'react';
import { numberToWord } from '../utils/numberWords';
import { speak } from '../utils/audio';

const STATIONS = [
  { id: 0, title: 'Numbers 0–10', subtitle: 'Ten-Frame Counting', icon: '🔢' },
  { id: 1, title: 'Numbers 11–20', subtitle: 'Teen Numbers', icon: '🔟' },
  { id: 2, title: 'Numbers 21–100', subtitle: 'Base-10 Blocks', icon: '🧱' },
  { id: 3, title: 'Number Words', subtitle: 'Numeral ↔ Word Matching', icon: '📝' },
];

// ─── Station 1: Ten-Frame (0–10) ───
function Station1({ audioEnabled, onNext }) {
  const [filled, setFilled] = useState(0);
  const toggle = (i) => {
    const next = i < filled ? i : i + 1;
    setFilled(Math.min(10, Math.max(0, next)));
    speak(numberToWord(next), audioEnabled);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>Counting 0 to 10</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
        Click the squares to add counters. Each filled square = <strong style={{ color: 'var(--gold)' }}>1</strong>!
      </p>
      <div className="number-display">
        <span className="big-number">{filled}</span>
        <span className="number-word">{numberToWord(filled)}</span>
      </div>
      <div className="ten-frame">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className={`ten-frame-cell ${i < filled ? 'filled' : ''}`}
            onClick={() => toggle(i)} role="button" tabIndex={0}
            aria-label={`Cell ${i + 1}, ${i < filled ? 'filled' : 'empty'}`}>
            {i < filled ? '⭐' : ''}
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '12px 0' }}>
        Fill the frame from left to right, top to bottom
      </p>
      <button className="btn btn-primary" onClick={onNext} style={{ marginTop: 16 }}>
        Next Station →
      </button>
    </div>
  );
}

// ─── Station 2: Teen Numbers (11–20) ───
function Station2({ audioEnabled, onNext }) {
  const [ones, setOnes] = useState(1);
  const num = 10 + ones;
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>Teen Numbers: 11 to 20</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
        <strong style={{ color: 'var(--gold)' }}>1 ten</strong> and <strong style={{ color: 'var(--gold)' }}>{ones} one{ones !== 1 ? 's' : ''}</strong> = {num}
      </p>
      <div className="number-display">
        <span className="big-number">{num}</span>
        <span className="number-word">{numberToWord(num)}</span>
      </div>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-end', margin: '20px 0' }}>
        {/* Full ten-frame */}
        <div>
          <div className="column-label">1 Ten</div>
          <div className="ten-frame" style={{ maxWidth: 200 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="ten-frame-cell filled" style={{ width: 32, height: 32 }}>⭐</div>
            ))}
          </div>
        </div>
        {/* Ones section */}
        <div>
          <div className="column-label">{ones} One{ones !== 1 ? 's' : ''}</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 100 }}>
            {Array.from({ length: ones }, (_, i) => (
              <div key={i} className="ten-frame-cell filled" style={{ width: 32, height: 32 }}>⭐</div>
            ))}
          </div>
        </div>
      </div>
      <div className="blocks-controls">
        <button className="block-control-btn" onClick={() => { const n = Math.max(1, ones - 1); setOnes(n); speak(numberToWord(10 + n), audioEnabled); }}>−</button>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, minWidth: 40, textAlign: 'center' }}>{ones}</span>
        <button className="block-control-btn" onClick={() => { const n = Math.min(10, ones + 1); setOnes(n); speak(numberToWord(10 + n), audioEnabled); }}>+</button>
      </div>
      <button className="btn btn-primary" onClick={onNext} style={{ marginTop: 20 }}>Next Station →</button>
    </div>
  );
}

// ─── Station 3: Base-10 Blocks (21–100) ───
function Station3({ audioEnabled, onNext }) {
  const [tens, setTens] = useState(2);
  const [ones, setOnes] = useState(1);
  const num = tens * 10 + ones;
  const safeNum = Math.min(num, 100);
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>Base-10 Blocks: 21 to 100</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
        Use the controls to build numbers with <strong style={{ color: '#ff9800' }}>tens sticks</strong> and <strong style={{ color: '#42a5f5' }}>unit cubes</strong>.
      </p>
      <div className="place-value-chart">
        <div className="pv-column">
          <span className="pv-label">Tens</span>
          <span className="pv-value" style={{ color: '#ff9800' }}>{tens}</span>
        </div>
        <div className="pv-column">
          <span className="pv-label">Ones</span>
          <span className="pv-value" style={{ color: '#42a5f5' }}>{ones}</span>
        </div>
        <div className="pv-column">
          <span className="pv-label">=</span>
          <span className="pv-value" style={{ color: 'var(--gold)' }}>{safeNum}</span>
        </div>
      </div>
      <div className="blocks-area">
        <div className="tens-column">
          <div className="column-label">Tens</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: tens }, (_, i) => <div key={i} className="ten-stick" />)}
          </div>
        </div>
        <div className="ones-column">
          <div className="column-label">Ones</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 120 }}>
            {Array.from({ length: ones }, (_, i) => <div key={i} className="unit-cube" />)}
          </div>
        </div>
      </div>
      <div className="blocks-controls" style={{ marginTop: 12 }}>
        <div className="block-control-group">
          <span style={{ fontSize: '0.8rem', color: '#ff9800', fontWeight: 700 }}>TENS</span>
          <button className="block-control-btn" onClick={() => { setTens(t => Math.max(0, t - 1)); speak(numberToWord(Math.max(0, tens - 1) * 10 + ones), audioEnabled); }}>−</button>
          <button className="block-control-btn" onClick={() => { setTens(t => Math.min(10, t + 1)); speak(numberToWord(Math.min(10, tens + 1) * 10 + ones), audioEnabled); }}>+</button>
        </div>
        <div className="block-control-group">
          <span style={{ fontSize: '0.8rem', color: '#42a5f5', fontWeight: 700 }}>ONES</span>
          <button className="block-control-btn" onClick={() => { setOnes(o => Math.max(0, o - 1)); speak(numberToWord(tens * 10 + Math.max(0, ones - 1)), audioEnabled); }}>−</button>
          <button className="block-control-btn" onClick={() => { setOnes(o => Math.min(9, o + 1)); speak(numberToWord(tens * 10 + Math.min(9, ones + 1)), audioEnabled); }}>+</button>
        </div>
      </div>
      <div style={{ marginTop: 12, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        <strong style={{ color: 'var(--gold)' }}>{numberToWord(safeNum)}</strong>
      </div>
      <button className="btn btn-primary" onClick={onNext} style={{ marginTop: 16 }}>Next Station →</button>
    </div>
  );
}

// ─── Station 4: Number Word Matching ───
function Station4({ audioEnabled, onComplete }) {
  const nums = [3, 7, 15, 42, 68, 91];
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const numerals = nums.map(n => ({ type: 'numeral', value: String(n), num: n }));
  const words = nums.map(n => ({ type: 'word', value: numberToWord(n), num: n }));
  const allCards = [...numerals, ...words].sort(() => Math.random() - 0.5);
  const [cards] = useState(allCards);
  const [wrongPair, setWrongPair] = useState(null);

  const handleClick = (card, idx) => {
    if (matched.includes(card.num)) return;
    if (selected === null) {
      setSelected({ ...card, idx });
      return;
    }
    if (selected.idx === idx) { setSelected(null); return; }
    if (selected.type === card.type) { setSelected({ ...card, idx }); return; }
    if (selected.num === card.num) {
      setMatched(m => [...m, card.num]);
      speak(`${card.num}, ${numberToWord(card.num)}`, audioEnabled);
      setSelected(null);
    } else {
      setWrongPair([selected.idx, idx]);
      setTimeout(() => setWrongPair(null), 500);
      setSelected(null);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>Match Numerals to Words</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
        Click a numeral, then click its matching word!
      </p>
      <div className="matching-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 600 }}>
        {cards.map((card, i) => (
          <div key={i}
            className={`match-card ${matched.includes(card.num) ? 'matched' : ''} ${selected?.idx === i ? 'selected' : ''} ${wrongPair?.includes(i) ? 'wrong' : ''}`}
            onClick={() => handleClick(card, i)}>
            {card.value}
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Matched: {matched.length} / {nums.length}
      </p>
      {matched.length === nums.length && (
        <button className="btn btn-green btn-lg" onClick={onComplete} style={{ marginTop: 16, animation: 'bounceIn 0.5s ease' }}>
          🎉 Complete Learning!
        </button>
      )}
      {matched.length < nums.length && (
        <button className="skip-link" onClick={onComplete} style={{ marginTop: 12, display: 'block', margin: '12px auto 0' }}>
          Skip →
        </button>
      )}
    </div>
  );
}

// ─── Main Learning Phase ───
export default function LearningPhase({ onComplete, audioEnabled }) {
  const [station, setStation] = useState(0);

  const nextStation = useCallback(() => {
    if (station < 3) setStation(s => s + 1);
  }, [station]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 40px', width: '100%', minHeight: '100vh' }}>
      {/* Progress dots */}
      <div className="progress-dots">
        {STATIONS.map((s, i) => (
          <div key={i} className={`progress-dot ${i === station ? 'active' : i < station ? 'completed' : ''}`} />
        ))}
      </div>

      {/* Station card */}
      <div className="glass-card" style={{ maxWidth: 800, width: '100%', animation: 'slideUp 0.4s ease' }}>
        {station === 0 && <Station1 audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 1 && <Station2 audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 2 && <Station3 audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 3 && <Station4 audioEnabled={audioEnabled} onComplete={onComplete} />}
      </div>
    </div>
  );
}
