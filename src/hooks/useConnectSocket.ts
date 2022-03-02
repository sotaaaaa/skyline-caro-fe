/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { AuthState } from "../redux/slides/auth.slice";

export const useConnectSocket = () => {
  const { token } = useSelector<RootState, AuthState>((state) => state.auth);
  const [isConnected, setConnected] = useState(false);
  const [client, setClient] = useState<Socket>();

  useEffect(() => {
    // Todo: Init socket client
    if (!isConnected) {
      const client = io("http://158.247.220.94:8000", {
        timeout: 5000,
        extraHeaders: {
          auth: `${token}`,
        },
      });

      // Todo: Listen events
      setClient(client);
      client.on("connect", () => {
        console.log("connet socket !!!");
        setConnected(true);
        client.emit("auth", { token: token });
      });

      client.on("disconnect", () => {
        setConnected(false);
      });

      return () => {
        client?.disconnect();
        console.log("disconnect socket");
      };
    }
    //eslint-disable-next-line
  }, []);

  return { isConnected, client };
};
