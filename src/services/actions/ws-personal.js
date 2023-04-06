export const WS_CONNECTION_PERSONAL_START = "WS_PERSONAL_CONNECTION_PERSONAL_START";
export const WS_PERSONAL_CONNECTION_SUCCESS = "WS_PERSONAL_CONNECTION_SUCCESS";
export const WS_PERSONAL_CONNECTION_CLOSED = "WS_PERSONAL_CONNECTION_CLOSED";
export const WS_PERSONAL_CONNECTION_ERROR = "WS_PERSONAL_CONNECTION_ERROR";
export const WS_PERSONAL_GET_ORDER = "WS_PERSONAL_GET_ORDER";

export const wsPersonalConnectionStart = (token) => {
  return {
    type: WS_CONNECTION_PERSONAL_START,
    payload: token,
  }
}

export const wsPersonalConnectionClose = () => {
  return {
    type: WS_PERSONAL_CONNECTION_CLOSED,
  }
}