import { Action, createReducer, on } from '@ngrx/store'
import { Filter, IState, Sorting, Table } from '../models/models';
import { storeDataAfterInitApp, updateCurrentFilter, updateCurrentSorting } from './actions'

export const initialState: IState = {
  destinations: null,
  offers: null,
  points: null,
  currentTable: Table.table,
  currentFilter: Filter.everything,
  currentSorting: Sorting.event
}

const privateRootReducer = createReducer(
  initialState,
  on(storeDataAfterInitApp, (state, { destinations, offers, points }) => ({ ...state, destinations, offers, points })),
  on(updateCurrentFilter, (state, { currentFilter }) => ({...state, currentFilter})),
  on(updateCurrentSorting, (state, { currentSorting }) => ({...state, currentSorting}))
);

export const rootReducer = (state: IState | undefined, action: Action) => {
  return privateRootReducer(state, action)
}
