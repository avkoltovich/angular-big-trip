import { Component, OnInit } from '@angular/core';

interface IFilter {
  name: string
  checked: boolean
}

@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.css']
})
export class HeaderFilterComponent implements OnInit {
  public filters: IFilter[] = [
    {
      name: `everything`,
      checked: true
    },
    {
      name: `future`,
      checked: false
    },
    {
      name: `past`,
      checked: false
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
