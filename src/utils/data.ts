export const BASE_URL: string = "https://norma.nomoreparties.space/api/";

export const wsUrl: string = "wss://norma.nomoreparties.space/orders";

type THeaders = {
  "Content-Type": "application/json";
  authhorization?: string;
}

export type TOptions = {
  method: string;
  headers: THeaders;
  body: string;
}

export type TResponse = {
  success: boolean;
  user?: {
    pass?: string;
    name?: string;
    email?: string;
  };
  accessToken: string;
  refreshToken: string;
 }

export const checkResponse = (res: Response) => {
  if(res.ok){
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const checkSuccess = (res: Response & TResponse) => {
  if(res && res.success){
    return res;
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

async function request(endpoint: string, options: TOptions){
  return await fetch(`${BASE_URL + endpoint}`, options).then(checkResponse).then(checkSuccess);
}

export const maxOrdersInColumn: Readonly<number> = 10;
export const maxOrdersInList: Readonly<number> = 20;
export const edgeOrderNumber: Readonly<number> = 9;
export const maxIngrIcons: Readonly<number> = 5;

export default request;