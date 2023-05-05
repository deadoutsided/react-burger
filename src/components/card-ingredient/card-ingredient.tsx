import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/index";
import { Link, useLocation } from "react-router-dom";
import style from "./card-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_CURRENT_INGREDIENT } from "../../services/constants/modal";
import { useDrag } from "react-dnd/dist/hooks";
import { TIngredient } from "../../services/types/types";

type TCardProps = {
  id: string;
  ingredient: TIngredient | null;
  handleCardClick: () => void;
}

const CardIngredient: FC<TCardProps> = (props) => {
  const { id, ingredient } = props;
  const dispatch = useDispatch();
  const { ingredientData } = useSelector(
    (store) => store.ingredients
  );
  const { constructorIngredients } = useSelector((store) => store.construct);
  const [count, setCount] = useState(0);
  const { pathname } = useLocation();
  const url = window.location.href;

  const [{ }, dragRef] = useDrag<TIngredient | null, unknown, TIngredient>({
    type: "ingredient",
    item: ingredient,
  });

  useEffect(() => {
    constructorIngredients?.reduce((acc, el) => {
      if (el._id === id) {
        acc += 1;
      }
      setCount(acc);
      return acc;
    }, 0);
    if (!constructorIngredients?.length) {
      setCount(0);
    }
  });

  const onClick = () => {
    const ingredient = ingredientData?.find((el) => el._id === id);
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: ingredient });
    props.handleCardClick();
  };

  return (
    <div
      ref={dragRef}
      onClick={onClick}
      className={"mb-8 ml-3 mr-3 " + style.ingredient}
    >
      <Link
        to={`/ingredients/${id}`}
        state={{ path: pathname, url, title: "ingredient" }}
        className={'text text_type_main-default ' + style.link + ' ' + style.ingredient}
      >
        <img
          className={"pl-4 pr-4 " + style.img}
          src={props.ingredient?.image}
          alt={props.ingredient?.name}
        />
        <div className={style.price + " mt-1 mb-1"}>
          <p className={"text text_type_digits-default mr-2"}>
            {props.ingredient?.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={"text text_type_main-default " + style.name}>
          {props.ingredient?.name}
        </p>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      </Link>
    </div>
  );
}

export default CardIngredient;
