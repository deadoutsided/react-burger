import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './ingredients-tab.module.css'

function IngredientsTab(props) {
  return (
    <div className={style.tabCont}>
      <Tab value="bun" active={props.current === "bun"} onClick={props.setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={props.current === "sauce"} onClick={props.setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={props.current === "main"} onClick={props.setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default IngredientsTab;
