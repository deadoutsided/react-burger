import React from "react";
import PropTypes from "prop-types";
import style from "./card-ingredient.module.css";
import Modal from "../modal/modal";
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

  const overlay = React.useRef(null);

  const handleCloseBtn = (e) => {
    setHidden(true);
  };

  const handleEscPress = (e) => {
    if (e.key === "Escape") {
      setHidden(true);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlay.current) {
      setHidden(true);
    }
  };

  const modal = //переместить внутринности modal, это отдельный компонент
    (
      <Modal
        ref={overlay}
        isHidden={isHidden}
        renderPlace={props.modal}
        handleCloseBtn={handleCloseBtn}
        handleEscPress={handleEscPress}
        handleOverlayClick={handleOverlayClick}
        title='Детали ингредиента'
      >
        <IngredientDetails
          name={props.name}
          image={props.image_large}
          fat={props.fat}
          proteins={props.proteins}
          calories={props.calories}
          carbohydrates={props.carbohydrates}
        />
      </Modal>
    );

  return (
    <div className={"mb-8 ml-3 mr-3 " + style.ingredient}>
      <img
        className={"pl-4 pr-4 " + style.img}
        src={props.image}
        alt={props.name}
        onClick={handleCardClick}
      ></img>
      <div className={style.price + " mt-1 mb-1"}>
        <p className={"text text_type_digits-default mr-2"}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={"text text_type_main-default " + style.name}>
        {props.name}
      </p>
      <Counter count={1} size="default" extraClass="m-1" />
      {!isHidden && modal}
    </div>
  );
}

CardIngredient.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  modal: PropTypes.any,
  image_large: PropTypes.string,
  fat: PropTypes.number,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  carbohydrates: PropTypes.number
};

export default CardIngredient;
