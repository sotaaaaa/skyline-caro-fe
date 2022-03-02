import { FC, memo, useEffect } from "react";
import { Socket } from "socket.io-client";

interface P {
  client: Socket | undefined;
  checkType: "X" | "O";
  setTurn: (e: boolean) => void;
  X: string;
  O: string;
}
const ListenCheckEvent: FC<P> = (props) => {
  const { client, setTurn, checkType, X, O } = props;
  useEffect(() => {
    if (client) {
      client?.on("opponent-check", (e) => {
        let item = document.getElementById(`${e.position}`);
        if (item) {
          item.innerHTML = checkType === "X" ? O : X;
        }
        setTurn(true);
      });
    }
  }, []);
  return null;
};
export default memo(ListenCheckEvent);
