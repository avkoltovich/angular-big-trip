import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter } from 'src/app/models/models';
import { updateCurrentFilter } from 'src/app/state/actions';

@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.css']
})
export class HeaderFilterComponent {
  public filters: Filter[] = Object.values(Filter)
  public filterCheckedOnInit: Filter = Filter.everything

  constructor(private store$: Store) { }

  public onFilterClick(selectedFilter: Filter) {
    this.store$.dispatch(updateCurrentFilter({
      currentFilter: selectedFilter
    }))
  }
}
