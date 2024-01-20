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

interface SocketsMessages {
  to_user_id: string,
  from_user_id: string,
  message: string,
  message_date: string,
  message_time: string,
  message_status: string,
}

interface SocketsNotifications {
  to_user_id: string,
  update_socket: string,
}

const userSockets: UserSockets = {};



nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connect', (socket: any) => {
    console.log('Conectado al socket')
    const token = socket.handshake.query.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.userId;
        console.log('Connected user:', userId);

        // Asociar el socket al userId
        userSockets[userId] = socket;

        // Evento disconnect
        socket.on('disconnect', () => {
          console.log('Disconnected user:', userId);
          delete userSockets[userId];
        });

        socket.on('notification', (data: SocketsNotifications) => {
          const { to_user_id } = data;
          if (userSockets[to_user_id]) {
            userSockets[to_user_id].emit('notificacion', data);
          }
          return;
        });

        socket.on('message', (data: SocketsMessages) => {
          const { to_user_id } = data;
          if (userSockets[to_user_id]) {
            userSockets[to_user_id].emit('message', data);
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
