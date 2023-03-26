import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Typography,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, NavLink } from "react-router-dom";
import header from "./app-header.module.css";
import NavigationLink from "../navigation-link/navigation-link";

function AppHeader(props) {
  const navigate = useNavigate();

  const clickProfile = () => {
    navigate("/profile");
  };
  return (
    <header className={header.header}>
      <nav className={header.nav}>
        <div className={header.navLinkContainer}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text text_type_main-medium text_color_inactive " +
                  header.link +
                  " " +
                  header.activeLink
                : "text text_type_main-medium text_color_inactive " +
                  header.link
            }
            state={{title:"constructor"}}
          >
            <NavigationLink text="Конструктор" flex={true}>
              <BurgerIcon type="primary" onClick={undefined} />
            </NavigationLink>
          </NavLink>
          <NavLink
            to="/order-list"
            className={({ isActive }) =>
              isActive
                ? "text text_type_main-medium text_color_inactive " +
                  header.link +
                  " " +
                  header.activeLink
                : "text text_type_main-medium text_color_inactive " + header.link
            }
          >
            <NavigationLink text="Лента заказов" flex={true}>
              <ListIcon type="primary" onClick={undefined} />
            </NavigationLink>
          </NavLink>
        </div>
        <Logo />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text text_type_main-medium text_color_inactive " +
                header.link +
                " " +
                header.activeLink + ' ' + header.contacts
              : "text text_type_main-medium text_color_inactive " + header.link
          }
        >
          <NavigationLink
            click={clickProfile}
            text="Личный кабинет"
            flex={false}
          >
            <ProfileIcon type="primary" onClick={undefined} />
          </NavigationLink>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
