import Api from "../../providers/Api";
import {
  CreateTableInputType,
  CreateTableResType,
  GetListTableResType,
  GetTableDetailResType,
} from "./TableApi.d";

export default class TableService {
  //----------get-list-table----------//
  static getTableList = async () => {
    return await Api.get<GetListTableResType>("/table");
  };

  static getTableById = async (id: string) => {
    return await Api.get<GetTableDetailResType>(`/table/${id}`);
  };

  //----------create-table----------//
  static createTable = async (data: CreateTableInputType) => {
    return await Api.post<CreateTableResType>("/table/create", data);
  };

  //----------join-table----------//
  static joinTable = async (id: string, password?: string) => {
    if (password) {
      let data = {
        tablePassword: password,
      };
      return await Api.post(`/table/join/${id}`, data);
    } else {
      return await Api.post(`/table/join/${id}`);
    }
  };

  //   //----------create-table----------//
  //   static createTable = async () => {
  //     return await Api.post<CreateTableResType>("/table/create");
  //   };
}
