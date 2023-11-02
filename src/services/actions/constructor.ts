import {
  ADD_CONSTRUCTED_INGREDIENT,
  DELETE_CONSTRUCTED_INGREDIENT,
  MOVE_CONSTRUCTED_INGREDIENT,
  RESET_CONSTRUCTED_INGREDIENTS,
} from "../constants/constructor";
import { TIngredient } from "../types/types";

export interface IAddConstrucredIngredient {
  readonly type: typeof ADD_CONSTRUCTED_INGREDIENT;
  readonly item: TIngredient;
}

export interface IDeleteConstructedIngredient {
  readonly type: typeof DELETE_CONSTRUCTED_INGREDIENT;
  readonly id: string;
}

export interface IMoveConstructedIngredient {
  readonly type: typeof MOVE_CONSTRUCTED_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
  readonly ingredient: TIngredient;
}

export interface IResetConstructedIngredient {
  readonly type: typeof RESET_CONSTRUCTED_INGREDIENTS;
}

export type TConstructorActions =
  | IAddConstrucredIngredient
  | IDeleteConstructedIngredient
  | IMoveConstructedIngredient
  | IResetConstructedIngredient;
