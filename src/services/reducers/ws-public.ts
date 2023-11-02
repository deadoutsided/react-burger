import { TWSPublicActions } from "../actions/ws-public";
import {
  WS_PUBLIC_CONNECTION_SUCCESS,
  WS_PUBLIC_CONNECTION_CLOSED,
  WS_PUBLIC_CONNECTION_ERROR,
  WS_PUBLIC_GET_ORDER,
} from "../constants/ws-public";
import { TinitialWSPublicState } from "../types/ws";

const initialState: TinitialWSPublicState = {
  wsPublicConnected: false,
  wsPublicConnectionError: null,
  ordersPublicData: null,
};

export const wsPublicReduser = (
  state: TinitialWSPublicState = initialState,
  action: TWSPublicActions
) => {
  switch (action.type) {
    case WS_PUBLIC_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsPublicConnected: true,
      };
    }
    case WS_PUBLIC_CONNECTION_ERROR: {
      return {
        ...state,
        wsPublicConnected: false,
        ordersPublicData: null,
        wsPublicConnecionError: action.payload,
      };
    }
    case WS_PUBLIC_CONNECTION_CLOSED: {
      return {
        ...state,
        wsPublicConnected: false,
        ordersPublicData: null,
        wsPublicConnectionError: null,
      };
    }
    case WS_PUBLIC_GET_ORDER: {
      return {
        ...state,
        ordersPublicData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
