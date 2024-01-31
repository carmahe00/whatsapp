import { createContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext({} as Socket)

export default SocketContext
