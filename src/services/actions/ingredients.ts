import request, { TResponse } from "../../utils/data";
import { TIngredient } from "../../utils/types";
import {
  INGREDIENT_REQUEST,
  INGREDIENT_FAILED,
  INGREDIENT_SUCCESS,
} from "../constants/ingredients";
import { AppDispatch } from "../types";

export interface IIngredientRequest {
  readonly type: typeof INGREDIENT_REQUEST;
}

export interface IIngredientFailed {
  readonly type: typeof INGREDIENT_FAILED;
}

export interface IIngredientSuccess {
  readonly type: typeof INGREDIENT_SUCCESS;
  value?: TIngredient[];
}

export type TIngredientsActions =
  | IIngredientRequest
  | IIngredientFailed
  | IIngredientSuccess;

const getIngredientDataRequest = async (): Promise<{
  data?: TIngredient[];
  success: boolean;
}> => {
  return await request("ingredients");
};

export function getIngredientData(): Function {
  return function (dispatch: AppDispatch): void {
    dispatch({
      type: INGREDIENT_REQUEST,
    });
    getIngredientDataRequest()
      .then((res) => {
        dispatch({
          type: INGREDIENT_SUCCESS,
          value: res.data,
        });
      })
      .catch(
        dispatch({
          type: INGREDIENT_FAILED,
        })
      );
  };
}
