import React, { useEffect, useRef, useState } from "react";
import style from "./burder-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import CardIngredient from "../card-ingredient/card-ingredient";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_CURRENT_INGREDIENT, getIngredientData } from "../../services/actions";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function BurgerIngredients(props) {
  const { ingredientData, currentIngredient } = useSelector((store) => store.root);

  const [isHidden, setHidden] = useState(true);
  const [current, setCurrent] = useState("bun");
  const buns = useRef(null);
  const sauces = useRef(null);
  const mains = useRef(null);
  const scrollable = useRef(null);

  const handleCardClick = (e) => {
    setHidden(false);
  };

  const handleClose = (e) => {
    dispatch({ type: DELETE_CURRENT_INGREDIENT })
    setHidden(true);
  };

  const modal = (
    <Modal handleClose={handleClose} title="Детали ингредиента">
      <IngredientDetails ingredient={currentIngredient} />
    </Modal>
  );

  const dispatch = useDispatch();

  const onScroll = (e) => {
    if(scrollable.current.scrollTop >= (sauces.current.offsetTop - 150)  && scrollable.current.scrollTop <= (mains.current.offsetTop - 150)){
      setCurrent("sauce")
    } else if(scrollable.current.scrollTop > (mains.current.offsetTop - 150)){
      setCurrent("main")
    } else if(scrollable.current.scrollTop < (sauces.current.offsetTop - 150)){
      setCurrent("bun");
    }
  }

  useEffect(() => {
    dispatch(getIngredientData());
  }, [dispatch]);

  return (
    <section className={"mr-5 " + style.section}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <IngredientsTab current={current} setCurrent={setCurrent} />
      <div ref={scrollable} onScroll={onScroll} className={style.scrollable}>
        <p className="text text_type_main-medium mt-10">Булки</p>
        <div ref={buns} className={"pt-6 " + style.ingredientCont}>
          {ingredientData.map((element) => {
            if (element.type === "bun")
              return <CardIngredient id={element._id} handleCardClick={handleCardClick} ingredient={element} key={element._id} />;
          })}
        </div>
        <p className="text text_type_main-medium mt-2">Соусы</p>
        <div ref={sauces} className={style.ingredientCont}>
          {ingredientData.map((element) => {
            if (element.type === "sauce")
              return <CardIngredient id={element._id} handleCardClick={handleCardClick} ingredient={element} key={element._id} />;
          })}
        </div>
        <p className="text text_type_main-medium mt-2">Начинка</p>
        <div  ref={mains} className={style.ingredientCont}>
          {ingredientData.map((element) => {
            if (element.type === "main")
              return <CardIngredient id={element._id} handleCardClick={handleCardClick} ingredient={element} key={element._id} />;
          })}
        </div>
      </div>
      {!isHidden && modal}
    </section>
  );
}

export default BurgerIngredients;
