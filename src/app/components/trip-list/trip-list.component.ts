import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { format, formatDuration } from 'date-fns'
import { parseISO } from 'date-fns/fp';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { IPoint, IPointsGroupedByDays } from 'src/app/models/models';
import { storeDataAfterInitApp } from 'src/app/state/actions';
import { selectPoints } from 'src/app/state/selectors';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  public eventTypesMap = {
    'taxi': `Taxi to `,
    'bus': `Bus to `,
    'train': `Train to `,
    'ship': `Ship to `,
    'transport': `Transport to `,
    'drive': `Drive to `,
    'flight': `Flight to `,
    'check-in': `Check-in in `,
    'sightseeing': `Sightseeing in `,
    'restaurant': `Restaurant in `
  }

  public pointsGroupedByDays$: Observable<IPointsGroupedByDays[]> = this.actions$.pipe(
    ofType(storeDataAfterInitApp),
    switchMap(() => this.store$.pipe(
        select(selectPoints),
        take(1)
        )
    ),
    map((points) => {
      const pointsGroupedByDays: IPointsGroupedByDays[] = []
      let startDate: string
      let currentDate: string
      let previusDate: string
      let daysPassed: number
      points.forEach((point) => {
        currentDate = point.dateFrom.slice(0, 10)

        if (previusDate !== currentDate) {
          startDate = startDate ? startDate : currentDate;
          daysPassed = daysPassed ? this._getPassedDays(startDate, currentDate) : 1;
          pointsGroupedByDays.push({
            daysPassed,
            date: format(parseISO(point.dateFrom), 'MMM d'),
            points: [ point ]
          })

          previusDate = currentDate
        } else {
          pointsGroupedByDays[pointsGroupedByDays.length - 1].points.push(point)
          previusDate = currentDate
        }
      })
      return pointsGroupedByDays
    })
  )

  constructor(private store$: Store,
              private actions$: Actions) { }

  ngOnInit(): void {
  }

  private _getPassedDays(start: string, end: string): number {
    return (new Date(Date.parse(end) - Date.parse(start))).getDate();
  }

  public getISOStringDate(date: string): string {
    const isoDate = new Date(date)
    isoDate.setHours(isoDate.getHours() - isoDate.getTimezoneOffset() / 60)
    return isoDate.toISOString()
  }

  public getFormatTime24H(date: string): string {
    return format(parseISO(date), 'HH:mm')
  }

  public getDurationString(dateFrom: string, dateTo: string): string {
    const days = new Date(Date.parse(dateTo) - Date.parse(dateFrom)).getDay()
    const hours = new Date(Date.parse(dateTo) - Date.parse(dateFrom)).getHours()
    const minutes = new Date(Date.parse(dateTo) - Date.parse(dateFrom)).getMinutes()
    let formattedDuration = ``

    if (days) {
      formattedDuration = `${days}D `
    }

    if (days || hours) {
      formattedDuration += `${hours}H `
    }

    return (formattedDuration += `${minutes}M`)
  }
}
