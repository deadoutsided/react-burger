import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FeedItem } from '../../components/feed-item/feed-item';
import style from "./feed-full.module.css"

export function FeedFull() {

  const {state} = useLocation();
  const ingredientData = useSelector((store) => store.ingredients.ingredientData)

  const {ingredients, createdAt, name, status, number, _id} = state;

  const statusTranslate = {
    done: 'Выполнен',
    created: 'Создан',
    pending: 'Готовится',
  }

  const ingrsNoTwins = ingredients.filter((el, index) => {
    return ingredients.indexOf(el) === index;
  })

  return (
    <div className={style.mainCont}>
      <p className={'mb-10 text text_type_digits-default'}>{`#${number}`}</p>
      <p className={style.leftSide + ' mb-3 text text_type_main-medium'}>{name}</p>
      <p className={style.leftSide + ' mb-15 text text_type_main-default ' + style.done}>{statusTranslate[status]}</p>
      <p className={'mb-6 text text_type_main-medium'}>Состав:</p>
      <div className={'mb-10 pr-6 ' + style.scrollable}>
        {ingrsNoTwins.map((el, i) => {
          const ingr = ingredientData?.find((elem) => {if(elem._id === el) return elem});
          return (<FeedItem key={el} src={ingr?.image} name={ingr?.name} num={ingredients?.reduce((acc, elem) => { if(elem === el){acc += 1}; return acc }, 0)} price={ingr?.price} />)
        })
        }
      </div>
      <div className={style.dateNPriceCont}>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
        <div className={style.priceCont}>
          <p className='text text_type_digits-default'>{ingredients.reduce((acc, el) => {ingredientData.forEach((elem) => {
            if(el === elem._id) acc += elem.price;
          })
          return acc}, 0)}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  )
}