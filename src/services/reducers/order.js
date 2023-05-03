import { ORDER_REQUEST, ORDER_FAILED, ORDER_SUCCESS, ORDER_RESET } from "../actions/order";

const initialState = {
  orderLoading: false,
  orderError: false,
  orderData: null,
}

export const orderReduser = (state = initialState, action) => {
  switch(action.type){
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
//        constructorIngredients: [],
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        orderData: null,
      };
    }
    default: {
      return state;
    }
  }
}