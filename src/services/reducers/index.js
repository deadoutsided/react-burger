import { deleteCookie } from "../../utils/cookie";
import {
  REGISTRATION_REQUEST,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_OUT_REQUEST,
  SIGN_OUT_FAILED,
  SIGN_OUT_SUCCESS,
  GET_USER_FAILED,
  SET_USER_REQUEST,
  GET_USER_REQUEST,
  SET_USER_FAILED,
  SET_USER_SUCCESS,
  GET_USER_SUCCESS,
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
} from "../actions/index";

const initialState = {
  registrationLoading: false,
  registrationError: false,
  authorized: false,
  authData: {
    user: {
      email: "",
      name: "",
      pass: "",
    },
  },
  accessToken: "",
  signInLoading: false,
  signInError: false,
  signOutLoading: false,
  signOutError: false,
  getUserLoading: false,
  getUserError: false,
  setUserLoading: false,
  setUserError: false,
  newTokenLoading: false,
  newTokenError: false,
  newTokenSuccess: false,
  forgotPasswordLoading: false,
  forgotPasswordError: false,
  forgotPasswordSuccess: false,
  resetPasswordRequest: false,
  resetPasswordError: false,
  resetPasswordSuccess: false,
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationLoading: true,
        registrationError: false,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationLoading: false,
        registrationError: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationLoading: false,
        registrationError: false,
        authData: action.data,
        accessToken: action.data.accessToken,
      };
    }
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        signInLoading: true,
        signInError: false,
      };
    }
    case SIGN_IN_FAILED: {
      return {
        ...state,
        signInLoading: false,
        signInError: true,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        signInLoading: false,
        signInError: false,
        authData: action.data,
        accessToken: action.data.accessToken,
      };
    }
    case SIGN_OUT_REQUEST: {
      return {
        ...state,
        signOutLoading: true,
        signOutError: false,
      };
    }
    case SIGN_OUT_FAILED: {
      return {
        ...state,
        signOutLoading: false,
        signOutError: true,
      };
    }
    case SIGN_OUT_SUCCESS: {
      if (action.res.success) {
        deleteCookie("token");
        deleteCookie("accessToken");
      }
      return {
        ...state,
        signOutError: false,
        signOutLoading: false,
        resetPasswordSuccess: false,
        forgotPasswordSuccess: false,
        authData: {
          user: {
            name: "",
            pass: "",
            email: "",
          },
        },
        accessToken: "",
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserLoading: true,
        getUserError: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserLoading: false,
        getUserError: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserLoading: false,
        getUserError: false,
        authData: {
          success: action.res.success,
          user: {
            ...state.authData.user,
            email: action.res.user.email,
            name: action.res.user.name,
          },
          accessToken: action.res.accessToken,
        },
      };
    }
    case SET_USER_REQUEST: {
      return {
        ...state,
        setUserLoading: true,
        setUserError: false,
      };
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        setUserLoading: false,
        setUserError: true,
      };
    }
    case SET_USER_SUCCESS: {
      return {
        ...state,
        setUserError: false,
        setUserLoading: false,
        authData: action.res,
      };
    }
    case NEW_TOKEN_REQUEST: {
      return {
        ...state,
        newTokenError: false,
        newTokenLoading: true,
      };
    }
    case NEW_TOKEN_FAILED: {
      return {
        ...state,
        newTokenError: true,
        newTokenLoading: false,
      };
    }
    case NEW_TOKEN_SUCCESS: {
      return {
        ...state,
        newTokenError: false,
        newTokenLoading: false,
        newTokenSuccess: true,
        accessToken: action.res.accessToken,
      };
    }
    case PASSWORD_FORGOT_REQUEST: {
      return {
        ...state,
        forgotPasswordLoading: true,
        forgotPasswordError: false,
      };
    }
    case PASSWORD_FORGOT_FAILED: {
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: true,
      };
    }
    case PASSWORD_FORGOT_SUCCESS: {
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: false,
        forgotPasswordSuccess: action.res.success,
      };
    }
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordError: false,
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: true,
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: false,
        resetPasswordSuccess: true,
        authData: {
          user: {
            ...state.authData.user,
            pass: action.password,
          },
        },
      };
    }
    case SET_AUTHORIZED: {
      return {
        ...state,
        authorized: action.bool,
      };
    }
    default: {
      return state;
    }
  }
};
