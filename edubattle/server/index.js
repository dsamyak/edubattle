const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Simple matchmaking state
let waitingPlayer = null;

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('battle:join', (data) => {
    console.log(`Player ${socket.id} joined matchmaking`);
    
    if (waitingPlayer) {
      // Match found
      const matchId = `match_${Date.now()}`;
      const opponent = waitingPlayer;
      waitingPlayer = null;

      socket.join(matchId);
      opponent.join(matchId);

      io.to(matchId).emit('battle:matched', { matchId });
      console.log(`Match started: ${matchId}`);
    } else {
      waitingPlayer = socket;
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    if (waitingPlayer && waitingPlayer.id === socket.id) {
      waitingPlayer = null;
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`EduBattle Server running on port ${PORT}`);
});
