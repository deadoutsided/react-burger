export const BASE_URL = "https://norma.nomoreparties.space/api/";

export const wsUrl = "wss://norma.nomoreparties.space/orders";

export const checkResponse = (res) => {
  if(res.ok){
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const checkSuccess = (res) => {
  if(res && res.success){
    return res;
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

async function request(endpoint, options){
  return await fetch(`${BASE_URL + endpoint}`, options).then(checkResponse).then(checkSuccess);
}

export const maxOrdersInColumn = 10;
export const maxOrdersInList = 20;
export const edgeOrderNumber = 9;
export const maxIngrIcons = 5;

export default request;