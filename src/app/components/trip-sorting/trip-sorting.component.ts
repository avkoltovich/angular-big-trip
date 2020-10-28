import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sorting } from 'src/app/models/models';
import { updateCurrentSorting } from 'src/app/state/actions';

@Component({
  selector: 'app-trip-sorting',
  templateUrl: './trip-sorting.component.html',
  styleUrls: ['./trip-sorting.component.css']
})
export class TripSortingComponent {
  public sortingTypes: Sorting[] = Object.values(Sorting)
  public sortingCheckedOnInit: Sorting = Sorting.event

  constructor(private store$: Store) {

  }

  public onSortingClick(selectedSorting: Sorting) {
    this.store$.dispatch(updateCurrentSorting({
      currentSorting: selectedSorting
    }))
  }
}
