import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT, SET_MODAL_STATE } from "../actions/modal";

const initialState = {
  modalState: true,
  currentIngredient: null
}

export const modalReducer = (state = initialState, action) => {
  switch(action.type){
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
}