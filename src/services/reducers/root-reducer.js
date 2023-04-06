import { combineReducers } from 'redux';
import { reducers } from '.';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReduser } from './order';
import { wsPublicReduser } from './ws-public';
import { wsPersonalReduser } from './ws-personal';

export const rootReducer = combineReducers({
  root: reducers,
  construct: constructorReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReduser,
  wsPublic: wsPublicReduser,
  wsPersonal: wsPersonalReduser,
})