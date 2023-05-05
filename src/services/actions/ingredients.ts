import request, { TResponse } from "../types/data";
import { TIngredient } from "../types/types";
import {
  INGREDIENT_REQUEST,
  INGREDIENT_FAILED,
  INGREDIENT_SUCCESS,
} from "../constants/ingredients";
import { AppDispatch, AppThunk } from "../types";

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

export const getIngredientData: AppThunk = () => {
  return function (dispatch: any) {
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
