import Axios from "axios";

const Api = Axios.create({
  baseURL: "http://158.247.220.94:8000/caro",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});

export const setTokenHeader = (accessToken: string) => {
  Api.defaults.headers.common["Authorization"] = `${accessToken}`;
};

export const removeTokenHeader = () => {
  delete Api.defaults.headers.common["Authorization"];
};

export type ResStatus =
  | "Bad Request"
  | "Unauthorized"
  | "Forbidden"
  | "Not Found"
  | "Unsupported Action"
  | "Validation Failed"
  | "Internal Server Error"
  | "Created"
  | "Success"
  | "Too Many Requests";

export default Api;
