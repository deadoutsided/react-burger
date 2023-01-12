import React from "react";
import PropTypes from 'prop-types'
import style from './card-ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

class CardIngredient extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div className={'mb-8 ml-3 mr-3 ' + style.ingredient}>
      <img className={'pl-4 pr-4 ' + style.img} src={this.props.image} alt={this.props.name}></img>
      <div className={style.price + ' mt-1 mb-1'}>
        <p className={'text text_type_digits-default mr-2'}>{this.props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={'text text_type_main-default ' + style.name}>{this.props.name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
    )
  }
}

CardIngredient.propTypes ={
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string
}

export default CardIngredient;