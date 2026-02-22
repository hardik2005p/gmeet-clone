import { io } from "socket.io-client";
const local=import.meta.env.VITE_LOCAL;
export const socket = io(`${local}`, {
  autoConnect: false,
});

