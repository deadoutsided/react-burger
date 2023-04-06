import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import {
  getSignOutData,
  getUserData,
  getNewToken,
  setUserData,
  requestWithRefresh,
} from "../../services/actions";
import { getCookie } from "../../utils/cookie";
import { OrderCard } from "../../components/order-card/order-card";
import { wsConnectionClose, wsConnectionStart } from "../../services/actions/ws";

export function Profile() {
  const dispatch = useDispatch();
  const {state, pathname} = useLocation();
  const { authData, getUserError, newTokenLoading, newTokenSuccess, accessToken, setUserError, authorized } = useSelector(
    (store) => store.root
  );

  const { wsConnected } = useSelector((store) => store.ws)

  const nameInputRef = useRef(null);

  const [emailValue, setEmail] = useState(
    authData.user.email ?? "" ? authData.user.email : ""
  );
  const [password, setPassword] = useState(
    authData.user.pass ?? "" ? authData.user.pass : ""
  );
  const [nameValue, setName] = useState(
    authData.user.name ?? "" ? authData.user.name : ""
  );

  const [inputDisabled, setInputDisabled] = useState(true);

  useEffect(() => {
    if (authData.user) {
      setEmail(authData.user.email);
      setPassword(authData.user.pass);
      setName(authData.user.name);
    }
  }, [authData]);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const onClick = (e) => {
    dispatch(getSignOutData());
  };

  const onIconClick = (e) => {
    setInputDisabled(false);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const onBlur = () => {
    setInputDisabled(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserData(nameValue, emailValue, password));
  }

  const onReset = (e) => {
    e.preventDefault();
    setEmail(authData.user.email);
    setPassword(authData.user.pass);
    setName(authData.user.name);
  }

  useEffect(() => {
    //if(pathname === '/profile'){
      console.log('open')
    dispatch(wsConnectionStart(getCookie('accessToken').split('Bearer ')[1]));
  // } else  if(pathname !== '/feed' && wsConnected) { console.log('WHYYYY'); dispatch(wsConnectionClose())}
    return () => {
      console.log('WHYYYY');
      dispatch(wsConnectionClose())
    }
  }, [dispatch/* , pathname */])

  const buttons = (
    <div className={style.buttonCont + ' mt-10'}>
      <Button type="secondary" htmlType="reset" size="medium">Отмена</Button>
      <Button type="primary" htmlType="submit" size="medium" >Сохранить</Button>
    </div>
  );

  const profileFrom = (<form onSubmit={onSubmit} onReset={onReset}>
    <Input
      extraClass={"mb-6"}
      onChange={changeName}
      value={nameValue ? nameValue : ""}
      icon={"EditIcon"}
      placeholder="Имя"
      disabled={inputDisabled}
      type="text"
      onIconClick={onIconClick}
      ref={nameInputRef}
      onBlur={onBlur}
    />
    <EmailInput
      extraClass="mb-6"
      name="email"
      placeholder="Логин"
      value={emailValue ? emailValue : ""}
      isIcon={true}
      onChange={changeEmail}
    />
    <PasswordInput
      icon="EditIcon"
      extraClass=""
      onChange={changePassword}
      name="password"
      value={password ? password : ""}
    />
    {(nameValue !== authData.user.name || emailValue !== authData.user.email || password !== authData.user.pass) && buttons}
  </form>);

  const orders = (
    <div className={style.orders + ' pr-2'}>
      {/* <OrderCard to="/profile/orders/:id" />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard /> */}
    </div>
  )

  return (
    <div className={style.container}>
      <div className={style.nav_links}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text text_type_main-medium text_color_inactive " +
                style.link +
                " " +
                style.activeLink
              : "text text_type_main-medium text_color_inactive " + style.link
          }
          end
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            isActive
              ? "text text_type_main-medium text_color_inactive mb-4 mt-4 " +
                style.link +
                " " +
                style.activeLink
              : "text text_type_main-medium text_color_inactive  mb-4 mt-4 " +
                style.link
          }
        >
          История заказов
        </NavLink>
        <Link
          onClick={onClick}
          className={
            "mb-20 text text_type_main-medium text_color_inactive " + style.link
          }
        >
          Выход
        </Link>
        <p className="text text_type_main-default text_color_inactive">
          {pathname === '/profile' ? 'В этом разделе вы можете изменить свои персональные данные' : 'В этом разделе вы можете просмотреть свою историю заказов'}
        </p>
      </div>
      {pathname === '/profile' ? profileFrom : orders}
    </div>
  );
}
