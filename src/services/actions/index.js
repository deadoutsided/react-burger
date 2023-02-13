import dataApi from "../../utils/data";
import { useSelector } from 'react-redux';

export const INGREDIENT_REQUEST = "INGREDIENT_REQUEST";
export const INGREDIENT_SUCCESS = "INGREDIENT_SUCCESS";
export const INGREDIENT_FAILED = "INGREDIENT_FAILED";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCES";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_RESET = "ORDER_RESET";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT"
export const ADD_CONSTRUCTED_INGREDIENT = "ADD_CONSTRUCTED_INGREDIENT";
export const DELETE_CONSTRUCTED_INGREDIENT = "DELETE_CONSTRUCTED_INGREDIENT";

const getIngredientDataRequest = async () => {
  return await fetch(dataApi);
};

export function getIngredientData() {
  return function (dispatch) {
    dispatch({
      type: INGREDIENT_REQUEST,
    });
    getIngredientDataRequest()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENT_SUCCESS,
            value: res.data,
          });
        } else {
          dispatch({
            type: INGREDIENT_FAILED,
          });
        }
      });
  };
}

const orderRequest = async (constructorIngredients) => {
  return await fetch("https://norma.nomoreparties.space/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: constructorIngredients.map((item) => item._id),
    }),
  })/*.then(res => {
    if(res.ok){
      console.log(res)
      return res.json();
    }
  })*/
};

export function getOrderData(constructorIngredients) {
  return function (dispatch) {
    dispatch({ type: ORDER_REQUEST });
    orderRequest(constructorIngredients)
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
    .then((res) => {
      if(res && res.success){
        dispatch({ type: ORDER_SUCCESS, order: res })
        return res;
      }
      else {
        dispatch({ type: ORDER_FAILED })
      }
    })
  };
}
