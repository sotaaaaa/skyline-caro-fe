import { FC, memo, useState } from "react";
import PopupSignIn from "./components/PopupSignIn/PopupSignIn";
import PopupSignUp from "./components/PopupSignUp/PopupSignUp";
import style from "./Login.module.scss";

const Login: FC = () => {
  const [activePopup, setActivePopup] = useState<"sign-in" | "sign-up">(
    "sign-in"
  );

  return (
    <div className={style.container}>
      {activePopup === "sign-in" && (
        <PopupSignIn setPopupActive={setActivePopup} />
      )}
      {activePopup === "sign-up" && (
        <PopupSignUp setPopupActive={setActivePopup} />
      )}
    </div>
  );
};
export default memo(Login);
