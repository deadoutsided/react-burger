import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import style from "../burger-constructor/burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { BurgerIngredientsContext } from "../../services/burger-ingredients-context";
import { OrderContext } from "../../services/order-context";

function BurgerConstructor(props) {
  const [isHidden, setHidden] = React.useState(true);
  const [constructed, setConstructed] = React.useState([]);
  const [state, setState] = React.useContext(BurgerIngredientsContext);
  const [orderState, setOrderState] = React.useContext(OrderContext);

  React.useEffect(() => {
    setConstructed(() => {
      const crutch = [];
      const rand = Math.floor(Math.random() * (2 - 0));
      state.ingredientData.forEach((element, index) => {if((element.type !== 'bun' || state.ingredientData.find((el) => el.type === 'bun')._id === element._id || state.ingredientData.findLast((el) => el.type === 'bun')._id === element._id) && index % 2 === rand)  crutch.push(element)});
      return crutch;
    })
  }, [state])

  const orderRequest = async () => {
    setOrderState({
      ...orderState,
      loading: true,
      error: false
    })
    await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: constructed.map((item) => item._id)
      })})
      .then(async (res) => {
        if(res.ok){
        return res.json()
      }
        else return Promise.reject(`Ошибка ${res.status}`)
      })
      .then(async (data) => {
        console.log(data);
        setOrderState({
          loading: false,
          error: false,
          orderData: data
        })
        .catch((err) => {
          setOrderState({
            ...orderState,
            loading: false,
            error: true
          })
          console.log(err);
        })
      })
    }

  const handleBtnClick = (e) => {
    orderRequest();
    console.log(orderState);
    setHidden(false);
    console.log(orderState);
  };

  const handleClose = (e) => {
    setHidden(true);
  };

  const modal = (
    <Modal title="" handleClose={handleClose}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className="mt-25 ml-5 pl-4 pr-4">
      {console.log(orderState)}
      {
        constructed.map((element) => {
          if(element.type === 'bun') return(
            <ConstructorElement
            extraClass="ml-8"
            key={element._id} 
            type="top"
            isLocked={true}
            text={element.name + '(верх)'}
            price={element.price}
            thumbnail={element.image}
            />
          )
        })
      }
      <div className={"mt-4 mb-4 " + style.scrollable}>
        {constructed.map((element, index) => {
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
      {
        constructed.map((element) => {
          if(element.type === 'bun') return(
            <ConstructorElement
            extraClass="ml-8 mb-10"
            key={element._id} 
            type="bottom"
            isLocked={true}
            text={element.name + '(низ)'}
            price={element.price}
            thumbnail={element.image}
            />
          )
        })
      }
      <div className={style.info}>
        <div className={style.pricecont}>
          <p className="text text_type_main-large mr-2">
            {
              constructed.reduce((totalPrice, currItem) => {
                if(currItem.type === 'bun') {return totalPrice + currItem.price * 2;}
                else {return totalPrice + currItem.price;}
              }, 0)
            }
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

BurgerConstructor.propTypes = {
  state: PropTypes.array
}

export default BurgerConstructor;
