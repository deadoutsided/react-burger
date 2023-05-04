import { TOrderData } from "../../utils/types";
import { TOrdersActions } from "../actions/order";
import {
  ORDER_REQUEST,
  ORDER_FAILED,
  ORDER_SUCCESS,
  ORDER_RESET,
} from "../constants/order";

type TinitialOrderState = {
  orderLoading: boolean;
  orderError: boolean;
  orderData: TOrderData;
}

const initialState = {
  orderLoading: false,
  orderError: false,
  orderData: null,
};

export const orderReduser = (state = initialState, action: TOrdersActions) => {
  switch (action.type) {
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
};
