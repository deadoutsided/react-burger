import React, {FC} from "react";
import style from "./ingredient-details.module.css";
import { TIngredient } from "../../services/types/types";

type TIngrDetailsProps = {
  ingredient: TIngredient | null;
}

const IngredientDetails: FC<TIngrDetailsProps> = (props) => {
  return (
    <div className={style.detailsCont}>
      <img
        src={props.ingredient?.image_large}
        alt={props.ingredient?.name}
        className={"pl-5 pr-5 " + style.image}
      />
      <p className={"text text_type_main-medium mt-4 mb-8"}>{props.ingredient?.name}</p>
      <div className={style.nutrients + ' pb-5'}>
        <div className={"pr-5 " + style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.ingredient?.calories}</p>
        </div>
        <div className={"pr-5 " + style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.ingredient?.proteins}</p>
        </div>
        <div className={"pr-5 " + style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.ingredient?.fat}</p>
        </div>
        <div className={style.nutrientCont}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className={'text text_type_digits-default text_color_inactive'}>{props.ingredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;