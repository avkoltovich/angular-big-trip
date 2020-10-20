import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core/components/core.component';

const routes: Routes = [
  {
    path: 'trip',
    component: CoreComponent
  },
  {
    path: '',
    redirectTo: '/trip', 
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/trip'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
