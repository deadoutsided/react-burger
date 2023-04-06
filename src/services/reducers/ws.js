import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_ORDER } from "../actions/ws";

const initialState = {
  wsConnected: false,
  wsConnectionError: null,
  ordersData: null
}

export const wsReduser = (state = initialState, action) => {
  switch(action.type){
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        ordersData: null,
        wsConnecionError: action.payload,
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        ordersData: null,
        wsConnecionError: null,
      }
    }
    case WS_GET_ORDER: {
      return {
        ...state,
        ordersData: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}