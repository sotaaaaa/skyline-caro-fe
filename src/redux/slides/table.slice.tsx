import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { NavigateFunction } from "react-router";
import { message } from "antd";
import {
  CreateTableInputType,
  TableItem,
} from "../../providers/TableApi/TableApi.d";
import TableService from "../../providers/TableApi/TableApi";

export interface TableState {
  tableDetail: TableItem | undefined;
  listTable: TableItem[];
}

const initialState: TableState = {
  tableDetail: undefined,
  listTable: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setListTable(state, action: PayloadAction<TableItem[]>) {
      state.listTable = action.payload;
    },

    setTableDetail(state, action: PayloadAction<TableItem | undefined>) {
      state.tableDetail = action.payload;
    },
  },
});

export const tableReducer = tableSlice.reducer;
export const tableActions = tableSlice.actions;

// get list table
export const getListTable = () => async (dispatch: Dispatch) => {
  try {
    const res = await TableService.getTableList();
    if (res && res.data && res.data.status === "Success") {
      dispatch(tableActions.setListTable(res.data.data.data));
    }
  } catch {}
};

export const getTableById = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await TableService.getTableById(id);
    if (res && res.data && res.data.status === "Success") {
      if (res.data.data) {
        dispatch(tableActions.setTableDetail(res.data.data));
      }
    }
  } catch {}
};

export const updateListTable =
  (id: string, listTable: TableItem[]) => async (dispatch: Dispatch) => {
    try {
      const res = await TableService.getTableById(id);
      if (res && res.data && res.data.status === "Success") {
        if (res.data.data) {
          let newTable = res.data.data;
          let count = 0;
          let updatedList: TableItem[] = [];
          for (let i = 0; i < listTable.length; i++) {
            if (listTable[i]._id === newTable._id) {
              count++;
              updatedList.push(newTable);
            } else {
              updatedList.push(listTable[i]);
            }
          }
          if (count === 0) {
            updatedList.push(newTable);
          }
          dispatch(tableActions.setListTable(updatedList));
        }
      }
    } catch {}
  };
// // create table
export const createTable =
  (data: CreateTableInputType, navigate: NavigateFunction) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await TableService.createTable(data);
      if (res && res.data && res.data.status === "Success") {
        if (res.data.data) {
          dispatch(tableActions.setTableDetail(res.data.data));
          navigate(`/play?id=${res.data.data?._id}`);
        }
      }
    } catch {
      message.error("Tạo bàn không thành công");
    }
  };

export const joinTable =
  (
    id: string,
    navigate: NavigateFunction,
    password?: string,
    cb?: (e: string) => void
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await TableService.joinTable(id, password);
      if (res && res.data && res.data.status === "Success") {
        if (res.data.data) {
          dispatch(tableActions.setTableDetail(res.data.data));
          navigate(`/play?id=${res.data.data?._id}`);
        }
      }
    } catch (e: any) {
      console.log(e.response);
      if ((e.response.data.msg = "Mật khẩu không chính xác")) {
        if (cb) {
          cb("incorrect password");
        }
      } else {
        message.error("Tham gia bàn không thành công");
      }
    }
  };
