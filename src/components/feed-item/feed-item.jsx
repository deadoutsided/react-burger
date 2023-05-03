import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './feed-item.module.css';

export function FeedItem({src, name, num, price}){

  return (
    <div className={style.mainCont}>
      <div className={style.ingrIcon + " mr-4"}>
        <img className={style.img} src={src} alt={name}></img>
      </div>
      <p className={'mr-4 text text_type_main-default'}>{name}</p>
      <div className={style.priceCont}>
        <p>{`${num} x ${price}`}</p>
        <CurrencyIcon />
      </div>
    </div>
  )
}

FeedItem.propTypes = {
  src: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  num: propTypes.number.isRequired,
  price: propTypes.bool.isRequired,
}.isRequired;