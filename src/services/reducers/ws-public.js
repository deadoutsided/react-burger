import {
  WS_PUBLIC_CONNECTION_SUCCESS,
  WS_PUBLIC_CONNECTION_CLOSED,
  WS_PUBLIC_CONNECTION_ERROR,
  WS_PUBLIC_GET_ORDER,
} from "../actions/ws-public";

const initialState = {
  wsPublicConnected: false,
  wsPublicConnectionError: null,
  ordersPublicData: null,
};

export const wsPublicReduser = (state = initialState, action) => {
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
