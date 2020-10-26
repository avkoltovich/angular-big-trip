import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { initApp, storeDataAfterInitApp } from './actions'
import { map, switchMap, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { combineLatest } from 'rxjs'
import { IDestination, IOffersByType, IPoint, IPointRaw } from '../models/models'

const BASE_URL = 'https://11.ecmascript.pages.academy/big-trip'

const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Basic eo0w5110ik898199'
})

@Injectable()
export class AppEffect {
  constructor(private actions$: Actions,
              private http: HttpClient) {

  }

  @Effect()
  public initApp$ = this.actions$.pipe(
    ofType(initApp),
    switchMap(() => {
      return combineLatest([
        this.http.get<IDestination[]>(`${ BASE_URL }/destinations`, { headers }),
        this.http.get<IOffersByType[]>(`${ BASE_URL }/offers`, { headers }),
        this.http.get<IPointRaw[]>(`${ BASE_URL }/points`, { headers })
      ])
    })
  ).pipe(
    map(([destinations, offers, points]) => storeDataAfterInitApp({
      destinations,
      offers,
      points: points.map((point): IPoint => ({
        dateFrom: point.date_from,
        dateTo: point.date_to,
        type: point.type,
        offers: point.offers,
        id: point.id,
        destination: point.destination,
        basePrice: point.base_price,
        isFavorite: point.is_favorite
      })).sort((a, b) => Date.parse(a[`dateFrom`]) - Date.parse(b[`dateFrom`]))
    }))
  )
}
