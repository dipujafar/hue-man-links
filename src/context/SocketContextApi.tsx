import envConfig from "@/config/envConfig";
import { selectToken } from "@/redux/features/authSlice";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

type TValueType = {
  socket: Socket;
  socketLoading: boolean;
};
const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext) as TValueType;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socketLoading, setSocketLoading] = useState(false);
  const token = useSelector(selectToken);

  const socket = useMemo(() => {
    setSocketLoading(true);

    if (token) {
      const socketStore = io(envConfig.socketApi, {
        transports: ["websocket"],
        auth: {
          token,
        },
      });

      socketStore.on("connect", () => {
        toast.success("Connected to socket");
        setSocketLoading(false);
      });

      return socketStore;
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, socketLoading }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
