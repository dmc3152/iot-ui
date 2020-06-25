import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { DeviceService } from '../device.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
export class DevicesComponent implements OnInit {
  devices: Array<any> = [];

  constructor(
    private deviceService: DeviceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // for(let i = 0; i < 8; i++) {
    //   this.devices.push({
    //     name: 'Device ' + (i + 1),
    //     status: 'Connected'
    //   });
    // }

    this.deviceService.getDevices()
      .pipe(take(1))
      .subscribe(devices => {
        this.devices = devices;
        console.log(devices);
      });

    // this.deviceService.getDeviceById('22:0')
    //   .pipe(take(1))
    //   .subscribe(device => console.log(device));
  }

  addDevice() {
    const dialogRef = this.dialog.open(AddDeviceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
