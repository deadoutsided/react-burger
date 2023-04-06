import { applyMiddleware, createStore, compose } from "redux";
import { rootReducer } from "./reducers/root-reducer";
import { socketMiddleware } from "./middleware";
import thunkMiddleware from "redux-thunk";
import {
  WS_CONNECTION_PUBLIC_START,
  WS_PUBLIC_CONNECTION_SUCCESS,
  WS_PUBLIC_CONNECTION_CLOSED,
  WS_PUBLIC_CONNECTION_ERROR,
  WS_PUBLIC_GET_ORDER,
} from "./actions/ws-public";
import {
  WS_CONNECTION_PERSONAL_START,
  WS_PERSONAL_CONNECTION_SUCCESS,
  WS_PERSONAL_CONNECTION_CLOSED,
  WS_PERSONAL_CONNECTION_ERROR,
  WS_PERSONAL_GET_ORDER,
} from "./actions/ws-personal";
import { wsUrl } from "../utils/data";

const wsPublicActions = {
  wsInit: WS_CONNECTION_PUBLIC_START,
  onOpen: WS_PUBLIC_CONNECTION_SUCCESS,
  onClose: WS_PUBLIC_CONNECTION_CLOSED,
  onError: WS_PUBLIC_CONNECTION_ERROR,
  onMessage: WS_PUBLIC_GET_ORDER,
  wsBreak: WS_PUBLIC_CONNECTION_CLOSED,
};

const wsPersonalActions = {
  wsInit: WS_CONNECTION_PERSONAL_START,
  onOpen: WS_PERSONAL_CONNECTION_SUCCESS,
  onClose: WS_PERSONAL_CONNECTION_CLOSED,
  onError: WS_PERSONAL_CONNECTION_ERROR,
  onMessage: WS_PERSONAL_GET_ORDER,
  wsBreak: WS_PERSONAL_CONNECTION_CLOSED,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(socketMiddleware(`${wsUrl}/all`, wsPublicActions)),
  applyMiddleware(socketMiddleware(wsUrl, wsPersonalActions))
);

export const initStore = (initialState = {}) =>
  createStore(rootReducer, initialState, enhancer);
