import React from "react";
import style from './order-details.module.css';
import done from '../../done.png'

export default function OrderDetails(props){

  return (
    <div className={style.container}>
      <p className={'text text_type_digits-large mb-8 ' + style.number}>034536</p>
      <p className={'text text_type_main-medium mb-15 '}>идентификатор заказа</p>
      <img src={done} alt='' />
      <p className={'text text_type_main-default mt-15'}>Ваш заказ начали готовить</p>
      <p className={'text text_type_main-default text_color_inactive mb-20 mt-2'}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}