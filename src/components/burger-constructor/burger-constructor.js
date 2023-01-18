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

function BurgerConstructor(props) {
  const [isHidden, setHidden] = React.useState(true);

  const handleBtnClick = (e) => {
    setHidden(false);
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
      <ConstructorElement
        extraClass="ml-8"
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={1255}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      />
      <div className={"mt-4 mb-4 " + style.scrollable}>
        {props.data.map((element, index) => {
          if (element.type !== "bun") {
            return (
              <div key={index}>
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
      <ConstructorElement
        extraClass="ml-8 mb-10"
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={1255}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      />
      <div className={style.info}>
        <div className={style.pricecont}>
          <p className="text text_type_main-large mr-2">610</p>
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
  data: PropTypes.array
}

export default BurgerConstructor;
