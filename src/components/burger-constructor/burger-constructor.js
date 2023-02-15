import React, { useState, useTransition, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';  
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import style from "../burger-constructor/burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import { ADD_CONSTRUCTED_INGREDIENT, DELETE_CONSTRUCTED_INGREDIENT, MOVE_CONSTRUCTED_INGREDIENT, ORDER_RESET } from "../../services/actions";
import { getOrderData } from "../../services/actions/index.js";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { MovableConstructorElement } from "../movable-constructor-element/movable-constructor-element";

function BurgerConstructor(props) {
  const dispatch = useDispatch();

  const { ingredientData, constructorIngredients } = useSelector(
    (store) => store.root
  );

  const addItem = (item) => {
    dispatch({
      type: ADD_CONSTRUCTED_INGREDIENT,
      item: { ...item,
        uuid: uuidv4()
       }
    })
  }
  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item){
      addItem(item)
    }
  });

  const findIngredient = useCallback((id) => {
    const ingredient = constructorIngredients.filter((el, i) => i === id)
    return {
      ingredient,
      index: id
    }
  }, [constructorIngredients]);
  const  moveIngredient = useCallback((id, atIndex) => {
    const {ingredient, index} = findIngredient(id);
    dispatch({ type: MOVE_CONSTRUCTED_INGREDIENT, index: index, atIndex: atIndex, ingredient: ingredient[0]})
  }, [findIngredient, constructorIngredients])

  const [{},constrTar] = useDrop(() => ({
    accept: 'constrIngr'
  }))

  const [isHidden, setHidden] = useState(true);
  const [isPending, startTransition] = useTransition();
  const delTarg = useRef(null);

  const handleBtnClick = (e) => {
    dispatch(getOrderData(constructorIngredients));
    setHidden(false);
  };

  const handleClose = (e) => {
    startTransition(() => { setHidden(true); dispatch({ type: ORDER_RESET }) });
  };
  const handleDelete = (e) => {
    delTarg.current.childNodes.forEach((el, i) => {
      if(el === e.currentTarget.closest('.constructor-element').parentNode){
        dispatch({type: DELETE_CONSTRUCTED_INGREDIENT, index: i + 1})
      }
    })
  }

  const modal = (
    <Modal title="" handleClose={handleClose}>
      <OrderDetails />
    </Modal>
  );

  const dragHere = (
    <div>
      <p className="text text_type_main-default">Перенесите ингредиенты вашего бургера в эту область, чтобы сформировать заказ.</p>
    </div>
  );

  const constructedEmpty = constructorIngredients.length === 0 ? true : false;

  return (
    <section ref={dropTarget} className="mt-25 ml-5 pl-4 pr-4">
      {constructorIngredients.map((element, i) => {
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
      <div ref={(el) => delTarg.current = el && constrTar(el)} className={"mt-4 mb-4 " + style.scrollable}>
        {constructedEmpty && dragHere || !constructedEmpty && constructorIngredients.map((element, i) => {
          if (element.type !== "bun") {
            return (
              <MovableConstructorElement extraClass={style.constructorCont} key={element.uuid} index={i} moveIngredient={moveIngredient} findIngredient={findIngredient}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                  handleClose={handleDelete}
                />
              </MovableConstructorElement>
            );
          }
        })}
      </div>
      {constructorIngredients.map((element, i) => {
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
