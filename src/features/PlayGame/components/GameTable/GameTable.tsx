import { Col, Row } from "antd";
import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableState } from "../../../../redux/slides/table.slice";
import style from "./GameTable.module.scss";
import WattingGif from "../../../../assets/watting.gif";

const size = 24;
const arrId = Array.from({ length: size }, (_, index) => index + 1);

interface P {
  onCheck: (index: number) => void;
}
const GameTable: FC<P> = (props) => {
  const { onCheck } = props;
  const { tableDetail } = useSelector<RootState, TableState>(
    (state) => state.table
  );

  const [playerType, setPlayerType] = useState<1 | 2>(1);
  const [enableCheck, setEnableCheck] = useState<boolean>(true);

  // watting player
  const [wattingPlayer, setWattingPlayer] = useState<boolean>(true);
  useEffect(() => {
    if (tableDetail && tableDetail.member.length > 1) {
      setWattingPlayer(false);
    } else {
      setWattingPlayer(true);
    }
  }, [tableDetail]);

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

      {wattingPlayer && (
        <div className={style.popupWraper}>
          <div className={style.wattingPlayer}>
            <img className={style.wattingImg} src={WattingGif}></img>
            <div className={style.wattingText}>
              Watting for other player...{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(GameTable);
