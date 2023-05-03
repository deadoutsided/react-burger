import { requestWithRefresh } from ".";
import { getCookie } from "../../utils/cookie";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCES";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_RESET = "ORDER_RESET";

const orderRequest = async (constructorIngredients) => {
  const ingredsId = constructorIngredients.map((item) => item._id);
  ingredsId.push(ingredsId[0]);
  return await requestWithRefresh("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients: ingredsId,
    }),
  });
};

export function getOrderData(constructorIngredients) {
  return function (dispatch) {
    dispatch({ type: ORDER_REQUEST });
    orderRequest(constructorIngredients)
      .then((res) => {
        dispatch({ type: ORDER_SUCCESS, order: res });
      })
      .catch(dispatch({ type: ORDER_FAILED }));
  };
}