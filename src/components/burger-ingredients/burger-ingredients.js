import React from "react";
import style from "./burder-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import CardIngredient from "../card-ingredient/card-ingredient";
import PropTypes from "prop-types";
import { BurgerIngredientsContext } from "../../services/burger-ingredients-context";

function BurgerIngredients(props) {
  const [state, setState] = React.useContext(BurgerIngredientsContext);
  //const ingredients = data.ingredientData;

  return (
    <section className={"mr-5 " + style.section}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <IngredientsTab />
      <div className={style.scrollable}>
        <p className="text text_type_main-medium mt-10">Булки</p>
        <div className={"pt-6 " + style.ingredientCont}>
          {state.ingredientData.map((element) => {
            if (element.type === "bun")
              return (
                <CardIngredient
                  ingredient={element}
                  key={element._id}
                />
              );
          })}
        </div>
        <p className="text text_type_main-medium mt-2">Соусы</p>
        <div className={style.ingredientCont}>
          {state.ingredientData.map((element) => {
            if (element.type === "sauce")
              return (
                <CardIngredient
                  ingredient={element}
                  key={element._id}
                />
              );
          })}
        </div>
        <p className="text text_type_main-medium mt-2">Начинка</p>
        <div className={style.ingredientCont}>
          {state.ingredientData.map((element) => {
            if (element.type === "main")
              return (
                <CardIngredient
                  ingredient={element}
                  key={element._id}
                />
              );
          })}
        </div>
      </div>
    </section>
  );
}

/*BurgerIngredients.propTypes = {
  data: PropTypes.array
}*/

export default BurgerIngredients;
