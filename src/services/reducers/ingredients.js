import { INGREDIENT_FAILED, INGREDIENT_REQUEST, INGREDIENT_SUCCESS } from "../actions/ingredients";

const initialState = {
  ingredientData: null,
  ingredientLoading: false,
  ingredientError: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch(action.type){
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
    default: {
      return state;
    }
  }
}