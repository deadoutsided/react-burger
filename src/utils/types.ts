import { store } from "../services/store";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TUserData = {
  name?: string;
  email?: string;
  pass?: string;
};

export type TAuthResp = {
  success: boolean;
  user?: TUserData;
  accessToken?: string;
};

export type TSignOutRes = {
  success: boolean;
  message?: string;
};

export type TPasswordForgotRes = {
  success: boolean;
  message: string;
};

export type TTokenRes = {
  success: boolean;
  accessToken: string;
  refeshToken: string;
};

export type TOrder = {
  createdAt: Date | string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: {
    createdAt: Date | String;
    email: string;
    name: string;
    updatedAt: Date | string;
  };
  price: number;
  status: "done";
  updatedAt: Date | string;
  _id: string;
};

export type TOrderData = {
  name: string;
  order: TOrder;
  success: boolean;
};

export type TWSErrorPayload = {
  success: boolean;
  message: string;
};

export type TWSOrderMessage = {
  success: boolean;
  total: number;
  totalToday: 160;
  orders: TOrder[];
};
