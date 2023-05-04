import {
  INGREDIENT_FAILED,
  INGREDIENT_REQUEST,
  INGREDIENT_SUCCESS,
} from "../constants/ingredients";
import { TIngredient } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";

type TinitialIngredientState = {
  ingredientData: TIngredient[] | null;
  ingredientLoading: Boolean;
  ingredientError: Boolean;
};

const initialState: TinitialIngredientState = {
  ingredientData: null,
  ingredientLoading: false,
  ingredientError: false,
};

export const ingredientsReducer = (state: TinitialIngredientState = initialState, action: TIngredientsActions) => {
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
    default: {
      return state;
    }
  }
};
