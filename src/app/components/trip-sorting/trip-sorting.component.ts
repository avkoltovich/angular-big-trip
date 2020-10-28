import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sorting } from 'src/app/models/models';
import { updateCurrentSorting } from 'src/app/state/actions';

interface ISorting {
  name: Sorting
  checked: boolean
}

@Component({
  selector: 'app-trip-sorting',
  templateUrl: './trip-sorting.component.html',
  styleUrls: ['./trip-sorting.component.css']
})
export class TripSortingComponent {
  public sortingTypes: ISorting[] = [
    {
      name: Sorting.event,
      checked: true
    },
    {
      name: Sorting.time,
      checked: false
    },
    {
      name: Sorting.price,
      checked: false
    }
  ]

  constructor(private store$: Store) {

  }

  public onSortingClick(selectedSorting: Sorting) {
    this.store$.dispatch(updateCurrentSorting({
      currentSorting: selectedSorting
    }))
  }
}
