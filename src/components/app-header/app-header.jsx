import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Typography,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, NavLink } from "react-router-dom";
import header from "./app-header.module.css";
import NavigationLink from "../navigation-link/navigation-link";

function AppHeader(props) {
  const { pathname } = useLocation();

  /*const clickProfile = () => {
    navigate("/profile");
  };*/
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
            <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} onClick={undefined} />
          </NavigationLink>
          <NavigationLink to="/order-list" text="Лента заказов" flex={true}>
            <ListIcon type={pathname === '/order-list' ? "primary" : "secondary"} onClick={undefined} />
          </NavigationLink>
        </div>
        <Logo />
        <NavigationLink to="/profile" text="Личный кабинет" flex={false}>
          <ProfileIcon type={pathname.includes('/profile') ? "primary" : "secondary"} onClick={undefined} />
        </NavigationLink>
      </nav>
    </header>
  );
}

export default AppHeader;
