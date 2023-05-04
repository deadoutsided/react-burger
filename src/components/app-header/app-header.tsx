import React, {FC} from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";
import header from "./app-header.module.css";
import NavigationLink from "../navigation-link/navigation-link";

const AppHeader: FC = () => {
  const { pathname } = useLocation();
  
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
            <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
          </NavigationLink>
          <NavigationLink to="/feed" text="Лента заказов" flex={true}>
            <ListIcon type={pathname.includes('/feed') ? "primary" : "secondary"} />
          </NavigationLink>
        </div>
        <Logo />
        <NavigationLink to="/profile" text="Личный кабинет" flex={false}>
          <ProfileIcon type={pathname.includes('/profile') ? "primary" : "secondary"} />
        </NavigationLink>
      </nav>
    </header>
  );
}

export default AppHeader;
