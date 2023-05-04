import {
  ADD_CONSTRUCTED_INGREDIENT,
  DELETE_CONSTRUCTED_INGREDIENT,
  MOVE_CONSTRUCTED_INGREDIENT,
  RESET_CONSTRUCTED_INGREDIENTS
} from "../constants/constructor";
import { TIngredient } from "../../utils/types";
import { TConstructorActions } from "../actions/constructor";

type TinitialConstructorState = {
  constructorIngredients: TIngredient[] | null;
}

const initialState: TinitialConstructorState = {
  constructorIngredients: null
};

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case ADD_CONSTRUCTED_INGREDIENT: {
      if (state.constructorIngredients === null) {
        state.constructorIngredients = [];
      }
      if (!!state.constructorIngredients ?? []) {
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
      state.constructorIngredients?.splice(action.index, 1);
      return {
        ...state,
        constructorIngredients: state.constructorIngredients,
      };
    }
    case MOVE_CONSTRUCTED_INGREDIENT: {
      state.constructorIngredients?.splice(action.dragIndex, 1);
      state.constructorIngredients?.splice(
        action.hoverIndex,
        0,
        action.ingredient
      );
      return {
        ...state,
        constructorIngredients: state.constructorIngredients,
      };
    }
    case RESET_CONSTRUCTED_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: null
      }
    }
    default: {
      return state;
    }
  }
};
