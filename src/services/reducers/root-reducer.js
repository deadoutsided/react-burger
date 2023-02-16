import { combineReducers } from 'redux';
import { reducers } from './index'

export const rootReducer = combineReducers({
  root: reducers
})