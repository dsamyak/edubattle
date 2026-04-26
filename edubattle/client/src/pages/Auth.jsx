import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/useAuthStore';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../config/firebase';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        login(userCredential.user);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        login(userCredential.user, {
          uid: userCredential.user.uid,
          username: username || email.split('@')[0],
          email: email,
          playerId: Math.random().toString(36).substring(2, 8).toUpperCase(),
          elo: 1000,
          xp: 0,
          level: 1,
          wins: 0,
          losses: 0,
          streak: 0,
          gamesPlayed: 0,
          avatar: (username || email).slice(0, 2).toUpperCase(),
          createdAt: Date.now()
        });
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      login(result.user);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleDevLogin = () => {
    login({ uid: 'dev-user-123', email: 'dev@edubattle.local', displayName: 'DevMaster' }, {
      uid: 'dev-user-123',
      username: 'DevMaster',
      email: 'dev@edubattle.local',
      playerId: 'DEV123',
      elo: 1500,
      xp: 5000,
      level: 5,
      wins: 10,
      losses: 2,
      streak: 3,
      gamesPlayed: 12,
      avatar: 'DM',
      createdAt: Date.now()
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="game-card-3d w-full max-w-md p-8 bg-black/60 border-[#00ffcc]/30 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent opacity-50" />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[Orbitron] font-black tracking-widest text-[#00ffcc] drop-shadow-[0_0_10px_rgba(0,255,204,0.5)] glitch" data-text="EDUBATTLE">
            EDUBATTLE
          </h1>
          <p className="text-[#8a8a99] font-mono text-sm mt-2 tracking-widest">
            {isLogin ? 'SYSTEM INITIALIZATION' : 'NEW OPERATIVE REGISTRATION'}
          </p>
        </div>

        {error && (
          <div className="bg-[#ff0055]/10 border border-[#ff0055]/30 text-[#ff0055] p-3 rounded mb-6 font-mono text-xs">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[#00ffcc] font-mono text-xs tracking-widest mb-1">CALLSIGN / USERNAME</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-[#00ffcc] focus:shadow-[0_0_10px_rgba(0,255,204,0.2)] transition-all font-[Rajdhani]"
                placeholder="Enter username"
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <label className="block text-[#00ffcc] font-mono text-xs tracking-widest mb-1">COMM-LINK / EMAIL</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-[#00ffcc] focus:shadow-[0_0_10px_rgba(0,255,204,0.2)] transition-all font-[Rajdhani]"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-[#00ffcc] font-mono text-xs tracking-widest mb-1">ACCESS CODE / PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-[#00ffcc] focus:shadow-[0_0_10px_rgba(0,255,204,0.2)] transition-all font-[Rajdhani]"
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-action py-3 mt-4"
          >
            {loading ? 'CONNECTING...' : isLogin ? 'INITIATE LOGIN' : 'REGISTER'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-white/10"></div>
          <span className="text-[#8a8a99] font-mono text-xs">OR OVERRIDE WITH</span>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-[Rajdhani] font-bold p-3 rounded transition-all flex items-center justify-center gap-3 mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          GOOGLE UPLINK
        </button>

        <button 
          onClick={handleDevLogin}
          disabled={loading}
          className="w-full bg-[#ffcc00]/10 border border-[#ffcc00]/30 hover:bg-[#ffcc00]/20 hover:border-[#ffcc00]/50 text-[#ffcc00] font-[Orbitron] font-bold tracking-widest p-3 rounded transition-all flex items-center justify-center gap-3"
        >
          <span className="text-xl">⚠️</span>
          DEV OVERRIDE (BYPASS AUTH)
        </button>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00ffcc]/80 hover:text-[#00ffcc] font-mono text-xs underline-offset-4 hover:underline transition-all"
          >
            {isLogin ? 'REQUEST NEW OPERATIVE CREDENTIALS' : 'RETURN TO LOGIN'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
