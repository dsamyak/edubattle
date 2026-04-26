import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Generate a unique player ID (6 chars, uppercase alphanumeric)
const generatePlayerId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Auth state
      isAuthenticated: false,
      isLoading: true,
      authUser: null, // Firebase user object

      // Profile state
      profile: null, // { uid, username, email, playerId, elo, xp, level, wins, losses, streak, avatar }

      // Actions
      setAuthUser: (user) => set({ authUser: user, isLoading: false }),

      login: (firebaseUser, existingProfile = null) => {
        const profile = existingProfile || {
          uid: firebaseUser.uid,
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Player',
          email: firebaseUser.email,
          playerId: generatePlayerId(),
          elo: 1000,
          xp: 0,
          level: 1,
          wins: 0,
          losses: 0,
          streak: 0,
          gamesPlayed: 0,
          avatar: (firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'PL').slice(0, 2).toUpperCase(),
          createdAt: Date.now()
        };
        set({
          isAuthenticated: true,
          isLoading: false,
          authUser: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName
          },
          profile
        });
      },

      logout: () => set({
        isAuthenticated: false,
        isLoading: false,
        authUser: null,
        profile: null
      }),

      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      })),

      addWin: () => set((state) => {
        if (!state.profile) return {};
        const newStreak = state.profile.streak + 1;
        const xpGain = 150 + (newStreak * 25);
        const newXp = state.profile.xp + xpGain;
        const newLevel = Math.floor(newXp / 1000) + 1;
        return {
          profile: {
            ...state.profile,
            wins: state.profile.wins + 1,
            streak: newStreak,
            gamesPlayed: state.profile.gamesPlayed + 1,
            elo: state.profile.elo + 24,
            xp: newXp,
            level: newLevel
          }
        };
      }),

      addLoss: () => set((state) => {
        if (!state.profile) return {};
        return {
          profile: {
            ...state.profile,
            losses: state.profile.losses + 1,
            streak: 0,
            gamesPlayed: state.profile.gamesPlayed + 1,
            elo: Math.max(0, state.profile.elo - 18),
            xp: state.profile.xp + 50,
            level: Math.floor((state.profile.xp + 50) / 1000) + 1
          }
        };
      }),

      setLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'edubattle-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        profile: state.profile,
        authUser: state.authUser
      })
    }
  )
);
