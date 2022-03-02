import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  AnyAction,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Action, combineReducers } from "@reduxjs/toolkit";
import { errorMiddleware } from "./error-middleware";
import rootReducers from "./reducer";

const _combineReducers = combineReducers({
  ...rootReducers,
});

const storeReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return _combineReducers(state, action);
};

const middlewares: Middleware[] = [errorMiddleware, thunk];

const store = createStore(
  storeReducer,
  composeWithDevTools(compose(applyMiddleware(...middlewares)))
);

export type Reducers = ReturnType<typeof _combineReducers>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export { store };
