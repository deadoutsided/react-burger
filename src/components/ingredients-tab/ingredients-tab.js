import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './ingredients-tab.module.css'

function IngredientsTab(props) {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div className={style.tabCont}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default IngredientsTab;
