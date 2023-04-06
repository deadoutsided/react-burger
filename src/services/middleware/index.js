import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsAllInit, wsPersonalInit, onOpen, onClose, onError, onMessage, wsBreak } = wsActions;
      if (type === wsPersonalInit && getCookie('accessToken')) {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken').split('Bearer ')[1]}`);
      }else if(type ===  wsAllInit){
        socket = new WebSocket(`${wsUrl}/all`)
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedOrders = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedOrders });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if(type === wsBreak){
          socket.close();
        }
      }

      next(action);
    };
  };
};