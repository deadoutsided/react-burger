import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { TConstructorActions } from "../actions/constructor";
import { TIndexActions } from "../actions";
import { TIngredientsActions } from "../actions/ingredients";
import { TModalActions } from "../actions/modal";
import { TOrdersActions } from "../actions/order";
import { TWSPersonalActions } from "../actions/ws-personal";
import { TWSPublicActions } from "../actions/ws-public";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from "../store";

export type TApplicationActions = TConstructorActions
| TIndexActions
| TIngredientsActions
| TModalActions
| TOrdersActions
| TWSPersonalActions
| TWSPublicActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

//export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;
export const useDispatch = () => dispatchHook<AppDispatch>();