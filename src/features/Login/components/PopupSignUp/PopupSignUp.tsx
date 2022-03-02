import { Button, Form, Input } from "antd";
import { FC, memo, useState } from "react";
import style from "./PopupSignUp.module.scss";
import { ListAvatar } from "../../../../Util/ListAvatar";
import { useDispatch } from "react-redux";
import { CreateAccountInputType } from "../../../../providers/AccountApi/AccountApi.d";
import { onSubmitRegister } from "../../../../redux/slides/auth.slice";

interface P {
  setPopupActive: (e: "sign-in" | "sign-up") => void;
}

const PopupSignUp: FC<P> = (props) => {
  const { setPopupActive } = props;
  const dispatch = useDispatch();

  const [selectedAvatar, setSelectedAvatar] = useState<number>(0);

  const onSignUp = (e: any) => {
    const data: CreateAccountInputType = {
      username: e.username.toUpperCase(),
      password: e.password,
      avatar: selectedAvatar,
    };

    let cb = () => {
      setPopupActive("sign-in");
    };

    dispatch(onSubmitRegister(data, cb));
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Sign up</div>

      <div className={style.form}>
        <Form onFinish={onSignUp} layout="vertical" requiredMark={false}>
          <Form.Item
            label={<div className={style.label}>Username</div>}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            className={style.formItem}
          >
            <Input
              className={style.input}
              prefix={<i className="fa-solid fa-user-astronaut"></i>}
            />
          </Form.Item>

          <Form.Item
            label={<div className={style.label}>Passowrd</div>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            className={style.formItem}
          >
            <Input.Password
              className={style.input}
              autoComplete="new-password"
              visibilityToggle={false}
              prefix={<i className="fa-solid fa-key"></i>}
            />
          </Form.Item>

          <div className={style.choseAvatar}>
            <div className={style.label}>choose avatar</div>
            <div className={style.avatarContainer}>
              {ListAvatar.map((e, i) => (
                <img
                  className={`${style.avatarItem} ${
                    selectedAvatar === i ? style.choosed : ""
                  }`}
                  src={e}
                  alt={`avatar_${i}`}
                  key={`avatar_${i}`}
                  onClick={() => {
                    setSelectedAvatar(i);
                  }}
                ></img>
              ))}
            </div>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <div className={style.submit}>
              <Button type="primary" htmlType="submit" className={style.button}>
                Sign up
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      <div className={style.subText} onClick={() => {}}>
        Already have account ?{" "}
        <span
          className={style.signUp}
          onClick={() => {
            setPopupActive("sign-in");
          }}
        >
          Sign in
        </span>
      </div>
    </div>
  );
};
export default memo(PopupSignUp);
