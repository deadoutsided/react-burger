import React from "react";
import style from "./burder-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import CardIngredient from "../card-ingredient/card-ingredient";

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={"mr-5 " + style.section}>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
        <IngredientsTab />
        <div className={style.scrollable}>
          {
            //      this.scroll = document.querySelector('.' + style.scrollable);
            //    console.log(this.scroll);
          }
          <p className="text text_type_main-medium mt-10">Булки</p>
          <div className={"pt-6 " + style.ingredientCont}>
            {this.props.data.map((element) => {
              if (element.type === "bun")
                return (
                  <CardIngredient
                    image={element.image}
                    price={element.price}
                    name={element.name}
                    key={element._id}
                  />
                );
            })}
          </div>
          <p className="text text_type_main-medium mt-2">Соусы</p>
          <div className={style.ingredientCont}>
            {this.props.data.map((element) => {
              if (element.type === "sauce")
                return (
                  <CardIngredient
                    image={element.image}
                    price={element.price}
                    name={element.name}
                    key={element._id}
                  />
                );
            })}
          </div>
          <p className="text text_type_main-medium mt-2">Начинка</p>
          <div className={style.ingredientCont}>
            {this.props.data.map((element) => {
              if (element.type === "main")
                return (
                  <CardIngredient
                    image={element.image}
                    price={element.price}
                    name={element.name}
                    key={element._id}
                  />
                );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;
