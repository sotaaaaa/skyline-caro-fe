import { FC, memo, useState } from "react";
import { ListAvatar } from "../../../../Util/ListAvatar";
import style from "./PlayGameHeader.module.scss";
import { useSelector } from "react-redux";
import { TableState } from "../../../../redux/slides/table.slice";
import WattingGif from "../../../../assets/watting.gif";
import { AuthState } from "../../../../redux/slides/auth.slice";

interface P {
  isTurn: boolean;
  myScore: number;
  otherScore: number;
}

interface MemberType {
  username: string;
  _id: string;
  avatar: number;
  score: number;
  playerType: number;
}

const PlayGameHeader: FC<P> = (props) => {
  const { isTurn, myScore, otherScore } = props;
  const { tableDetail } = useSelector<RootState, TableState>(
    (state) => state.table
  );

  const { accountInfo } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  // const [myAccount, setMyAccount] = useState<MemberType | undefined>(undefined);
  // const [otherAccount, setOtherAccount] = useState<MemberType | undefined>(
  //   undefined
  // );

  const MyAccount = (e: MemberType) => {
    return (
      <div>
        <div className={`${style.playerItem} ${isTurn ? style.isTurn : ""}`}>
          <img
            src={ListAvatar[e.avatar || 0]}
            className={style.avatar}
            alt="player-0"
          ></img>
          <div className={style.playerName}>{e.username}</div>
        </div>
        <div className={style.score}>{myScore}</div>
      </div>
    );
  };

  const OtherAccount = (e: MemberType) => {
    return (
      <div>
        <div className={`${style.playerItem} ${!isTurn ? style.isTurn : ""}`}>
          <img
            src={ListAvatar[e.avatar || 0]}
            className={style.avatar}
            alt="player-0"
          ></img>
          <div className={style.playerName}>{e.username}</div>
        </div>

        <div className={style.score}>{otherScore}</div>
      </div>
    );
  };

  return (
    <div className={style.header}>
      <div className={style.buttonQuit}>
        <i className={`fa-solid fa-arrow-left-long ${style.backButton}`}></i>
      </div>

      {tableDetail && (
        <div className={style.playerContainer}>
          {tableDetail.member[0]._id === accountInfo?._id ? (
            <>{MyAccount(tableDetail?.member[0])}</>
          ) : (
            <>{OtherAccount(tableDetail?.member[0])}</>
          )}

          <div>
            <div className={style.vs}>VS</div>
            <div className={style.score} style={{ color: "#FFD700" }}>
              :
            </div>
          </div>

          {tableDetail.member[1] ? (
            <>
              {tableDetail.member[1]._id === accountInfo?._id ? (
                <>{MyAccount(tableDetail?.member[1])}</>
              ) : (
                <>{OtherAccount(tableDetail?.member[1])}</>
              )}
            </>
          ) : (
            <div className={style.playerItem}>
              <img
                src={WattingGif}
                className={style.avatar}
                alt="player-watting"
              ></img>
              <div className={style.playerName}>Watting...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default memo(PlayGameHeader);
