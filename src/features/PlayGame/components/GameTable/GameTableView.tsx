import { FC, memo } from "react";
import { Button, Col, Row } from "antd";
import style from "./GameTable.module.scss";
import WattingGif from "../../../../assets/watting.gif";

interface P {
  onCheck: (index: number) => void;
  isWattingPlayer: boolean;
  isPendingStart: boolean;
  isWin: boolean;
  isLose: boolean;
  isReady: boolean;
  onRestart: () => void;
  onStart: () => void;
}
const size = 24;
const arrId = Array.from({ length: size }, (_, index) => index + 1);
const GameTableView: FC<P> = (props) => {
  const {
    onCheck,
    isWattingPlayer,
    isWin,
    isLose,
    onRestart,
    isPendingStart,
    onStart,
    isReady,
  } = props;

  return (
    <div className={style.container}>
      {arrId.map((i, row) => (
        <Row key={`row_${row}`}>
          {arrId.reverse().map((j, col) => (
            <Col
              span={1}
              style={{ maxWidth: "25px", height: "25px" }}
              key={`row_${row}_col_${col}`}
            >
              <div
                className={style.tableItem}
                onClick={() => {
                  onCheck(row * size + col);
                }}
                id={`${row * size + col}`}
              ></div>
            </Col>
          ))}
        </Row>
      ))}

      {isWattingPlayer && (
        <div className={style.popupWraper}>
          <div className={style.wattingPlayer}>
            <img className={style.wattingImg} src={WattingGif}></img>
            <div className={style.wattingText}>
              Watting for other player...{" "}
            </div>
          </div>
        </div>
      )}

      {isPendingStart && (
        <div className={style.popupWraper}>
          <div className={style.wattingPlayer}>
            {isReady ? (
              <div className={style.ready}>Watting other player ready</div>
            ) : (
              <a
                href="#"
                className={style.button}
                onClick={() => {
                  onStart();
                }}
              >
                Ready
              </a>
            )}
          </div>
        </div>
      )}

      {isWin && (
        <div className={style.popupWraper}>
          <div className={style.wattingPlayer}>
            <div className={style.winText}>you win</div>
            <div
              className={style.rematch}
              onClick={() => {
                onRestart();
              }}
            >
              - REMATCH -
            </div>
          </div>
        </div>
      )}

      {isLose && (
        <div className={style.popupWraper}>
          <div className={style.wattingPlayer}>
            <div className={style.winText}>you lose</div>
            <div
              className={style.rematch}
              onClick={() => {
                onRestart();
              }}
            >
              - REMATCH -
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(GameTableView);
