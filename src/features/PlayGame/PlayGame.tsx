import { Button, message } from "antd";
import { FC, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConnectSocket } from "../../hooks/useConnectSocket";
import {
  getTableById,
  tableActions,
  TableState,
} from "../../redux/slides/table.slice";
import GameTable from "./components/GameTable/GameTable";
import PlayGameHeader from "./components/PlayGameHeader/PlayGameHeader";
import style from "./PlayGame.module.scss";
import { AccountInfo } from "../../providers/AccountApi/AccountApi.d";
import { AuthState } from "../../redux/slides/auth.slice";
import GameTableView from "./components/GameTable/GameTableView";
import ListenCheckEvent from "./ListenCheckEvent";
const PlayGame: FC = () => {
  const dispatch = useDispatch();
  const { tableDetail } = useSelector<RootState, TableState>(
    (state) => state.table
  );
  const { accountInfo } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  // get table detail
  useEffect(() => {
    let id = window.location.search.replaceAll("?id=", "");
    dispatch(getTableById(id));
  }, []);

  // connect socket
  const { isConnected, client } = useConnectSocket();

  // logic game
  const [isTurn, setTurn] = useState<boolean>(false);
  const [checkType, setCheckType] = useState<"X" | "O">("O");
  const [isWattingPlayer, setWattingPlayer] = useState<boolean>(true);

  const [isShowPopupReady, setShowPopupReady] = useState<boolean>(false);
  const [isReady, setReady] = useState<boolean>(false);
  const [isOpponentReady, setOpponentReady] = useState<boolean>(false);
  const [isWin, setWin] = useState<boolean>(false);
  const [isLose, setLose] = useState<boolean>(false);
  const [isListenEventCheck, setListenEventCheck] = useState<boolean>(false);
  const [myScore, setMyScore] = useState<number>(0);
  const [otherScore, setOtherScore] = useState<number>(0);

  useEffect(() => {
    if (tableDetail?.member.length === 2) {
      setWattingPlayer(false);
      setShowPopupReady(true);
    } else {
      setWattingPlayer(true);
      setShowPopupReady(false);
    }
  }, [tableDetail]);

  // join room and get first check
  useEffect(() => {
    if (isConnected && client) {
      // join room
      let id = window.location.search.replaceAll("?id=", "");
      client.emit("join", { id: id });

      // get check type
      client.on("user-check-type", (e) => {
        if (
          tableDetail &&
          tableDetail.member[e.uIndex] &&
          tableDetail.member[e.uIndex]._id === accountInfo?._id
        ) {
          setTurn(true);
          setCheckType("X");
        } else {
          setTurn(false);
          setCheckType("O");
        }
      });

      // new user join
      client.on("user-joined", (e: { data: AccountInfo }) => {
        dispatch(getTableById(id));
        setMyScore(0);
        setOtherScore(0);
        for (let i = 0; i < 675; i++) {
          let item = document.getElementById(`${i}`);
          if (item) {
            item.innerHTML = "";
            item.className = item.className.replaceAll("winItem", "");
          }
        }
      });

      client.on("start-game", (e) => {
        setOpponentReady(true);
      });

      // event win
      client?.on("win-game", (e) => {
        for (let i = 0; i < e.position.length; i++) {
          let item = document.getElementById(`${e.position[i]}`);
          if (item) {
            item.className += ` winItem`;
          }
        }
        setTurn(false);

        if (e.uid === accountInfo?._id) {
          setWin(true);
          setMyScore(myScore + 1);
        } else {
          setLose(true);
          setOtherScore(otherScore + 1);
        }
        setOpponentReady(false);
      });
    }
  }, [isConnected]);

  const onStart = () => {
    setReady(true);
    if (client) {
      client.emit("ready", { uid: accountInfo?._id });
    }
  };

  const onRematch = () => {
    for (let i = 0; i < 675; i++) {
      let item = document.getElementById(`${i}`);
      if (item) {
        item.innerHTML = "";
        item.className = item.className.replaceAll("winItem", "");
      }
    }
    if (checkType === "X") {
      setCheckType("O");
    } else {
      setCheckType("X");
      setTurn(true);
    }

    setWin(false);
    setLose(false);
    setReady(true);
    setShowPopupReady(true);
    if (checkType === "X") {
    }
    client?.emit("ready", { uid: accountInfo?._id });
  };

  useEffect(() => {
    if (isOpponentReady && isReady) {
      setShowPopupReady(false);
      setOpponentReady(false);
      setReady(false);
    }
  }, [isReady, isOpponentReady]);

  useEffect(() => {
    setListenEventCheck(false);
  }, [checkType]);

  useEffect(() => {
    if (!isListenEventCheck) {
      setListenEventCheck(true);
    }
  }, [isListenEventCheck]);

  // checked
  const X = `<div class=" ${style.colorRed} ${style.item}">X</div>`;
  const O = `<div class=" ${style.colorGreen} ${style.item}">O</div>`;

  const onCheck = (e: number) => {
    if (!isTurn) return;
    if (client) {
      let item = document.getElementById(`${e}`);
      if (item && item.innerHTML === "") {
        item.innerHTML = checkType === "X" ? X : O;
        setTurn(false);
        client.emit("check", { position: e });
      }
    }
  };

  return (
    <div className={style.container}>
      <PlayGameHeader
        isTurn={isTurn}
        myScore={myScore}
        otherScore={otherScore}
      ></PlayGameHeader>
      {isListenEventCheck && (
        <ListenCheckEvent
          client={client}
          checkType={checkType}
          setTurn={setTurn}
          X={X}
          O={O}
        ></ListenCheckEvent>
      )}
      <div className={style.body}>
        {/* <GameTable onCheck={onCheck}></GameTable> */}
        <GameTableView
          onCheck={onCheck}
          isWattingPlayer={isWattingPlayer}
          isPendingStart={isShowPopupReady}
          isWin={isWin}
          isLose={isLose}
          isReady={isReady}
          onRestart={() => {
            onRematch();
          }}
          onStart={() => {
            onStart();
          }}
        ></GameTableView>
      </div>
    </div>
  );
};
export default memo(PlayGame);
