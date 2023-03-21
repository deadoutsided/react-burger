import React, { useState } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import { getSignOutData } from "../../services/actions";
import { getCookie } from "../../utils/cookie";

export function Profile() {
  const dispatch = useDispatch();
  const { authData } = useSelector((store) => store.root)
  
  const [emailValue, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameValue, setName] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const changeName = (e) => {
    setName(e.target.value);
  }

  const onClick = (e) => {
    dispatch(getSignOutData());
    console.log(getCookie('token'));
  }

  if(!authData.user){
    return (<Navigate to="/sign-in" />)
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
        <Link onClick={onClick} className={"mb-20 text text_type_main-medium text_color_inactive " + style.link}>
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
