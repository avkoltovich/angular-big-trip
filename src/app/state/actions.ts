import { createAction, props } from '@ngrx/store'

export const initApp = createAction('[App] init app')
export const storeDataAfterInitApp = createAction('[Model] Store data after init app', props<any>())
