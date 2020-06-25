import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';


const routes: Routes = [
  {
    path: 'devices',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: DevicesComponent,
      },
      {
        path: 'add',
        component: AddDeviceComponent
      },
      {
        path: ':id',
        component: DeviceDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
