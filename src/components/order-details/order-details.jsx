import React from "react";
import { useSelector } from 'react-redux';
import style from './order-details.module.css';

export default function OrderDetails(){
  const { orderData, orderLoading } = useSelector(store => store.order)

  const status = orderLoading === true ? 'Загрузка...' : 'идентификатор заказа'

  return (
    <div className={style.container}>
      <p className={'text text_type_digits-large mb-8 ' + style.number}>{!orderLoading && orderData && orderData.order && orderData.order.number}</p>
      <p className={'text text_type_main-medium mb-15 '}>{status}</p>
      <div className={style.checkMark} />
      <p className={'text text_type_main-default mt-15'}>{!orderLoading && 'Ваш заказ начали готовить'}</p>
      <p className={'text text_type_main-default text_color_inactive mb-20 mt-2'}>{!orderLoading && 'Дождитесь готовности на орбитальной станции'}</p>
    </div>
  )
}