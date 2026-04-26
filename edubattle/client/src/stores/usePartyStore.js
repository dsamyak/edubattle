import { create } from 'zustand';

// Generate a party code (6 uppercase letters/numbers)
const generatePartyCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

export const usePartyStore = create((set, get) => ({
  // Party state
  partyCode: null,
  isHost: false,
  members: [], // [{ playerId, username, avatar, isReady, isHost }]
  partyStatus: 'idle', // idle, waiting, ready, starting, ingame
  gameMode: '1v1',
  
  // Create a new party
  createParty: (hostProfile, mode = '1v1') => {
    const code = generatePartyCode();
    set({
      partyCode: code,
      isHost: true,
      gameMode: mode,
      partyStatus: 'waiting',
      members: [{
        playerId: hostProfile.playerId,
        username: hostProfile.username,
        avatar: hostProfile.avatar,
        isReady: true,
        isHost: true
      }]
    });
    return code;
  },

  // Join a party by code (simulated for local play)
  joinParty: (code, playerProfile) => {
    const state = get();
    // In a real implementation, this would connect via socket
    set({
      partyCode: code,
      isHost: false,
      partyStatus: 'waiting',
      members: [
        ...state.members,
        {
          playerId: playerProfile.playerId,
          username: playerProfile.username,
          avatar: playerProfile.avatar,
          isReady: false,
          isHost: false
        }
      ]
    });
  },

  // Toggle ready status
  toggleReady: (playerId) => set((state) => ({
    members: state.members.map(m =>
      m.playerId === playerId ? { ...m, isReady: !m.isReady } : m
    )
  })),

  // Add a simulated player (for demo)
  addSimulatedPlayer: (username) => set((state) => ({
    members: [
      ...state.members,
      {
        playerId: generatePartyCode(),
        username,
        avatar: username.slice(0, 2).toUpperCase(),
        isReady: false,
        isHost: false
      }
    ]
  })),

  // Set player ready
  setPlayerReady: (playerId, ready) => set((state) => ({
    members: state.members.map(m =>
      m.playerId === playerId ? { ...m, isReady: ready } : m
    )
  })),

  // Start the game (host only)
  startGame: () => set({ partyStatus: 'starting' }),

  // Update party status
  setPartyStatus: (status) => set({ partyStatus: status }),

  // Leave/destroy party
  leaveParty: () => set({
    partyCode: null,
    isHost: false,
    members: [],
    partyStatus: 'idle',
    gameMode: '1v1'
  }),

  // Remove a member
  removeMember: (playerId) => set((state) => ({
    members: state.members.filter(m => m.playerId !== playerId)
  }))
}));
