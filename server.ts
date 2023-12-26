// server.ts
import next from 'next';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();


nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });

    // Otros manejadores de eventos de Socket.io aquí
  });

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = parseInt(process.env.PORT || '3000', 10);
  server.listen(PORT, () => {
    console.log(`> Listo en http://localhost:${PORT}`);
  });
});
