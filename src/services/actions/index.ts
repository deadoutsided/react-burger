import request, { checkResponse } from "../../utils/data";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  REGISTRATION_REQUEST,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  SIGN_OUT_REQUEST,
  SIGN_OUT_FAILED,
  SIGN_OUT_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  SET_USER_REQUEST,
  SET_USER_FAILED,
  SET_USER_SUCCESS,
  NEW_TOKEN_REQUEST,
  NEW_TOKEN_FAILED,
  NEW_TOKEN_SUCCESS,
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_FAILED,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SUCCESS,
  SET_AUTHORIZED,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
} from "../constants";
import { TAuthResp, TPasswordForgotRes, TSignOutRes, TTokenRes, TUserData } from "../types/types";
import { AppThunk } from "../types";

export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

export interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly data: TAuthResp;
}

export interface ISignInRequest {
  readonly type: typeof SIGN_IN_REQUEST;
}

export interface ISignInFailed {
  readonly type: typeof SIGN_IN_FAILED;
}

export interface ISignInSuccess {
  readonly type: typeof SIGN_IN_SUCCESS;
  readonly data: TAuthResp;
}

export interface ISignOutRequest {
  readonly type: typeof SIGN_OUT_REQUEST;
}

export interface ISignOutFailed {
  readonly type: typeof SIGN_OUT_FAILED;
}

export interface ISignOutSuccess {
  readonly type: typeof SIGN_OUT_SUCCESS;
  readonly res:  TSignOutRes;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly res: TAuthResp;
}

export interface ISetUserRequest {
  readonly type: typeof SET_USER_REQUEST;
}

export interface ISetUserFailed {
  readonly type: typeof SET_USER_FAILED;
}

export interface ISetUserSuccess {
  readonly type: typeof SET_USER_SUCCESS;
  readonly res: TUserData;
}

export interface INewTokenRequest {
  readonly type: typeof NEW_TOKEN_REQUEST;
}

export interface INewTokenFailed {
  readonly type: typeof NEW_TOKEN_FAILED;
}

export interface INewTokenSuccess {
  readonly type: typeof NEW_TOKEN_SUCCESS;
  readonly res: TTokenRes;
}

export interface IPasswordForgotRequest {
  readonly type: typeof PASSWORD_FORGOT_REQUEST;
}

export interface IPasswordForgotFailed {
  readonly type: typeof PASSWORD_FORGOT_FAILED;
}

export interface IPasswordForgotSuccess {
  readonly type: typeof PASSWORD_FORGOT_SUCCESS;
  readonly res: TPasswordForgotRes;
}

export interface IPasswordResetRequest {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetFailed {
  readonly type: typeof PASSWORD_RESET_FAILED;
}

export interface IPasswordResetSuccess {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
  readonly password: string;
}

export interface ISetAuthorized {
  readonly type: typeof SET_AUTHORIZED;
  readonly bool: boolean;
}

export type TIndexActions =
  | IRegistrationRequest
  | IRegistrationFailed
  | IRegistrationSuccess
  | ISignInRequest
  | ISignInFailed
  | ISignInSuccess
  | ISignOutRequest
  | ISignOutFailed
  | ISignOutSuccess
  | IGetUserRequest
  | IGetUserFailed
  | IGetUserSuccess
  | ISetUserRequest
  | ISetUserFailed
  | ISetUserSuccess
  | INewTokenRequest
  | INewTokenFailed
  | INewTokenSuccess
  | IPasswordForgotRequest
  | IPasswordForgotFailed
  | IPasswordForgotSuccess
  | IPasswordResetRequest
  | IPasswordResetFailed
  | IPasswordResetSuccess
  | ISetAuthorized;

const registrationRequest = async (
  name: string,
  email: string,
  password: string
) => {
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

export const getRegistrationData: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch: any) {
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
          setCookie("token", res.refreshToken);
        }
      })
      .catch(dispatch({ type: REGISTRATION_FAILED }));
  };
}

const signInRequest = async (email: string, password: string) => {
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

export const getSignInData: AppThunk = (email: string, password: string) => {
  return function (dispatch: any) {
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
          setCookie("accessToken", res.accessToken);
          setCookie("token", res.refreshToken);
        }
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

export const getSignOutData: AppThunk = () => {
  return function (dispatch: any) {
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

export const getNewToken: AppThunk = () => {
  return function (dispatch: any) {
    dispatch({ type: NEW_TOKEN_REQUEST });
    newTokenRequest()
      .then((res) => {
        if (res.success) {
          deleteCookie("accessToken");
          deleteCookie("token");
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
      authorization: getCookie("accessToken"),
    },
  });
};

export const getUserData: AppThunk = () => {
  return function (dispatch: any) {
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
}

export const requestWithRefresh = async (
  url: string,
  options: {
    method: string;
    headers: {
      "Content-Type": "application/json";
      authorization: string;
    };
    body?: string;
  }
) => {
  try {
    const res = await fetch(
      `https://norma.nomoreparties.space/api/${url}`,
      options
    );
    return await checkResponse(res);
  } catch (err) {
    if (err === "Ошибка 401" || err === "Ошибка 403") {
      const refreshData = await newTokenRequest();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      deleteCookie("accessToken");
      deleteCookie("token");
      setCookie("token", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(
        `https://norma.nomoreparties.space/api/${url}`,
        options
      );
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const setUserRequest = async (
  name: string,
  email: string,
  password: string
) => {
  return await requestWithRefresh("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const setUserData: AppThunk = (name: string, email: string, password: string) => {
  return function (dispatch: any) {
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

const forgotPasswordRequest = async (email: string) => {
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

export const forgotPassword: AppThunk = (email: string) => {
  return function (dispatch: any) {
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

const resetPasswordRequest = async (password: string, token: string) => {
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

export const resetPassword: AppThunk = (password: string, token: string) => {
  return function (dispatch: any) {
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
