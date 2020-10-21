import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects'
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { IPoints, IState } from 'src/app/models/models';
import { selectPoints, selectRootState } from 'src/app/state/selectors';
import { storeDataAfterInitApp } from 'src/app/state/actions';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.css']
})
export class HeaderInfoComponent implements OnInit {
  public points$ = this.actions$.pipe(
    ofType(storeDataAfterInitApp),
    switchMap(() => this.store$.pipe(
        select(selectRootState),
        map((root) => {
          console.log(root.root.points)
          return this.getTotalCost(root.root.points)
        }),
        take(1)
        )
    )
  )
  constructor(private store$: Store,
              private actions$: Actions) {}

  ngOnInit(): void {}

  private getTotalCost(points) {
    const tripTotalCost = points.reduce((total, cost) => {
      const offersTotalPrice = this.countOffersTotalCost(cost.offers);
      return total + cost.basePrice + offersTotalPrice;
    }, 0);
    return tripTotalCost;
  }

  private countOffersTotalCost(offers) {
    const offersTotalCost = offers ? offers.reduce((offersTotal, offerCost) => offersTotal + offerCost.price, 0) : 0;
    return offersTotalCost;
  }
}
