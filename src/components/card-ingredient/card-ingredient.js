import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import style from "./card-ingredient.module.css";
import ingredientType from "../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_CURRENT_INGREDIENT } from "../../services/actions";
import { useDrag } from "react-dnd/dist/hooks";

function CardIngredient(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const { ingredientData } = useSelector(store => store.root);

  const [{}, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
  })

  const onClick = (e) => {
    const ingredient = ingredientData.find((el) => el._id === id);
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: ingredient })
    props.handleCardClick();
  }

  return (
    <div ref={dragRef} onClick={onClick} className={"mb-8 ml-3 mr-3 " + style.ingredient}>
      <img
        className={"pl-4 pr-4 " + style.img}
        src={props.ingredient.image}
        alt={props.ingredient.name}
      ></img>
      <div className={style.price + " mt-1 mb-1"}>
        <p className={"text text_type_digits-default mr-2"}>{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={"text text_type_main-default " + style.name}>
        {props.ingredient.name}
      </p>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
}

/*CardIngredient.propTypes = {
  ingredient: ingredientType.isRequired 
}*/

export default CardIngredient;
