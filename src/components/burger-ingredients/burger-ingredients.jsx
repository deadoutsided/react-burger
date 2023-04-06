import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import style from "./burder-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import CardIngredient from "../card-ingredient/card-ingredient";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_CURRENT_INGREDIENT,
  SET_MODAL_STATE,
} from "../../services/actions/modal";
import { getIngredientData } from "../../services/actions/ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function BurgerIngredients() {
  const { ingredientData } = useSelector(
    (store) => store.ingredients
  );

  const { currentIngredient } = useSelector((store) => store.modal);

  const { state } = useLocation();
  const [isHidden, setHidden] = useState(true);
  const [current, setCurrent] = useState("bun");
  const buns = useRef(null);
  const sauces = useRef(null);
  const mains = useRef(null);
  const scrollable = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ingredient = 
    state && ingredientData ? {} : ingredientData?.find((el) => el._id === id);

  useEffect(() => {
    if(!state && !id){
      navigate('', {state: {path: 'asdasd'}});
    }
    dispatch({type: SET_MODAL_STATE, bool: !id ? true : false})
  }, [dispatch, state]);

  const handleCardClick = (e) => {
    setHidden(false);
  };

  const handleClose = (e) => {
    dispatch({ type: DELETE_CURRENT_INGREDIENT });
    navigate("/", { state: {} });
    setHidden(true);
  };

  const modal = state ? (
    <Modal handleClose={handleClose} title="Детали ингредиента">
      <IngredientDetails ingredient={currentIngredient ? currentIngredient : {}} />
    </Modal>
  ) : (
    <IngredientDetails ingredient={ingredient ? ingredient : {}} />
  );

  const onScroll = (e) => {
    if (
      scrollable.current.scrollTop >= sauces.current.offsetTop - 150 &&
      scrollable.current.scrollTop <= mains.current.offsetTop - 150
    ) {
      setCurrent("sauce");
    } else if (scrollable.current.scrollTop > mains.current.offsetTop - 150) {
      setCurrent("main");
    } else if (scrollable.current.scrollTop < sauces.current.offsetTop - 150) {
      setCurrent("bun");
    }
  };

  return (
    <section className={"mr-5 " + style.section}>
      {state ? (
        <>
          <p className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </p>
          <IngredientsTab current={current} setCurrent={setCurrent} />
          <div
            ref={scrollable}
            onScroll={onScroll}
            className={style.scrollable}
          >
            <p className="text text_type_main-medium mt-10">Булки</p>
            <div ref={buns} className={"pt-6 " + style.ingredientCont}>
              {ingredientData?.map((element) => {
                if (element.type === "bun")
                  return (
                    <CardIngredient
                      id={element._id}
                      handleCardClick={handleCardClick}
                      ingredient={element ? element : {}}
                      key={element._id}
                    />
                  );
              })}
            </div>
            <p className="text text_type_main-medium mt-2">Соусы</p>
            <div ref={sauces} className={style.ingredientCont}>
              {ingredientData?.map((element) => {
                if (element.type === "sauce")
                  return (
                    <CardIngredient
                      id={element._id}
                      handleCardClick={handleCardClick}
                      ingredient={element ? element : {}}
                      key={element._id}
                    />
                  );
              })}
            </div>
            <p className="text text_type_main-medium mt-2">Начинка</p>
            <div ref={mains} className={style.ingredientCont}>
              {ingredientData?.map((element) => {
                if (element.type === "main")
                  return (
                    <CardIngredient
                      id={element._id}
                      handleCardClick={handleCardClick}
                      ingredient={element ? element : {}}
                      key={element._id}
                    />
                  );
              })}
            </div>
          </div>
      {!isHidden && modal}
        </>
      ) : modal}
    </section>
  );
}

export default BurgerIngredients;
