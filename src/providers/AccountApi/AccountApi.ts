import Api from "../../providers/Api";
import {
  CreateAccountInputType,
  CreateAccountResType,
  GetUserInfoResType,
  LoginInputType,
  LoginResType,
  LogoutResType,
} from "./AccountApi.d";

export default class AccountService {
  //----------login----------//
  static login = async (data: LoginInputType) => {
    return await Api.post<LoginResType>("/login", data);
  };

  //----------logout----------//
  static logout = async () => {
    return await Api.post<LogoutResType>("/logout");
  };

  //----------create-account----------//
  static createAccount = async (data: CreateAccountInputType) => {
    return await Api.post<CreateAccountResType>("/user/create", data);
  };

  //----------get-account-info----------//
  static getAccountInfo = async (id?: string) => {
    let url = "";
    if (id) {
      url = `/user/info/${id}`;
    } else {
      url = "/user/info";
    }
    return await Api.get<GetUserInfoResType>(url);
  };
}
