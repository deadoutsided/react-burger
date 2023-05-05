import { requestWithRefresh } from ".";
import { getCookie } from "../../utils/cookie";
import { TIngredient, TOrderData } from "../types/types";
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_RESET,
} from "../constants/order";
import { AppDispatch, AppThunk } from "../types";

export interface IOrderRequest {
  readonly type: typeof ORDER_REQUEST;
}

export interface IOrderSuccess {
  readonly type: typeof ORDER_SUCCESS;
  readonly order: TOrderData;
}

export interface IOrderFailed {
  readonly type: typeof ORDER_FAILED;
}

export interface IOrderReset {
  readonly type: typeof ORDER_RESET;
}

export type TOrdersActions =
  | IOrderRequest
  | IOrderFailed
  | IOrderSuccess
  | IOrderReset;

export const orderFailed = (): IOrderFailed =>{
  return {
    type: ORDER_FAILED
  }
}

const orderRequest = async (constructorIngredients: TIngredient[]) => {
  const ingredsId: string[] = constructorIngredients.map((item) => item._id);
  ingredsId.push(ingredsId[0]);
  return await requestWithRefresh("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredsId,
    }),
  });
};

export const getOrderData: AppThunk = (constructorIngredients: TIngredient[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: ORDER_REQUEST });
    orderRequest(constructorIngredients)
      .then((res) => {
        dispatch({ type: ORDER_SUCCESS, order: res });
      })
      .catch(() => dispatch({ type: ORDER_FAILED }));
  };
}
