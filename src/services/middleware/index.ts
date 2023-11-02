import { getCookie } from "../../utils/cookie";
import { TWSPersonalActions } from "../actions/ws-personal";
import { TWSPublicActions } from "../actions/ws-public";
import { WS_CONNECTION_PERSONAL_START } from "../constants/ws-personal";
import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../types";
import { TWSActions } from "../types/ws";

export const socketMiddleware = (wsUrl: string, wsActions: TWSActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsBreak } =
        wsActions;
      if (type === wsInit) {
        socket =
          type === WS_CONNECTION_PERSONAL_START && getCookie("accessToken")
            ? new WebSocket(`${wsUrl}?token=${action.payload}`)
            : new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedOrders = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedOrders });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsBreak) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
