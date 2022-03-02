import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Login from "./features/Login/Login";
import PlayGame from "./features/PlayGame/PlayGame";
import ListTable from "./features/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, loadLocalAuth } from "./redux/slides/auth.slice";
import { TableState } from "./redux/slides/table.slice";

function App() {
  const { isAuth } = useSelector<RootState, AuthState>((state) => state.auth);
  const { tableDetail } = useSelector<RootState, TableState>(
    (state) => state.table
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLocalAuth());
  }, []);

  if (!isAuth) {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<ListTable />}></Route>
        {tableDetail && <Route path="/play" element={<PlayGame />}></Route>}
      </Routes>
    </div>
  );
}

export default App;
