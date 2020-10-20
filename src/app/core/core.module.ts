import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffect } from './state/effects';
import { CoreComponent } from './components/core.component';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    EffectsModule.forRoot([ CoreEffect ])
  ]
})
export class CoreModule { }
