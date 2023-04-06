import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Typography,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import { wsConnectionClose } from "../../services/actions/ws";
import { useDispatch, useSelector } from "react-redux";
import header from "./app-header.module.css";
import NavigationLink from "../navigation-link/navigation-link";

function AppHeader(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { wsConnected } = useSelector((store) => store.ws)

  const onClick = () => {
    //if(wsConnected) dispatch(wsConnectionClose())
  }
  
  return (
    <header className={header.header}>
      <nav className={header.nav}>
        <div className={header.navLinkContainer}>
          <NavigationLink
            to="/"
            state={{ title: "constructor" }}
            text="Конструктор"
            flex={true}
          >
            <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} onClick={onClick} />
          </NavigationLink>
          <NavigationLink to="/feed" text="Лента заказов" flex={true}>
            <ListIcon type={pathname.includes('/feed') ? "primary" : "secondary"} onClick={onClick} />
          </NavigationLink>
        </div>
        <Logo />
        <NavigationLink to="/profile" text="Личный кабинет" flex={false}>
          <ProfileIcon type={pathname.includes('/profile') ? "primary" : "secondary"} onClick={onClick} />
        </NavigationLink>
      </nav>
    </header>
  );
}

export default AppHeader;
