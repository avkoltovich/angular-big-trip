import { Action, createReducer, on } from '@ngrx/store'
import { IState } from '../models/models';
import { storeDataAfterInitApp } from './actions'

export const initialState: IState = {
  destinations: null,
  offers: null,
  points: null
}

const privateAppReducer = createReducer(
  initialState,
  on(storeDataAfterInitApp, (state, { destinations, offers, points }) => ({ ...state, destinations, offers, points }))
);

export const appReducer = (state: IState | undefined, action: Action) => {
  return privateAppReducer(state, action)
}
