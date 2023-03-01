import { baseUrl } from "./casesApi/queryWithRefresh";
import { io, Socket } from "socket.io-client";
import { createContext } from "react";

export const socket = io(baseUrl, {
  closeOnBeforeunload: true,
});
export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
