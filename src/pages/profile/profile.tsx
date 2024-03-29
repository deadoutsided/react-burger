import React, { useState, useEffect, useRef, FormEvent, FC } from "react";
import { NavLink, Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types/index";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import {
  getSignOutData,
  setUserData,
} from "../../services/actions";
import { getCookie } from "../../utils/cookie";
import { OrderCard } from "../../components/order-card/order-card";
import { wsPersonalConnectionClose, wsPersonalConnectionStart } from "../../services/actions/ws-personal";

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const {state, pathname} = useLocation();
  const { authData } = useSelector(
    (store) => store.root
  );

  const { ordersPersonalData } = useSelector((store) => store.wsPersonal)

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [emailValue, setEmail] = useState(
    authData.user?.email ?? "" ? authData.user?.email : ""
  );
  const [password, setPassword] = useState(
    authData.user?.pass ?? "" ? authData.user?.pass : ""
  );
  const [nameValue, setName] = useState(
    authData.user?.name ?? "" ? authData.user?.name : ""
  );

  const [inputDisabled, setInputDisabled] = useState(true);

  useEffect(() => {
    if (authData.user) {
      setEmail(authData.user.email);
      setPassword(authData.user.pass);
      setName(authData.user.name);
    }
  }, [authData]);

  const changeEmail = (e: {target: HTMLInputElement}) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: {target: HTMLInputElement}) => {
    setPassword(e.target.value);
  };

  const changeName = (e: {target: HTMLInputElement}) => {
    setName(e.target.value);
  };

  const onClick = () => {
    dispatch(getSignOutData());
  };

  const onIconClick = () => {
    setInputDisabled(false);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const onBlur = () => {
    setInputDisabled(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setUserData(nameValue, emailValue, password));
  }

  const onReset = (e: FormEvent) => {
    e.preventDefault();
    setEmail(authData.user?.email);
    setPassword(authData.user?.pass);
    setName(authData.user?.name);
  }

  useEffect(() => {
    dispatch(wsPersonalConnectionStart(getCookie('accessToken').split('Bearer ')[1]));
    return () => {
      dispatch(wsPersonalConnectionClose())
    }
  }, [dispatch])

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
    {(nameValue !== authData.user?.name || emailValue !== authData.user?.email || password !== authData.user?.pass) && buttons}
  </form>);

  const orders = (
    <div className={style.orders + ' pr-2'}>
      {ordersPersonalData?.orders?.map((el) => {
        return (
          <OrderCard key={el.number}  createdAt={el.createdAt} ingredients={el.ingredients} name={el.name} number={el.number} owner={el.owner} price={el.price} status={el.status} updatedAt={el.updatedAt} _id={el._id} />
        )
      })}
    </div>
  )
  if(state !== 'notRefreshed' && pathname === '/profile/orders') return <Navigate to='/profile' state="refreshed"/>

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
          state={'notRefreshed'}
        >
          История заказов
        </NavLink>
        <Link
          to=""
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
