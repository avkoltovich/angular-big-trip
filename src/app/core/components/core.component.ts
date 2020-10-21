import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { initApp } from '../state/actions'

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private store$: Store) {
    this.store$.dispatch(initApp())
  }

  ngOnInit(): void {
  }

}
