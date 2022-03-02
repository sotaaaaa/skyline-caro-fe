import { FC, memo, useEffect, useState } from "react";
import style from "./ListTable.module.scss";
import { ListAvatar } from "../../Util/ListAvatar";
import Header from "./components/Header/Header";
import TableSearch from "./components/TableSearch/TableSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTable,
  joinTable,
  tableActions,
  TableState,
  updateListTable,
} from "../../redux/slides/table.slice";
import WattingGif from "../../assets/watting.gif";
import { TableItem } from "../../providers/TableApi/TableApi.d";
import { useNavigate } from "react-router";
import { useConnectSocket } from "../../hooks/useConnectSocket";
import { Button, Input, Modal } from "antd";
import "./ListTable.scss";

const ListTable: FC = () => {
  const { listTable } = useSelector<RootState, TableState>(
    (state) => state.table
  );

  const dispatch = useDispatch();
  const nagivate = useNavigate();
  useEffect(() => {
    dispatch(getListTable());
  }, []);

  const onJoinTable = (e: TableItem) => {
    setTableItem(e);
    setErrorText(undefined);
    if (e.private) {
      setVisible(true);
    } else {
      dispatch(joinTable(e._id, nagivate));
    }
  };

  const [visible, setVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [tableItem, setTableItem] = useState<TableItem | undefined>(undefined);
  const [errorText, setErrorText] = useState<string | undefined>(undefined);

  // socket
  const { isConnected, client } = useConnectSocket();

  useEffect(() => {
    if (isConnected) {
      client?.on("table-change", (e) => {
        dispatch(updateListTable(e.data.tableId, listTable));
      });

      client?.on("delete-table", (e) => {
        let newTableList = listTable.filter((o) => o._id !== e.tableId);
        dispatch(tableActions.setListTable(newTableList));
      });

      client?.on("changed-table", (e) => {
        dispatch(updateListTable(e.tableId, listTable));
      });
    }
  }, [isConnected]);

  return (
    <div className={style.container}>
      <Header></Header>

      <div className={style.body}>
        <TableSearch></TableSearch>

        <div className={style.table}>
          <div className={style.header}>
            <div className={style.tableId}># ID</div>
            <div className={style.tableName}>
              <i className={`fa-solid fa-gamepad ${style.icon}`}></i>Name
            </div>
            <div className={style.tablePlayer}>
              <i className={`fa-solid fa-user-group ${style.icon}`}></i>Player
            </div>
            <div className={style.tablePrivate}>
              <i className={`fa-solid fa-key ${style.icon}`}></i>Private
            </div>
          </div>

          <div className={style.tableBody}>
            {listTable.map((e) => (
              <div
                className={style.tableItem}
                key={e._id}
                onClick={() => {
                  onJoinTable(e);
                }}
              >
                <div className={style.tableId}>{e.index}</div>
                <div className={style.tableName}>{e.tableName}</div>
                <div className={style.tablePlayer}>
                  <div className={style.playerItem}>
                    <img
                      src={ListAvatar[e.member[0].avatar]}
                      className={style.avatar}
                    ></img>
                    <div className={style.playerName}>
                      {e.member[0].username}
                    </div>
                  </div>

                  <div className={style.vs}>VS</div>

                  {e.member[1] ? (
                    <div className={style.playerItem}>
                      <img
                        src={ListAvatar[e.member[1].avatar]}
                        className={style.avatar}
                      ></img>
                      <div className={style.playerName}>
                        {e.member[1].username}
                      </div>
                    </div>
                  ) : (
                    <div className={style.playerItem}>
                      <img src={WattingGif} className={style.avatar}></img>
                      <div className={style.playerName}>Watting...</div>
                    </div>
                  )}
                </div>
                <div className={style.tablePrivate}>
                  {e.private && <i className="fa-solid fa-lock"></i>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        visible={visible}
        footer={null}
        closable={false}
        className="custom-modal-password"
        width={400}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>
          <div className="cs-md-title">Input password</div>
          <Input.Password
            className="cs-md-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="new-password"
          ></Input.Password>

          {errorText && <div className="cs-md-error">{errorText}</div>}

          <div className="cs-md-button">
            <Button
              className={style.newTable}
              onClick={() => {
                if (tableItem) {
                  let cb = (e: string) => {
                    setErrorText(e);
                  };
                  dispatch(joinTable(tableItem._id, nagivate, password, cb));
                }
              }}
              disabled={password === "" ? true : false}
            >
              Join table
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default memo(ListTable);
