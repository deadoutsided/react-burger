import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import style from "./sign-in.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSignInData } from "../../services/actions";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function SignIn() {
  const dispatch = useDispatch();
  const { authData } = useSelector((store) => store.root);

  const [emailValue, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getSignInData(emailValue, password));
  }

  if (authData.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={style.container} onSubmit={onSubmit}>
      <h1 className={"mb-6 text text_type_main-medium"}>Вход</h1>
      <EmailInput
        extraClass={"mb-6 "}
        name="email"
        placeholder="Login"
        value={emailValue}
        isIcon={false}
        onChange={changeEmail}
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        value={password}
        onChange={changePassword}
      />
      <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
      <p className={"mb-4 text text_type_main-default text_color_inactive"}>
        Вы — новый пользователь?{" "}
        <Link
          to="/register"
          className={
            "text text_type_main-default text_color_inactive " + style.link
          }
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className={"mb-4 text text_type_main-default text_color_inactive"}>
        Забыли пароль?{" "}
        <Link
          to="/forgot-password"
          className={
            "text text_type_main-default text_color_inactive " + style.link
          }
        >
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
}
