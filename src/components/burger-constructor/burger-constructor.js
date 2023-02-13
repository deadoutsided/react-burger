import React, { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import style from "../burger-constructor/burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import { ADD_CONSTRUCTED_INGREDIENT, ORDER_RESET } from "../../services/actions";
import { getOrderData } from "../../services/actions/index.js";
import { useDrop } from "react-dnd/dist/hooks/useDrop";

function BurgerConstructor(props) {
  const dispatch = useDispatch();

  const { ingredientData, constructorIngredients } = useSelector(
    (store) => store.root
  );

  const addItem = (item) => {
    dispatch({
      type: ADD_CONSTRUCTED_INGREDIENT,
      ...item
    })
  }
  const [{}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item){
      addItem(item)
    }
  });

  const [isHidden, setHidden] = useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const rand = Math.floor(Math.random() * (2 - 0));
    ingredientData.forEach((element, index) => {
      if (
        (element.type !== "bun" ||
          ingredientData.find((el) => el.type === "bun")._id === element._id ||
          ingredientData.findLast((el) => el.type === "bun")._id ===
            element._id) &&
        (index % 2 === rand)
      )
        dispatch({ type: ADD_CONSTRUCTED_INGREDIENT, ingredient: element });
    });
  }, [ingredientData]);

  const handleBtnClick = (e) => {
    dispatch(getOrderData(constructorIngredients));
    setHidden(false);
  };

  const handleClose = (e) => {
    startTransition(() => { setHidden(true); dispatch({ type: ORDER_RESET }) });
  };

  const modal = (
    <Modal title="" handleClose={handleClose}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section ref={dropTarget} className="mt-25 ml-5 pl-4 pr-4">
      {constructorIngredients.map((element) => {
        if (element.type === "bun")
          return (
            <ConstructorElement
              extraClass="ml-8"
              key={element._id}
              type="top"
              isLocked={true}
              text={element.name + "(верх)"}
              price={element.price}
              thumbnail={element.image}
            />
          );
      })}
      <div  className={"mt-4 mb-4 " + style.scrollable}>
        {constructorIngredients.map((element, index) => {
          if (element.type !== "bun") {
            return (
              <div className={style.constructorCont} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={element._id}
                  isLocked={false}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </div>
            );
          }
        })}
      </div>
      {constructorIngredients.map((element) => {
        if (element.type === "bun")
          return (
            <ConstructorElement
              extraClass="ml-8 mb-10"
              key={element._id}
              type="bottom"
              isLocked={true}
              text={element.name + "(низ)"}
              price={element.price}
              thumbnail={element.image}
            />
          );
      })}
      <div className={style.info}>
        <div className={style.pricecont}>
          <p className="text text_type_main-large mr-2">
            {constructorIngredients.reduce((totalPrice, currItem) => {
              if (currItem.type === "bun") {
                return totalPrice + currItem.price * 2;
              } else {
                return totalPrice + currItem.price;
              }
            }, 0)}
          </p>
          <CurrencyIcon />
        </div>
        <Button
          extraClass="ml-10"
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleBtnClick}
        >
          Оформить заказ
        </Button>
      </div>
      {!isHidden && modal}
    </section>
  );
}

export default BurgerConstructor;
