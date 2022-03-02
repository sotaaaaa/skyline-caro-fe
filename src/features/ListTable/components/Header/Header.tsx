import { Button } from "antd";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, AuthState } from "../../../../redux/slides/auth.slice";
import { ListAvatar } from "../../../../Util/ListAvatar";
import { useNavigate } from "react-router";

import style from "./Header.module.scss";

const Header: FC = () => {
  const { accountInfo } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    document.cookie = `CaroToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    dispatch({ type: "LOGOUT" });
    dispatch(authActions.loadLocalAuthNoData());
    navigate("/");
  };

  return (
    <div className={style.header}>
      <div className={style.user}>
        <div className={style.avatar}>
          <img
            src={accountInfo ? ListAvatar[accountInfo.avatar] : ListAvatar[0]}
            className={style.avatarImg}
          ></img>
        </div>
        <div className={style.username}>{accountInfo?.username}</div>
      </div>

      <Button
        className={style.button}
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
};
export default memo(Header);
