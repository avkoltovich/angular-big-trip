import { Action, createReducer, on } from "@ngrx/store";
import { initApp } from './actions';

export interface State {
  appInit: boolean
}

export const initialState: State = {
  appInit: false
}

const _coreReducer = createReducer(
  initialState,
  on(initApp, state => ({ ...state, appInit: true }))
);

export function coreReducer(state: State | undefined, action: Action) {
  return _coreReducer(state, action);
}