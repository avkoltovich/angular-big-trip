import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { initApp } from './actions'
import { switchMap, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CoreEffect {
  constructor(private store$: Store,
              private actions$: Actions,
              private http: HttpClient) {

  }

  @Effect()
  public initApp$ = this.actions$.pipe(
    ofType(initApp),
    tap(() => {
      console.log('Hello!')
    }) 
  )
}