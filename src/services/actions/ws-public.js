
export const WS_CONNECTION_PUBLIC_START = "WS_CONNECTION_PUBLIC_START";
export const WS_PUBLIC_CONNECTION_SUCCESS = "WS_PUBLIC_CONNECTION_SUCCESS";
export const WS_PUBLIC_CONNECTION_CLOSED = "WS_PUBLIC_CONNECTION_CLOSED";
export const WS_PUBLIC_CONNECTION_ERROR = "WS_PUBLIC_CONNECTION_ERROR";
export const WS_PUBLIC_GET_ORDER = "WS_PUBLIC_GET_ORDER";

export const wsPublicConnectionStart = () => {
  return {
    type: WS_CONNECTION_PUBLIC_START,
  }
}

export const wsPublicConnectionClose = () => {
  return {
    type: WS_PUBLIC_CONNECTION_CLOSED,
  }
}