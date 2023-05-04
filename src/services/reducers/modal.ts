import { TIngredient } from "../../utils/types";
import { TModalActions } from "../actions/modal";
import {
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  SET_MODAL_STATE,
} from "../constants/modal";

type TinitialModalState = {
  modalState: boolean;
  currentIngredient: TIngredient | null;
}

const initialState: TinitialModalState = {
  modalState: true,
  currentIngredient: null,
};

export const modalReducer = (state: TinitialModalState = initialState, action: TModalActions) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    case SET_MODAL_STATE: {
      return {
        ...state,
        modalState: action.bool,
      };
    }
    default: {
      return state;
    }
  }
};
