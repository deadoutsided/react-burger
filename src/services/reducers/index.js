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
  MOVE_CONSTRUCTED_INGREDIENT
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
            return el.type === 'bun' && (el.type === action.item.type)
          })
        ) {
          state.constructorIngredients.splice(state.constructorIngredients.findIndex((item) => item.type === 'bun'), 1, action.item)
        }else
        state.constructorIngredients.push(action.item);
      }
      return {
        ...state,
        constructorIngredients: state.constructorIngredients,
      };
    }
    case DELETE_CONSTRUCTED_INGREDIENT: {
      state.constructorIngredients.splice(action.index, 1)
      return {
        ...state,
        constructorIngredients: state.constructorIngredients
      };
    }
    case MOVE_CONSTRUCTED_INGREDIENT: {
      state.constructorIngredients.splice(action.index, 1);
      state.constructorIngredients.splice(action.atIndex, 0, action.ingredient)
      return {
        ...state,
        constructorIngredients: state.constructorIngredients
      }
    }
    case ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
        orderError: false
      }
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderError: true,
        orderLoading: false
      }
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        orderError: false,
        orderData: action.order,
        constructorIngredients: []
      }
    }
    case ORDER_RESET: {
      return {
        ...state,
        orderData: {}
      }
    }
    case SET_CURRENT_INGREDIENT: {
      return{
        ...state,
        currentIngredient: action.ingredient
      }
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {}
      }
    }
    default: {
      return state;
    }
  }
};
