import {
  WS_PERSONAL_CONNECTION_SUCCESS,
  WS_PERSONAL_CONNECTION_CLOSED,
  WS_PERSONAL_CONNECTION_ERROR,
  WS_PERSONAL_GET_ORDER,
} from "../actions/ws-personal";

const initialState = {
  wsPersonalConnected: false,
  wsPersonalConnectionError: null,
  ordersPersonalData: null,
};

export const wsPersonalReduser = (state = initialState, action) => {
  switch (action.type) {
    case WS_PERSONAL_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsPersonalConnected: true,
      };
    }
    case WS_PERSONAL_CONNECTION_ERROR: {
      return {
        ...state,
        wsPersonalConnected: false,
        ordersPersonalData: null,
        wsPersonalConnecionError: action.payload,
      };
    }
    case WS_PERSONAL_CONNECTION_CLOSED: {
      return {
        ...state,
        wsPersonalConnected: false,
        ordersPersonalData: null,
        wsPersonalConnecionError: null,
      };
    }
    case WS_PERSONAL_GET_ORDER: {
      const ordersPersonalData = action.payload;
      return {
        ...state,
        ordersPersonalData: {
          ...ordersPersonalData,
          orders: ordersPersonalData?.orders?.reverse()
        },
      };
    }
    default: {
      return state;
    }
  }
};
