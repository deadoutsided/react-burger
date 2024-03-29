import React, { useEffect, useRef, useState, FC } from "react";
import style from "./burder-ingredients.module.css";
import IngredientsTab from "../ingredients-tab/ingredients-tab";
import CardIngredient from "../card-ingredient/card-ingredient";
import { useSelector, useDispatch } from "../../services/types/index";
import {
  DELETE_CURRENT_INGREDIENT,
  SET_MODAL_STATE,
} from "../../services/constants/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { TIngredient } from "../../services/types/types";

const BurgerIngredients: FC = () => {
  const { ingredientData } = useSelector(
    (store) => store.ingredients
  );

  const { currentIngredient } = useSelector((store) => store.modal);

  const { state }: { state: string} = useLocation();
  const [isHidden, setHidden] = useState(true);
  const [current, setCurrent] = useState("bun");
  const buns = useRef<HTMLDivElement>(null);
  const sauces = useRef<HTMLDivElement>(null);
  const mains = useRef<HTMLDivElement>(null);
  const scrollable = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ingredient: TIngredient | null | undefined = 
    state && ingredientData ? null : ingredientData?.find((el: TIngredient) => el._id === id);

  useEffect(() => {
    if(!state && !id){
      navigate('', {state: {path: 'asdasd'}});
    }
    dispatch({type: SET_MODAL_STATE, bool: !id ? true : false})
  }, [dispatch, state]);

  const handleCardClick = () => {
    setHidden(false);
  };

  const handleClose = () => {
    dispatch({ type: DELETE_CURRENT_INGREDIENT });
    navigate("/", { state: {} });
    setHidden(true);
  };

  const modal = state ? (
    <Modal handleClose={handleClose} title="Детали ингредиента">
      <IngredientDetails ingredient={currentIngredient ? currentIngredient : null} />
    </Modal>
  ) : (
    <IngredientDetails ingredient={ingredient ? ingredient : null} />
  );

  const onScroll = () => {
    if (scrollable.current !== null && sauces.current !== null && mains.current !== null &&
      scrollable.current.scrollTop >= sauces.current.offsetTop - 150 &&
      scrollable.current.scrollTop <= mains.current.offsetTop - 150
    ) {
      setCurrent("sauce");
    } else if (scrollable.current !== null && mains.current !== null && scrollable.current.scrollTop > mains.current.offsetTop - 150) {
      setCurrent("main");
    } else if (scrollable.current !== null && sauces.current !== null && scrollable.current.scrollTop < sauces.current.offsetTop - 150) {
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
                      ingredient={element ? element : null}
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
                      ingredient={element ? element : null}
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
                      ingredient={element ? element : null}
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
