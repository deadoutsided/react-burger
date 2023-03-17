import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

export function SignIn() {

  const [emailValue, setEmail] = useState('cc');
  const [password, setPassword] = useState('123');

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div>
      <h1>Вход</h1>
      <EmailInput name="email" placeholder="Login" value={emailValue} isIcon={false} onChange={emailChange} />
      <PasswordInput name="password" value={password} onChange={passwordChange} />
      <Button htmlType="submit" type="primary" size="medium" />
      <p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
      <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
    </div>
  );
}
