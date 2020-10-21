import { Action, createReducer, on } from '@ngrx/store'
import { IState } from '../models/models';
import { initApp, storeDataAfterInitApp } from './actions'

export const initialState: IState = {
  destinations: null,
  offers: null,
  points: null
}

const privateCoreReducer = createReducer(
  initialState,
  on(storeDataAfterInitApp, (state, { destinations, offers, points }) => ({ ...state, destinations, offers, points }))
);

export const coreReducer = (state: IState | undefined, action: Action) => {
  return privateCoreReducer(state, action)
}
