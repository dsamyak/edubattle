import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: {
    id: 'u1',
    username: 'CyberNinja',
    elo: 1250,
    xp: 4500,
    level: 12
  },
  setUser: (user) => set({ user }),
  updateElo: (newElo) => set((state) => ({ user: { ...state.user, elo: newElo } })),
}));
