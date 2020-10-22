import { createSelector } from '@ngrx/store'
import { IPoint, IState } from '../models/models'

export const selectRootState = ({ root }): IState => root
export const selectPoints = createSelector(
  selectRootState,
  (root: IState): IPoint[] => root.points
)