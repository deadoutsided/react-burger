import {
  WS_CONNECTION_PERSONAL_START,
  WS_PERSONAL_CONNECTION_SUCCESS,
  WS_PERSONAL_CONNECTION_CLOSED,
  WS_PERSONAL_CONNECTION_ERROR,
  WS_PERSONAL_GET_ORDER,
} from "../constants/ws-personal";
import { TWSErrorPayload, TWSOrderMessage } from "../types/ws";

export interface IWSConnectionPersonalStart {
  readonly type: typeof WS_CONNECTION_PERSONAL_START;
  readonly payload: string;
}

export interface IWSPersonalConnectionSuccess {
  readonly type: typeof WS_PERSONAL_CONNECTION_SUCCESS;
}

export interface IWSPersonalConnectionClosed {
  readonly type: typeof WS_PERSONAL_CONNECTION_CLOSED;
}

export interface IWSPersonalConnectionError {
  readonly type: typeof WS_PERSONAL_CONNECTION_ERROR;
  readonly payload: TWSErrorPayload;
}

export interface IWSPersonalGetOrder {
  readonly type: typeof WS_PERSONAL_GET_ORDER;
  readonly payload: TWSOrderMessage;
}

export type TWSPersonalActions =
  | IWSConnectionPersonalStart
  | IWSPersonalConnectionSuccess
  | IWSPersonalConnectionClosed
  | IWSPersonalConnectionError
  | IWSPersonalGetOrder;

export const wsPersonalConnectionStart = (
  token: string
): IWSConnectionPersonalStart => {
  return {
    type: WS_CONNECTION_PERSONAL_START,
    payload: token,
  };
};

export const wsPersonalConnectionClose = (): IWSPersonalConnectionClosed => {
  return {
    type: WS_PERSONAL_CONNECTION_CLOSED,
  };
};
