
export const WS_CONNECTION_PUBLIC_START = "WS_CONNECTION_PUBLIC_START";
export const WS_CONNECTION_PERSONAL_START = "WS_CONNECTION_PERSONAL_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_GET_ORDER = "WS_GET_ORDER";

export const wsConnectionStart = (token = undefined) => {
  return {
    type: token ? WS_CONNECTION_PERSONAL_START : WS_CONNECTION_PUBLIC_START,
  }
}

export const wsConnectionClose = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  }
}