import { authReducer } from "./slides/auth.slice";
import { tableReducer } from "./slides/table.slice";

const rootReducers = {
  auth: authReducer,
  table: tableReducer,
};

export default rootReducers;
