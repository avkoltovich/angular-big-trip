import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './state/reducers';
import { AppEffect } from './state/effects';
import { HttpClientModule } from '@angular/common/http';
import { HeaderInfoComponent } from './components/header-info/header-info.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HeaderFilterComponent } from './components/header-filter/header-filter.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripSortingComponent } from './components/trip-sorting/trip-sorting.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderInfoComponent,
    HeaderMenuComponent,
    HeaderFilterComponent,
    TripListComponent,
    TripSortingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      root: rootReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([ AppEffect ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
