import { Button, Form, Input } from "antd";
import { FC, memo } from "react";
import style from "./PopupSignIn.module.scss";
import LogoCaro from "../../../../assets/caro-logo.png";
import { LoginInputType } from "../../../../providers/AccountApi/AccountApi.d";
import { useDispatch } from "react-redux";
import { submitLogin } from "../../../../redux/slides/auth.slice";
interface P {
  setPopupActive: (e: "sign-in" | "sign-up") => void;
}
const PopupSignIn: FC<P> = (props) => {
  const { setPopupActive } = props;
  const dispatch = useDispatch();

  const onSubmitLogin = (e: any) => {
    const data: LoginInputType = {
      username: e.username.toUpperCase(),
      password: e.password,
    };
    dispatch(submitLogin(data));
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src={LogoCaro} alt="caro-logo" className={style.caroLogo}></img>
      </div>

      <div className={style.form}>
        <Form onFinish={onSubmitLogin} layout="vertical">
          <Form.Item
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
              placeholder="Username"
              prefix={<i className="fa-solid fa-user-astronaut"></i>}
            />
          </Form.Item>

          <Form.Item
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
              placeholder="Password"
              prefix={<i className="fa-solid fa-key"></i>}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div className={style.submit}>
              <Button type="primary" htmlType="submit" className={style.button}>
                Sign in
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      <div className={style.subText} onClick={() => {}}>
        Don't have account ?{" "}
        <span
          className={style.signUp}
          onClick={() => {
            setPopupActive("sign-up");
          }}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};
export default memo(PopupSignIn);
