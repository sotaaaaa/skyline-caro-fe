import { ResStatus } from "../../providers/Api";

export interface TableItem {
  _id: string;
  tableName: string;
  index: number;
  member: {
    username: string;
    _id: string;
    avatar: number;
    score: number;
    playerType: number;
  }[];
  status: "watting" | "full";
  private: boolean;
  createAt: number;
  updateAt: number;
  __v: number;
}

// get list table
export interface GetListTableResType {
  status: string;
  data: {
    data: TableItem[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export interface GetTableDetailResType {
  status: ResStatus;
  data: TableItem;
}

// create table

export interface CreateTableInputType {
  tableName: string;
  password?: string;
}

export interface CreateTableResType {
  status: ResStatus;
  data?: TableItem;
  mgs?: string;
}
