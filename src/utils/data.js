export const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
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

export default request;