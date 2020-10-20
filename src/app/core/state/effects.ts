import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { initApp } from './actions'
import { switchMap, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class CoreEffect {
  constructor(private store$: Store,
              private actions$: Actions,
              private http: HttpClient) {

  }

  @Effect({dispatch: false})
  public initApp$ = this.actions$.pipe(
    ofType(initApp),
    switchMap(() => {
      return this.http.get('https://11.ecmascript.pages.academy/big-trip/destinations', {
        headers: new HttpHeaders({
          Authorization: 'Basic eo0w5110ik898199'
        })
      })
    }),
    tap((data) => {
      console.log(data)
    })
  )
}