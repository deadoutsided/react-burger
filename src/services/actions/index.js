import request, { checkResponse } from "../../utils/data";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

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
        if (res) {
          setCookie("accessToken", res.accessToken);
          setCookie("token", res.refreshToken)};
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
        if (res) {
          setCookie('accessToken', res.accessToken);
          setCookie("token", res.refreshToken)};
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

const newTokenRequest = async () => {
  return await request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("token"),
    }),
  }).then((res) => {
    return res;
  });
};

export function getNewToken() {
  return function (dispatch) {
    dispatch({ type: NEW_TOKEN_REQUEST });
    newTokenRequest()
      .then((res) => {
        if (res.success) {
          deleteCookie('accessToken');
          deleteCookie('token');
          setCookie("token", res.refreshToken);
          setCookie("accessToken", res.accessToken);
          dispatch({ type: NEW_TOKEN_SUCCESS, res });
        }
      })
      .catch(dispatch({ type: NEW_TOKEN_FAILED }));
  };
}

const getUserRequest = async () => {
  return await requestWithRefresh("auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:  getCookie('accessToken'),
    },
  });
};

export function getUserData() {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    return getUserRequest()
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
};

export const requestWithRefresh = async (url, options) => {
  try{
    const res = await fetch(`https://norma.nomoreparties.space/api/${url}`, options);
    return await checkResponse(res);
  } catch (err) {
    if(err === 'Ошибка 401' || err === "Ошибка 403"){
      const refreshData = await newTokenRequest();
      if(!refreshData.success){
        Promise.reject(refreshData);
      }
      deleteCookie('accessToken');
      deleteCookie('token');
      setCookie('token', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`https://norma.nomoreparties.space/api/${url}`,options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

const setUserRequest = async (name, email, password) => {
  return await requestWithRefresh("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie('accessToken'),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export function setUserData(name, email, password) {
  return function (dispatch) {
    dispatch({ type: SET_USER_REQUEST });
    return setUserRequest(name, email, password)
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
