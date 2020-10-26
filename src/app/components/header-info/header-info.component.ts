import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { IOffer, IPoint } from 'src/app/models/models';
import { selectPoints } from 'src/app/state/selectors';
import { storeDataAfterInitApp } from 'src/app/state/actions';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/fp';

const MAXIMUM_CITIES_SHOWN = 3

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.css']
})
export class HeaderInfoComponent {
  private points$: Observable<IPoint[]> = this.actions$.pipe(
    ofType(storeDataAfterInitApp),
    switchMap(() => this.store$.pipe(
        select(selectPoints),
        take(1)
        )
    )
  )

  public route$: Observable<string> = this.points$.pipe(
    map((points) => {
      return this._getTripTitle(points)
    })
  )

  public dates$: Observable<string> = this.points$.pipe(
    map((points) => {
      let tripDates = '';

      if (points.length > 0) {
        tripDates = this._getTripDatesTitle(points[0][`dateFrom`], points[points.length - 1][`dateTo`]);
      }

      return tripDates
    })
  )

  public cost$: Observable<number> = this.points$.pipe(
    map((points) => {
      return this._getTotalCost(points)
    })
  )

  constructor(private store$: Store,
              private actions$: Actions) {}

  private _getTotalCost(points: IPoint[]): number {
    const tripTotalCost = points.reduce((total, cost): number => {
      const offersTotalPrice = this._countOffersTotalCost(cost.offers)
      return total + cost.basePrice + offersTotalPrice
    }, 0)
    return tripTotalCost
  }

  private _countOffersTotalCost(offers: IOffer[]): number {
    const offersTotalCost = offers ? offers.reduce((offersTotal, offerCost) => offersTotal + offerCost.price, 0) : 0
    return offersTotalCost
  }

  private _getTripTitle(points: IPoint[]): string {
    const route = Array.from(new Set(points.map((point) => point.destination.name)))

    return route.length <= MAXIMUM_CITIES_SHOWN ? route.join(' — ') : `${route.slice(0, 1)} — … — ${route.slice(route.length - 1)}`
  }

  private _getTripDatesTitle(startDate: string, endDate: string): string {
    if (format(parseISO(startDate), 'MMM') === format(parseISO(endDate), 'MMM')) {
      return `${format(parseISO(startDate), 'MMM d')} — ${format(parseISO(endDate), 'd')}`
    }

    return `${format(parseISO(startDate), 'MMM d')} — ${format(parseISO(endDate), 'MMM d')}`
  }
}
