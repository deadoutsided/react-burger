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
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const NEW_TOKEN_REQUEST = "NEW_TOKEN_REQUEST";
export const NEW_TOKEN_FAILED = "NEW_TOKEN_FAILED";
export const NEW_TOKEN_SUCCESS = "NEW_TOKEN_SUCCESS";
export const PASSWORD_FORGOT_REQUEST = "PASSWORD_FORGOT_REQUEST";
export const PASSWORD_FORGOT_FAILED = "PASSWORD_FORGOT_FAILED";
export const PASSWORD_FORGOT_SUCCESS = "PASSWORD_FORGOT_SUCCESS";
export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const SET_AUTHORIZED = "SET_AUTHORIZED";

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
            user: { ...res.user, pass: password },
            accessToken: res.accessToken,
          },
        });
        if (res.refreshToken) setCookie("token", res.refreshToken);
      })
      .catch(dispatch({ type: REGISTRATION_FAILED }));
  };
}

const signInRequest = async (email, password) => {
  return await request("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export function getSignInData(email, password) {
  return function (dispatch) {
    dispatch({ type: SIGN_IN_REQUEST });
    signInRequest(email, password)
      .then((res) => {
        dispatch({
          type: SIGN_IN_SUCCESS,
          data: {
            success: res.success,
            user: { ...res.user, pass: password },
            accessToken: res.accessToken,
          },
        });
        if (res.refreshToken) setCookie("token", res.refreshToken);
      })
      .catch(dispatch({ type: SIGN_IN_FAILED }));
  };
}

const signOutRequest = async () => {
  return await request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("token"),
    }),
  });
};

export function getSignOutData() {
  return function (dispatch) {
    dispatch({ type: SIGN_OUT_REQUEST });
    signOutRequest()
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SIGN_OUT_SUCCESS,
            res,
          });
        }
      })
      .catch(dispatch({ type: SIGN_OUT_FAILED }));
  };
}

const getUserRequest = async (token) => {
  console.log(getCookie("token"));
  return await request("auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export function getUserData(token) {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    return getUserRequest(token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            res,
          });
        }
      })
      .catch(dispatch({ type: GET_USER_FAILED }));
  };
}

const setUserRequest = async (name, email, password, token) => {
  return await request("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export function setUserData(name, email, password, token) {
  return function (dispatch) {
    dispatch({ type: SET_USER_REQUEST });
    return setUserRequest(name, email, password, token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SET_USER_SUCCESS,
            res,
          });
        }
      })
      .catch(dispatch({ type: SET_USER_FAILED }));
  };
}

const newTokenRequest = async () => {
  return await request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("token"),
    }),
  });
};

export function getNewToken() {
  return function (dispatch) {
    dispatch({ type: NEW_TOKEN_REQUEST });
    newTokenRequest()
      .then((res) => {
        if (res.success) {
          setCookie("token", res.refreshToken);
          dispatch({ type: NEW_TOKEN_SUCCESS, res });
        }
      })
      .catch(dispatch({ type: NEW_TOKEN_FAILED }));
  };
}

const forgotPasswordRequest = async (email) => {
  return await request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({ type: PASSWORD_FORGOT_REQUEST });
    forgotPasswordRequest(email)
      .then((res) => {
        if (res.success) {
          dispatch({ type: PASSWORD_FORGOT_SUCCESS, res });
        }
      })
      .catch(dispatch({ type: PASSWORD_FORGOT_FAILED }));
  };
}

const resetPasswordRequest = async (password, token) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};

export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch({ type: PASSWORD_RESET_REQUEST });
    resetPasswordRequest(password, token)
      .then((res) => {
        if (res.success) {
          dispatch({ type: PASSWORD_RESET_SUCCESS, res, password });
        }
      })
      .catch(dispatch({ type: PASSWORD_RESET_FAILED }));
  };
}
