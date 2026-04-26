import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePartyStore } from '../stores/usePartyStore';
import { useAuthStore } from '../stores/useAuthStore';

const PartyLobby = () => {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const { partyCode, isHost, members, partyStatus, gameMode, createParty, joinParty, toggleReady, setPlayerReady, startGame, leaveParty, addSimulatedPlayer } = usePartyStore();
  const [joinCodeInput, setJoinCodeInput] = useState('');
  
  // Clean up when leaving
  useEffect(() => {
    return () => {
      // Don't leave if we are navigating to game
      if (usePartyStore.getState().partyStatus !== 'starting' && usePartyStore.getState().partyStatus !== 'ingame') {
        leaveParty();
      }
    };
  }, [leaveParty]);

  useEffect(() => {
    if (partyStatus === 'starting') {
      // Small delay for visual effect
      setTimeout(() => {
        usePartyStore.getState().setPartyStatus('ingame');
        if (gameMode === '1v1') navigate('/battle/1v1');
        else if (gameMode === 'speed') navigate('/battle/speed');
      }, 1500);
    }
  }, [partyStatus, navigate, gameMode]);

  const handleCreateParty = () => {
    if (!profile) return;
    createParty(profile);
  };

  const handleJoinParty = () => {
    if (!profile || !joinCodeInput.trim()) return;
    joinParty(joinCodeInput.trim().toUpperCase(), profile);
  };

  const handleSimulateOpponent = () => {
    addSimulatedPlayer('BotPlayer_' + Math.floor(Math.random() * 100));
  };

  const handleSimulateOpponentReady = () => {
    const bots = members.filter(m => !m.isHost && m.playerId !== profile?.playerId);
    if (bots.length > 0) {
      setPlayerReady(bots[0].playerId, true);
    }
  };

  const allReady = members.length > 1 && members.every(m => m.isReady);

  if (!partyCode) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-[Orbitron] font-black tracking-widest text-[#a200ff] mb-8 text-center drop-shadow-[0_0_15px_rgba(162,0,255,0.4)]">
          CUSTOM PARTY
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Party */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="game-card-3d p-8 bg-black/50 border-[#a200ff]/30 flex flex-col justify-center items-center text-center h-80"
          >
            <div className="text-5xl mb-4">👑</div>
            <h2 className="text-2xl font-[Orbitron] text-white mb-2">HOST A MATCH</h2>
            <p className="text-[#8a8a99] font-mono text-sm mb-6">Generate a secure room code and invite your friends to battle.</p>
            <button onClick={handleCreateParty} className="btn-action-purple w-full">INITIALIZE ROOM</button>
          </motion.div>

          {/* Join Party */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="game-card-3d p-8 bg-black/50 border-[#00ffcc]/30 flex flex-col justify-center items-center text-center h-80"
          >
            <div className="text-5xl mb-4">🔗</div>
            <h2 className="text-2xl font-[Orbitron] text-white mb-2">JOIN OPERATION</h2>
            <p className="text-[#8a8a99] font-mono text-sm mb-6">Enter the 6-character room code provided by your host.</p>
            
            <input 
              type="text" 
              value={joinCodeInput}
              onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
              maxLength={6}
              placeholder="ENTER CODE"
              className="w-full bg-black/60 border border-white/20 rounded p-4 text-center text-2xl font-mono text-[#00ffcc] tracking-[0.5em] focus:outline-none focus:border-[#00ffcc] mb-4 uppercase"
            />
            
            <button 
              onClick={handleJoinParty} 
              disabled={joinCodeInput.length < 6}
              className="btn-action w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONNECT
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-[Orbitron] font-black tracking-widest text-white">
            PARTY <span className="text-[#a200ff]">LOBBY</span>
          </h1>
          <p className="text-[#8a8a99] font-mono mt-1">Status: {partyStatus.toUpperCase()}</p>
        </div>
        
        <div className="game-card-3d px-6 py-3 bg-black/60 border-[#00ffcc]/40 flex items-center gap-4">
          <span className="text-[#8a8a99] font-mono text-xs">ROOM CODE:</span>
          <span className="text-2xl font-mono font-bold text-[#00ffcc] tracking-[0.2em]">{partyCode}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Players Area */}
        <div className="md:col-span-2 space-y-4">
          <div className="game-card-3d p-6 bg-black/40 border-white/10 min-h-[400px]">
            <h2 className="text-sm font-[Orbitron] text-[#00ffcc] mb-4 flex justify-between">
              <span>OPERATIVES ({members.length}/2)</span>
              {isHost && members.length < 2 && (
                <span className="text-[#8a8a99] animate-pulse">Waiting for others...</span>
              )}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {members.map((member) => (
                  <motion.div 
                    key={member.playerId}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${member.isReady ? 'border-[#00ffcc] bg-[#00ffcc]/10' : 'border-white/10 bg-black/60'}`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ffcc] to-[#a200ff] flex items-center justify-center text-black font-bold text-lg font-[Orbitron]">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-[Rajdhani] font-bold text-lg text-white flex items-center gap-2">
                        {member.username} 
                        {member.isHost && <span className="text-[10px] bg-[#a200ff]/20 text-[#a200ff] px-2 py-0.5 rounded border border-[#a200ff]/30">HOST</span>}
                      </div>
                      <div className={`font-mono text-xs ${member.isReady ? 'text-[#00ffcc]' : 'text-[#8a8a99]'}`}>
                        {member.isReady ? 'READY FOR COMBAT' : 'PREPARING...'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Empty Slot */}
              {members.length < 2 && (
                <div className="p-4 rounded-xl border-2 border-dashed border-white/10 bg-black/20 flex flex-col items-center justify-center gap-2 min-h-[100px] text-[#8a8a99] font-mono text-sm">
                  <div className="animate-spin text-xl">⚙️</div>
                  AWAITING CONNECTION
                </div>
              )}
            </div>

            {/* Debug/Demo tools for local testing without multiple browsers */}
            {isHost && members.length < 2 && (
              <div className="mt-8 pt-4 border-t border-white/10">
                <p className="text-[10px] text-[#8a8a99] mb-2 font-mono">DEMO TOOLS (Local testing)</p>
                <button onClick={handleSimulateOpponent} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded font-mono border border-white/10">
                  + Add Simulated Player
                </button>
              </div>
            )}
            {isHost && members.length > 1 && !allReady && (
              <div className="mt-4">
                <button onClick={handleSimulateOpponentReady} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded font-mono border border-white/10">
                  Force Simulate Player Ready
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Controls Area */}
        <div className="space-y-4">
          <div className="game-card-3d p-6 bg-black/40 border-white/10">
            <h2 className="text-sm font-[Orbitron] text-white/80 mb-4">MISSION BRIEFING</h2>
            <div className="bg-black/60 rounded border border-white/5 p-4 mb-6">
              <div className="text-[10px] font-mono text-[#8a8a99] mb-1">MODE</div>
              <div className="font-[Orbitron] text-lg text-[#00ffcc]">{gameMode.toUpperCase()}</div>
            </div>

            {profile && (
              <button 
                onClick={() => toggleReady(profile.playerId)}
                className={`w-full py-4 rounded-lg font-[Orbitron] font-bold tracking-wider mb-4 transition-all ${
                  members.find(m => m.playerId === profile?.playerId)?.isReady 
                  ? 'bg-transparent border-2 border-[#ff0055] text-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.2)_inset]' 
                  : 'bg-[#00ffcc] text-black shadow-[0_0_15px_rgba(0,255,204,0.4)]'
                }`}
              >
                {members.find(m => m.playerId === profile?.playerId)?.isReady ? 'CANCEL READY' : 'READY UP'}
              </button>
            )}

            {isHost && (
              <button 
                onClick={startGame}
                disabled={!allReady}
                className="w-full btn-action-purple py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {partyStatus === 'starting' ? 'INITIALIZING...' : 'START MATCH'}
              </button>
            )}
            
            <button 
              onClick={() => { leaveParty(); navigate('/dashboard'); }}
              className="w-full mt-4 py-3 text-xs font-mono text-[#8a8a99] hover:text-white border border-transparent hover:border-white/10 rounded transition-all"
            >
              DISCONNECT & RETURN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyLobby;
