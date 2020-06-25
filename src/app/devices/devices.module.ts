import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices/devices.component';
import { SharedModule } from '../shared/shared.module';
import { DeviceComponent } from './device/device.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DataSchemasModule } from '../data-schemas/data-schemas.module';


@NgModule({
  declarations: [DevicesComponent, DeviceComponent, DeviceDetailsComponent, AddDeviceComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataSchemasModule,
    DevicesRoutingModule
  ]
})
export class DevicesModule { }
