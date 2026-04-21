import { io } from 'socket.io-client';

const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:3001';

export const createSocket = (token: string) => {
  return io(WS_URL, {
    auth: { token },
  });
};
