import React from "react";
import PropTypes from "prop-types";
import style from "./card-ingredient.module.css";
import Modal from "../modal/modal";
import ingredientType from "../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";

function CardIngredient(props) {
  const [isHidden, setHidden] = React.useState(true);

  const handleCardClick = (e) => {
    setHidden(false);
  };

  const handleClose = (e) => {
    setHidden(true);
  };

  const modal =
    (
      <Modal
        handleClose={handleClose}
        title='Детали ингредиента'
      >
        <IngredientDetails
          ingredient={props.ingredient}
        />
      </Modal>
    );

  return (
    <div className={"mb-8 ml-3 mr-3 " + style.ingredient}>
      <img
        className={"pl-4 pr-4 " + style.img}
        src={props.ingredient.image}
        alt={props.ingredient.name}
        onClick={handleCardClick}
      ></img>
      <div className={style.price + " mt-1 mb-1"}>
        <p className={"text text_type_digits-default mr-2"}>{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={"text text_type_main-default " + style.name}>
        {props.ingredient.name}
      </p>
      <Counter count={1} size="default" extraClass="m-1" />
      {!isHidden && modal}
    </div>
  );
}

CardIngredient.propTypes = ingredientType;

export default CardIngredient;
