import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import AccountService from "../../providers/AccountApi/AccountApi";
import {
  AccountInfo,
  CreateAccountInputType,
  LoginInputType,
} from "../../providers/AccountApi/AccountApi.d";
import { setTokenHeader } from "../../providers/Api";

export interface AuthState {
  // check auth
  isAuth: boolean;
  isLoadingLocalAuth: boolean;

  // token
  token: string | undefined;

  // account info
  accountInfo: AccountInfo | undefined;
}

const initialState: AuthState = {
  isAuth: false,
  isLoadingLocalAuth: true,

  token: undefined,

  accountInfo: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // auth screen
    loadLocalAuthSuccess(state, action: PayloadAction<undefined>) {
      state.isAuth = true;
    },

    loadLocalAuthNoData(state) {
      state.isLoadingLocalAuth = false;
    },

    // setToken
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    // set account info
    setAccountInfo(state, action: PayloadAction<AccountInfo>) {
      state.accountInfo = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

// load local auth
export const loadLocalAuth = () => async (dispatch: Dispatch) => {
  // get token in cookie
  const cookieString = document.cookie.split(";");
  let token: string | undefined = undefined;
  for (let i = 0; i < cookieString.length; i++) {
    if (cookieString[i].includes("CaroToken=")) {
      token = cookieString[i].trim().replaceAll("CaroToken=", "");
    }
  }
  if (token) {
    setTokenHeader(token);
    dispatch(authActions.setToken(token));
    dispatch(authActions.loadLocalAuthNoData());
    dispatch(authActions.loadLocalAuthSuccess());
    getMyInfo()(dispatch);
  } else {
    dispatch(authActions.loadLocalAuthNoData());
  }
};

// login
export const submitLogin =
  (loginData: LoginInputType) => async (dispatch: Dispatch) => {
    try {
      const res = await AccountService.login(loginData);
      if (res && res.data && res.data.status === "Success") {
        const { userData, token } = res.data.data;
        dispatch(authActions.setAccountInfo(userData));

        document.cookie = `CaroToken=${token}; ; expires=Wed, 16 Feb 2023 09:12:40 path=/`;
        //
        setTokenHeader(token);
        dispatch(authActions.setToken(token));
        dispatch(authActions.loadLocalAuthSuccess());
      }
    } catch {
      message.error("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

// // get my info
export const getMyInfo = () => async (dispatch: Dispatch) => {
  try {
    const res = await AccountService.getAccountInfo();
    if (res && res.data && res.data.status === "Success") {
      const AccountInfo = res.data.data;
      dispatch(authActions.setAccountInfo(AccountInfo));
    }
  } catch {}
};

// // register
export const onSubmitRegister =
  (data: CreateAccountInputType, cb: () => void) => async () => {
    try {
      const res = await AccountService.createAccount(data);
      if (res.data.status === "Success") {
        message.success("Tạo tài khoản thành công");
        cb();
      }
    } catch (e: any) {
      message.error("Tạo tài khoản không thành công");
    }
  };
