import { create } from 'zustand';

export const useBattleStore = create((set) => ({
  matchStatus: 'idle', // idle, queuing, active, finished
  opponent: null,
  currentQuestionIndex: 0,
  playerHp: 100,
  opponentHp: 100,
  score: 0,
  
  setMatchStatus: (status) => set({ matchStatus: status }),
  setOpponent: (opponent) => set({ opponent }),
  takeDamage: (amount) => set((state) => ({ playerHp: Math.max(0, state.playerHp - amount) })),
  dealDamage: (amount) => set((state) => ({ opponentHp: Math.max(0, state.opponentHp - amount) })),
  nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  resetBattle: () => set({
    matchStatus: 'idle',
    opponent: null,
    currentQuestionIndex: 0,
    playerHp: 100,
    opponentHp: 100,
    score: 0
  })
}));
