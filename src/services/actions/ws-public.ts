import { TWSErrorPayload, TWSOrderMessage } from "../types/ws";
import {
  WS_CONNECTION_PUBLIC_START,
  WS_PUBLIC_CONNECTION_SUCCESS,
  WS_PUBLIC_CONNECTION_CLOSED,
  WS_PUBLIC_CONNECTION_ERROR,
  WS_PUBLIC_GET_ORDER,
} from "../constants/ws-public";

export interface IWSConnectionPublicStart {
  readonly type: typeof WS_CONNECTION_PUBLIC_START;
}

export interface IWSPublicConnectionSuccess {
  readonly type: typeof WS_PUBLIC_CONNECTION_SUCCESS;
}

export interface IWSPublicConnectionClosed {
  readonly type: typeof WS_PUBLIC_CONNECTION_CLOSED;
}

export interface IWSPublicConnectionError {
  readonly type: typeof WS_PUBLIC_CONNECTION_ERROR;
  readonly payload: TWSErrorPayload;
}

export interface IWSPublicGetOrder {
  readonly type: typeof WS_PUBLIC_GET_ORDER;
  readonly payload: TWSOrderMessage;
}

export type TWSPublicActions =
  | IWSConnectionPublicStart
  | IWSPublicConnectionSuccess
  | IWSPublicConnectionClosed
  | IWSPublicConnectionError
  | IWSPublicGetOrder;

export const wsPublicConnectionStart = (): IWSConnectionPublicStart => {
  return {
    type: WS_CONNECTION_PUBLIC_START,
  };
};

export const wsPublicConnectionClose = (): IWSPublicConnectionClosed => {
  return {
    type: WS_PUBLIC_CONNECTION_CLOSED,
  };
};
