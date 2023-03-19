import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";

export function Profile() {
  
  const [emailValue, setEmail] = useState('');
  const [password, setPassword] = useState('123');
  const [nameValue, setName] = useState('sos');

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const changeName = (e) => {
    setName(e.target.value);
  }

  return (
    <div className={style.container}>
      <div className={style.nav_links}>
        <NavLink
          to="/profile"
          className={({ isActive }) => isActive ?  ("text text_type_main-medium text_color_inactive " + style.link + ' ' + style.activeLink) : ("text text_type_main-medium text_color_inactive " + style.link)}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) => isActive ? ("text text_type_main-medium text_color_inactive mb-4 mt-4 " + style.link + ' ' + style.activeLink) : ("text text_type_main-medium text_color_inactive  mb-4 mt-4 " + style.link)}
        >
          История заказов
        </NavLink>
        <Link to="/" className={"mb-20 text text_type_main-medium text_color_inactive " + style.link}>
          Выход
        </Link>
        <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <Input
          extraClass={"mb-6"}
          onChange={changeName}
          value={nameValue}
          icon={'EditIcon'}
          placeholder="Имя"
        />
        <EmailInput
          extraClass="mb-6"
          name="email"
          placeholder="Логин"
          value={emailValue}
          isIcon={true}
          onChange={changeEmail}
        />
        <PasswordInput
          icon="EditIcon"
          extraClass=""
          onChange={changePassword}
          name="password"
          value={password}
        />
      </div>
    </div>
  );
}
