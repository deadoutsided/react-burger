import { TWSErrorPayload, TWSOrderMessage } from "../../utils/types";

export type TinitialWSPublicState = {
  wsPublicConnected: boolean;
  wsPublicConnectionError: null | TWSErrorPayload;
  ordersPublicData: TWSOrderMessage | null;
};

export type TinitialWSPersonalState = {
  wsPersonalConnected: boolean;
  wsPersonalConnectionError: TWSErrorPayload | null;
  ordersPersonalData: TWSOrderMessage | null;
};

export type TWSActions = {
  wsInit: "WS_CONNECTION_PUBLIC_START" | "WS_PERSONAL_CONNECTION_PERSONAL_START";
  onOpen: "WS_PERSONAL_CONNECTION_SUCCESS" | "WS_PUBLIC_CONNECTION_SUCCESS";
  onClose: "WS_PERSONAL_CONNECTION_CLOSED" | "WS_PUBLIC_CONNECTION_CLOSED";
  onError: "WS_PUBLIC_CONNECTION_ERROR" | "WS_PERSONAL_CONNECTION_ERROR";
  onMessage: "WS_PUBLIC_GET_ORDER" | "WS_PERSONAL_GET_ORDER";
  wsBreak: "WS_PERSONAL_CONNECTION_CLOSED" | "WS_PUBLIC_CONNECTION_CLOSED";
};
