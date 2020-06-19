import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';


const routes: Routes = [
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
