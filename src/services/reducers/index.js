import { deleteCookie } from "../../utils/cookie";
import {
  INGREDIENT_REQUEST,
  INGREDIENT_SUCCESS,
  INGREDIENT_FAILED,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_RESET,
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  ADD_CONSTRUCTED_INGREDIENT,
  DELETE_CONSTRUCTED_INGREDIENT,
  MOVE_CONSTRUCTED_INGREDIENT,
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
  NEW_TOKEN_SUCCESS
} from "../actions/index";

const initialState = {
  ingredientData: [],
  ingredientLoading: false,
  ingredientError: false,

  orderLoading: false,
  orderError: false,
  orderData: {},

  currentIngredient: {},
  constructorIngredients: [],

  registrationLoading: false,
  registrationError: false,
  authData: {},
  accessToken: '',
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
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_REQUEST: {
      return {
        ...state,
        ingredientLoading: true,
        ingredientError: false,
      };
    }
    case INGREDIENT_SUCCESS: {
      return {
        ...state,
        ingredientData: action.value,
        ingredientLoading: false,
        ingredientError: false,
      };
    }
    case INGREDIENT_FAILED: {
      return {
        ...state,
        ingredientLoading: false,
        ingredientError: true,
      };
    }
    case ADD_CONSTRUCTED_INGREDIENT: {
      if (state.constructorIngredients !== []) {
        if (
          state.constructorIngredients.some((el) => {
            return el.type === "bun" && el.type === action.item.type;
          })
        ) {
          state.constructorIngredients.splice(
            state.constructorIngredients.findIndex(
              (item) => item.type === "bun"
            ),
            1,
            action.item
          );
        } else state.constructorIngredients.push(action.item);
      }
      return {
        ...state,
        constructorIngredients: state.constructorIngredients,
      };
    }
    case DELETE_CONSTRUCTED_INGREDIENT: {
      state.constructorIngredients.splice(action.index, 1);
      return {
        ...state,
        constructorIngredients: state.constructorIngredients,
      };
    }
    case MOVE_CONSTRUCTED_INGREDIENT: {
      state.constructorIngredients.splice(action.dragIndex, 1);
      state.constructorIngredients.splice(
        action.hoverIndex,
        0,
        action.ingredient
      );
      return {
        ...state,
        constructorIngredients: state.constructorIngredients,
      };
    }
    case ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
        orderError: false,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderError: true,
        orderLoading: false,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        orderError: false,
        orderData: action.order,
        constructorIngredients: [],
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        orderData: {},
      };
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {},
      };
    }
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
        accessToken: action.data.accessToken
      };
    }
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        signInLoading: true,
        signInError: false
      }
    }
    case SIGN_IN_FAILED: {
      return {
        ...state,
        signInLoading: false,
        signInError: true
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        signInLoading: false,
        signInError: false,
        authData: action.data,
        accessToken: action.data.accessToken
      }
    }
    case SIGN_OUT_REQUEST:{
      return {
        ...state,
        signOutLoading: true,
        signOutError: false
      }
    }
    case SIGN_OUT_FAILED: {
      return {
        ...state,
        signOutLoading: false,
        signOutError: true
      }
    }
    case SIGN_OUT_SUCCESS: {
      if(action.res.success){
        deleteCookie('token');
      }
      return {
        ...state,
        signOutError: false,
        signOutLoading: false,
        authData: {
          user: {
            name: '',
            pass: '',
            email: ''
          }
        },
        accessToken: ''
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserLoading: true,
        getUserError: false
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserLoading: false,
        getUserError: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserLoading: false,
        getUserError: false,
        authData: action.res
      }
    }
    case SET_USER_REQUEST: {
      return {
        ...state,
        setUserLoading: true,
        setUserError: false
      }
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        setUserLoading: false,
        setUserError: true
      }
    }
    case SET_USER_SUCCESS: {
      return {
        ...state,
        setUserError: false,
        setUserLoading: false,
        authData: action.res,
      }
    }
    case NEW_TOKEN_REQUEST: {
      return {
        ...state,
        newTokenError: false,
        newTokenLoading: true,
      }
    }
    case NEW_TOKEN_FAILED: {
      return {
        ...state,
        newTokenError: true,
        newTokenLoading: false
      }
    }
    case NEW_TOKEN_SUCCESS: {
      return {
        ...state,
        newTokenError: false,
        newTokenLoading: false,
        accessToken: action.res.accessToken,
      }
    }
    default: {
      return state;
    }
  }
};
