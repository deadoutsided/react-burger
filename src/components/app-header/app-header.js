import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import header from './app-header.module.css';
import NavigationLink from '../navigation-link/navigation-link'

function AppHeader(props) {

  return (
    <header className={header.header} >
      <nav className={header.nav}>
        <div className={header.navLinkContainer}>
          <NavigationLink text="Конструктор" flex={true}>
            <BurgerIcon type="primary" onClick={undefined} />
          </NavigationLink>
          <NavigationLink text="Лента заказов" flex={true}>
            <ListIcon type="primary" onClick={undefined} />
          </NavigationLink>
        </div>
        <Logo />
        <NavigationLink text="Личный кабинет" flex={false}>
          <ProfileIcon type="primary" onClick={undefined} />
        </NavigationLink>
      </nav>
    </header>
  )
}

export default AppHeader;