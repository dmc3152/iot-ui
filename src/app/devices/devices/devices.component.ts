import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceComponent } from '../add-device/add-device.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
export class DevicesComponent implements OnInit {
  devices: Array<any> = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    for(let i = 0; i < 8; i++) {
      this.devices.push({
        name: 'Device ' + (i + 1),
        status: 'Connected'
      });
    }
  }

  addDevice() {
    const dialogRef = this.dialog.open(AddDeviceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
