import React from "react";
import style from './order-details.module.css';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderContext } from "../../services/order-context";

export default function OrderDetails(props){
  const [orderState, setOrderState] = React.useContext(OrderContext);

  const status = orderState.loading === true ? 'Загрузка...' : 'идентификатор заказа'

  return (
    <div className={style.container}>
      <p className={'text text_type_digits-large mb-8 ' + style.number}>{!orderState.loading && orderState.orderData.order.number}</p>
      <p className={'text text_type_main-medium mb-15 '}>{status}</p>
      <CheckMarkIcon />
      <p className={'text text_type_main-default mt-15'}>{!orderState.loading && 'Ваш заказ начали готовить'}</p>
      <p className={'text text_type_main-default text_color_inactive mb-20 mt-2'}>{!orderState.loading && 'Дождитесь готовности на орбитальной станции'}</p>
    </div>
  )
}