import { ResStatus } from "../../providers/Api";

//----------account-info----------//
export interface AccountInfo {
  _id: string;
  username: string;
  playHistory: {
    totalGame: number;
    winGame: number;
    loseGame: number;
    drawGame: number;
  };
  createdAt: number;
  updatedAt: number;
  avatar: number;
}
//------------------------------//

//----------login----------//
export interface LoginInputType {
  username: string;
  password: string;
}

export interface LoginResType {
  status: ResStatus;
  data: {
    userData: AccountInfo;
    token: string;
  };
}
//------------------------------//

//----------create-account----------//
export interface CreateAccountInputType {
  username: string;
  password: string;
  avatar: number;
}

export interface CreateAccountResType {
  status: ResStatus;
  data: {
    userData: AccountInfo;
  };
}
//------------------------------//

//----------get-account-info----------//
export interface GetUserInfoResType {
  status: ResStatus;
  data: AccountInfo;
}
//------------------------------//

//----------logout----------//
export interface LogoutResType {
  status: ResStatus;
}
//------------------------------//
