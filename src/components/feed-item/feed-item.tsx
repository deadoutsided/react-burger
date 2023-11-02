import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import style from './feed-item.module.css';

type TFeedProps = {
  src: string;
  name: string;
  num: number;
  price: number;
}

export const FeedItem: FC<TFeedProps> = ({src, name, num, price}) => {

  return (
    <div className={style.mainCont}>
      <div className={style.ingrIcon + " mr-4"}>
        <img className={style.img} src={src} alt={name}></img>
      </div>
      <p className={'mr-4 text text_type_main-default'}>{name}</p>
      <div className={style.priceCont}>
        <p>{`${num} x ${price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}