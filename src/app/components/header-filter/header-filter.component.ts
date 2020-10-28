import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter } from 'src/app/models/models';
import { updateCurrentFilter } from 'src/app/state/actions';

interface IFilter {
  name: Filter
  checked: boolean
}

@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.css']
})
export class HeaderFilterComponent {
  public filters: IFilter[] = [
    {
      name: Filter.everything,
      checked: true
    },
    {
      name: Filter.future,
      checked: false
    },
    {
      name: Filter.past,
      checked: false
    }
  ]

  constructor(private store$: Store) { }

  public onFilterClick(selectedFilter: Filter) {
    this.store$.dispatch(updateCurrentFilter({
      currentFilter: selectedFilter
    }))
  }
}
