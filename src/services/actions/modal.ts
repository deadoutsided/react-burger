import { TIngredient } from "../types/types";
import {
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  SET_MODAL_STATE,
} from "../constants/modal";

export interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly ingredient?: TIngredient;
}

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

export interface ISetModalState {
  readonly type: typeof SET_MODAL_STATE;
  readonly bool: boolean;
}

export type TModalActions =
  | ISetCurrentIngredient
  | IDeleteCurrentIngredient
  | ISetModalState;
