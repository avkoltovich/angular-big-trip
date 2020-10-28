import { createAction, props } from '@ngrx/store'
import { IState } from '../models/models'

export const initApp = createAction('[App] init app')
export const storeDataAfterInitApp = createAction('[Model] Store data after init app', props<Partial<IState>>())
export const updateCurrentFilter = createAction('[Filter] Update current filter', props<Partial<IState>>())
export const updateCurrentSorting = createAction('[Filter] Update current sorting', props<Partial<IState>>())
