import request from "../../utils/data";
import { useSelector } from "react-redux";
import { getCookie, setCookie } from "../../utils/cookie";

export const INGREDIENT_REQUEST = "INGREDIENT_REQUEST";
export const INGREDIENT_SUCCESS = "INGREDIENT_SUCCESS";
export const INGREDIENT_FAILED = "INGREDIENT_FAILED";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCES";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_RESET = "ORDER_RESET";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";
export const ADD_CONSTRUCTED_INGREDIENT = "ADD_CONSTRUCTED_INGREDIENT";
export const DELETE_CONSTRUCTED_INGREDIENT = "DELETE_CONSTRUCTED_INGREDIENT";
export const MOVE_CONSTRUCTED_INGREDIENT = "MOVE_CONSTRUCTED_INGREDIENT";
export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_FAILED = "SIGN_OUT_FAILED";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";

const getIngredientDataRequest = async () => {
  return await request("ingredients");
};

export function getIngredientData() {
  return function (dispatch) {
    dispatch({
      type: INGREDIENT_REQUEST,
    });
    getIngredientDataRequest()
      .then((res) => {
        dispatch({
          type: INGREDIENT_SUCCESS,
          value: res.data,
        });
      })
      .catch(
        dispatch({
          type: INGREDIENT_FAILED,
        })
      );
  };
}

const orderRequest = async (constructorIngredients) => {
  return await request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: constructorIngredients.map((item) => item._id),
    }),
  });
};

export function getOrderData(constructorIngredients) {
  return function (dispatch) {
    dispatch({ type: ORDER_REQUEST });
    orderRequest(constructorIngredients)
      .then((res) => {
        dispatch({ type: ORDER_SUCCESS, order: res });
      })
      .catch(dispatch({ type: ORDER_FAILED }));
  };
}

const registrationRequest = async (name, email, password) => {
  return await request("auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};

export function getRegistrationData(name, email, password) {
  return function (dispatch) {
    dispatch({ type: REGISTRATION_REQUEST });
    registrationRequest(name, email, password)
      .then((res) => {
        dispatch({
          type: REGISTRATION_SUCCESS,
          data: {
            success: res.success,
            user: res.user,
            accessToken: res.accessToken,
          },
        });
        if (res.refreshToken) setCookie("token", res.refreshToken);
      })
      .catch(dispatch({ type: REGISTRATION_FAILED }));
  };
}

const signInRequest = async (email, password) => {
  return await request('auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
  })
}

export function getSignInData(email, password){
  return function(dispatch){
    dispatch({type: SIGN_IN_REQUEST});
    signInRequest(email,password)
    .then((res) => {
      dispatch({
        type: SIGN_IN_SUCCESS,
        data: {
          success: res.success,
          user: res.user,
          accessToken: res.accessToken,
        }
      });
      if (res.refreshToken) setCookie("token", res.refreshToken);
    }).catch(dispatch({type: SIGN_IN_FAILED}))
  }
}

const signOutRequest = async () => {
  return await request('auth/logout',{
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: {
      token: `${getCookie('token')}`
    }
  })
}

export function getSignOutData(){
  return function(dispatch){
    dispatch({type: SIGN_OUT_REQUEST})
    signOutRequest()
    .then((res) => {
      dispatch({
        type: SIGN_OUT_SUCCESS,
        res
      })
    }).catch(dispatch({type:SIGN_OUT_FAILED}));
  }
  
}