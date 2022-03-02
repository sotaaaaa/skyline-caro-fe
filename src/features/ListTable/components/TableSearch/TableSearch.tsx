import { Input, Button, Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import { FC, memo, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./TableSearch.module.scss";
import "./TableSearch.scss";
import { useNavigate } from "react-router";
import { CreateTableInputType } from "../../../../providers/TableApi/TableApi.d";
import { createTable } from "../../../../redux/slides/table.slice";

const TableSearch: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create new table
  const [visiblePopupNewTable, setVisiblePopupNewTable] =
    useState<boolean>(false);
  const onCreateNewTable = (e: any) => {
    let data: CreateTableInputType = {
      tableName: e.tableName,
    };
    if (e.tablePass) {
      data.password = e.tablePass;
    }
    dispatch(createTable(data, navigate));
  };

  // play now
  // const [visiblePopupPlayNow, setVisiblePopupPlayNow] =
  //   useState<boolean>(false);
  // const onPlayNow = () => {};

  return (
    <div>
      <div className={style.header}>
        <div className={style.search}>
          <Input className={style.searchInput} placeholder="#ID"></Input>
          <Button className={style.searchButton}>Find</Button>
        </div>

        <div style={{ display: "flex" }}>
          <Button
            className={style.newTable}
            onClick={() => {
              setVisiblePopupNewTable(true);
            }}
          >
            <i className={`fa-solid fa-chess-board ${style.icon}`}></i> New
            Table
          </Button>
        </div>
      </div>

      {/* PopupNewTable  */}
      <Modal
        visible={visiblePopupNewTable}
        className={"popupNewTable"}
        footer={null}
        closable={false}
        width={400}
        onCancel={() => {
          setVisiblePopupNewTable(false);
        }}
      >
        <div className={style.title}>
          <i className={`fa-solid fa-chess-board ${style.icon}`}></i> New Table
        </div>

        <Form onFinish={onCreateNewTable} layout="vertical">
          <Form.Item
            name="tableName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên bàn",
              },
            ]}
          >
            <Input className={style.input} />
          </Form.Item>

          <Form.Item name="tablePass" initialValue={""}>
            <Input.Password
              className={style.input}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            style={{
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className={style.newTable} htmlType="submit">
                Create Table
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default memo(TableSearch);
