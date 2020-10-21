import { Action, createReducer, on } from '@ngrx/store'
import { IState } from '../models/models';
import { storeDataAfterInitApp } from './actions'

export const initialState: IState = {
  destinations: null,
  offers: null,
  points: null
}

const privateRootReducer = createReducer(
  initialState,
  on(storeDataAfterInitApp, (state, { destinations, offers, points }) => ({ ...state, destinations, offers, points }))
);

export const rootReducer = (state: IState | undefined, action: Action) => {
  return privateRootReducer(state, action)
}
