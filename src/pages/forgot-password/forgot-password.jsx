import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css";
import { forgotPassword } from "../../services/actions";

export function ForgotPassword() {
  const dispatch = useDispatch();
  const { forgotPasswordSuccess, authorized } = useSelector((store) => store.root);
  const [email, setEmail] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  if (authorized) {
    return <Navigate to="/" replace={true}/>;
  }
  
  if (forgotPasswordSuccess) {
    return <Navigate to="/reset-password" replace={true} />;
  }

  return (
    <form className={style.container} onSubmit={onSubmit}>
      <h1 className="mb-6 text text_type_main-medium">Восстановление пароля</h1>
      <EmailInput
        extraClass={"mb-6 "}
        name="email"
        placeholder="Укажите e-mail"
        value={email}
        isIcon={false}
        onChange={changeEmail}
      />
      <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link
          to="/sign-in"
          className={"text text_type_main-default " + style.link}
        >
          Войти
        </Link>
      </p>
    </form>
  );
}
