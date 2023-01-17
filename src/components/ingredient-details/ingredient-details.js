import React from "react";
import style from "./ingredient-details.module.css";
import PropTypes from "prop-types";

export default function IngredientDetails(props) {
  return (
    <div className={style.detailsCont}>
      <img
        src={props.image}
        alt={props.name}
        className={"pl-5 pr-5 " + style.image}
      />
      <p className={"text text_type_main-medium mt-4 mb-8"}>{props.name}</p>
      <div className={style.nutrients + ' pb-15'}>
        <div className={"pr-5 " + style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.calories}</p>
        </div>
        <div className={"pr-5 " + style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.proteins}</p>
        </div>
        <div className={"pr-5 " + style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.fat}</p>
        </div>
        <div className={style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fats: PropTypes.number,
  carbohydrates: PropTypes.number
}