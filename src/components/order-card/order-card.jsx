import React, { useMemo } from "react";
import { propTypes } from 'prop-types'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './order-card.module.css';
import { orderDataType } from "../../utils/types";
import { maxIngrIcons } from "../../utils/data";

export function OrderCard({ order }) {
  const { _id, ingredients, createdAt, name, status, number } = order;

  const { ingredientData } = useSelector((store) => store.ingredients)
  const { pathname } = useLocation();

  const statusTranslate = {
    done: 'Выполнен',
    created: 'Создан',
    pending: 'Готовится',
  };

  const icon = (item) => {
    return (<img src={ingredientData?.find((el) => {
      if (el._id === item) return el.image;
    }).image} alt={ingredientData?.find((el) => {
      if (el._id === item) return el.image;
    }).name} className={style.img}></img>)
  }

  const icons = useMemo(() => ingredients.map((el) => {return icon(el)}), [ingredientData, ingredients, icon])

  return (
    <Link to={`${pathname}/${_id}`} className={style.container + ' pb-6 pt-6 pr-6 pl-6'} state={order}>
      <div className={"mb-6 " + style.textCont}>
        <p className={'text text_type_digits-default ' + style.id}>{'#' + number}</p>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
      </div>
      <p className={"text text_type_main-medium" + (pathname !== '/profile/orders' ? " mb-6 " : ' ') + style.burgName}>{name}</p>
      {pathname === '/profile/orders' && <p className={'text text_type_main-default mt-2 mb-6 ' + (status === 'done' ? style.orderDone : '')}>{statusTranslate[status]}</p>}
      <div className={style.ingrCont}>
        {ingredients.map((elem, i) => {
          if (i < maxIngrIcons) {
            return (
              <div key={i} data-num={`${i}`} className={style.ingrIcon}>
                {icons[i]}
              </div>
            )
          }
          else if (i === maxIngrIcons) {
            return (
              <div key={i} data-num={`${i}`} className={style.ingrIcon}>
                <div className={style.ingrIconDim}>
                  <p className={"text text_type_main-default " + style.ingrCount}>{`+${ingredients.length - maxIngrIcons}`}</p>
                  {icons[i]}
                </div>
              </div>
            )
          }
        })}
        <div className={style.priceCont}>
          <p className={'text text_type_digits-default ' + style.price}>{ingredients.reduce((totalPrice, currIngr) => {
            ingredientData?.forEach((el) => {
              if (el._id === currIngr) {
                totalPrice += el.price;
              }
            })
            return totalPrice;
          }, 0)}</p>
          <CurrencyIcon></CurrencyIcon>
        </div>
      </div>
    </Link>
  )
}

OrderCard.propTypes = orderDataType.isRequired;