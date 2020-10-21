import { createSelector } from '@ngrx/store'
import { IState } from '../models/models'

export const selectRootState = (root: IState) => root
export const selectPoints = createSelector(
  selectRootState,
  (root: IState) => root.points
)