// server.ts
const next = require('next');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Socket } = require('socket.io');
const jwt = require('jsonwebtoken');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const SECRET_KEY = "BfD8UphBQxiKrdfw";   // or const SECRET_KEY = process.env.SECRET_KEY or 'BfD8UphBQxiKrdfw';

interface UserSockets {
  [userId: string]: any;
}

const userSockets: UserSockets = {};



nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket: any) => {
    const token = socket.handshake.query.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.userId;
        console.log('Connected user (server):', userId);

        // Asociar el socket al userId
        userSockets[userId] = socket;

        // Evento disconnect
        socket.on('disconnect', () => {
          console.log('Disconnected user (server):', userId);
          delete userSockets[userId];
        });

        socket.on('notification', (data: any) => {
          const { toUserId } = data;
          if (userSockets[toUserId]) {
            userSockets[toUserId].emit('notificacion', data);
          }
          return;
        });

      }
      catch (error) {
        console.log('Error al verificar el token:', error);
        socket.disconnect(); 
      }
    }
  });

  app.all('*', (req: any, res: any) => {
    return handle(req, res);
  });

  const PORT = parseInt(process.env.PORT || '3000', 10);
  server.listen(PORT, () => {
    console.log(`- Ready deployment on http://localhost:${PORT}`);
  });
});
