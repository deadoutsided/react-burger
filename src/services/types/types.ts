import { store } from "../store";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  uuid?: string;
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
  user: {
    name?: string;
    email?: string;
    pass?: string;
  };
};

export type TAuthResp = {
  success: boolean;
  user?: TUserData["user"];
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
  ingredients: string[];
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

export type TOrdersData = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
