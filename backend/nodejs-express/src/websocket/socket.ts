import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { User } from '../types';

export interface AuthenticatedSocket extends Socket {
  user?: User;
}

export const setupWebSocket = (httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error'));
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.user = decoded as User;
      next();
    });
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`✅ User ${socket.user?.id} connected`);

    if (socket.user?.id) {
      socket.join(`user:${socket.user.id}`);
      socket.join(`role:${socket.user.role}`);
    }

    socket.on('appointment:update', (data: any) => {
      io.emit('appointment:updated', { ...data, timestamp: new Date() });
    });

    socket.on('disconnect', () => {
      console.log(`❌ User ${socket.user?.id} disconnected`);
    });
  });

  return io;
};

export const emitAppointmentUpdate = (io: SocketIOServer, appointmentId: number, status: string) => {
  io.emit('appointment:updated', { appointmentId, status, timestamp: new Date() });
};
