import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';


const routes: Routes = [
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
