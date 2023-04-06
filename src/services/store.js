import { applyMiddleware, createStore, compose } from "redux";
import { rootReducer } from "./reducers/root-reducer";
import { socketMiddleware } from "./middleware";
import thunkMiddleware from "redux-thunk";
import { WS_CONNECTION_PUBLIC_START, WS_CONNECTION_PERSONAL_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_ORDER } from "./actions/ws";

const wsUrl = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsAllInit: WS_CONNECTION_PUBLIC_START,
  wsPersonalInit: WS_CONNECTION_PERSONAL_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDER,
  wsBreak: WS_CONNECTION_CLOSED,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(socketMiddleware(wsUrl, wsActions))
);

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    enhancer
  );
