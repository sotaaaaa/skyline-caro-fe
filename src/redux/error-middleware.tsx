import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { AxiosError } from "axios";

export const errorMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  async (action: any) => {
    try {
      return await next(action);
    } catch (error: any) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          // store.dispatch({ type: 'LOGOUT' });
          // localStorage.clear();
          // sessionStorage.clear();
          // window.location.reload();
          return;
        }
      }
      return;
    }
  };
