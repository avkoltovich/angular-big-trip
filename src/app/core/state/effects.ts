import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { initApp, storeDataAfterInitApp } from './actions'
import { map, switchMap, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { combineLatest } from 'rxjs'

const BASE_URL = 'https://11.ecmascript.pages.academy/big-trip'

const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Basic eo0w5110ik898199'
})

@Injectable()
export class CoreEffect {
  constructor(private store$: Store,
              private actions$: Actions,
              private http: HttpClient) {

  }

  @Effect()
  public initApp$ = this.actions$.pipe(
    ofType(initApp),
    switchMap(() => {
      return combineLatest([
        this.http.get(`${ BASE_URL }/destinations`, { headers }),
        this.http.get(`${ BASE_URL }/offers`, { headers }),
        this.http.get(`${ BASE_URL }/points`, { headers })
      ])
    })
  ).pipe(
    map(([destinations, offers, points]) => storeDataAfterInitApp({
      destinations,
      offers,
      points
    }))
  )
}
