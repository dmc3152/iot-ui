import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataSchemaService } from 'src/app/data-schemas/data-schema.service';
import { Device } from 'src/app/shared/models/device';
import { MatDialog } from '@angular/material/dialog';
import { ChooseDataSchemaDialogComponent } from 'src/app/data-schemas/choose-data-schema-dialog/choose-data-schema-dialog.component';
import { EditDeviceDialogComponent } from '../edit-device-dialog/edit-device-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.less']
})
export class DeviceDetailsComponent implements OnInit {
  device: any = {};

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.deviceService.getDeviceById(id)
      .pipe(take(1))
      .subscribe( device => {
        this.device = new Device(device);
        this.device.schema.sort(this.sortByName);
      });
  }

  addSchema() {
    const dialogRef = this.dialog.open(ChooseDataSchemaDialogComponent, { data: this.device.schema.map(schema => schema.id) });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      
      this.device.schema = [result.chosenSchema, ...this.device.schema];
      this.device.schema.sort(this.sortByName);
      this.save();
    });
  }

  private sortByName = (a, b) => {
    const x = a.name.toLowerCase();
    const y = b.name.toLowerCase();
    return x < y ? -1 : (x > y ? 1 : 0);
  };

  editInfo() {
    const dialogRef = this.dialog.open(EditDeviceDialogComponent, { data: this.device });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      
      this.device.name = result.name;
      this.save();
    });
  }

  save() {
    this.deviceService.updateDevice(this.device)
      .pipe(take(1))
      .subscribe(
        result => {
          this.snackBar.open('Device was updated successfully!', null, {
            duration: 3000,
          });
        },
        err => { console.error(err); }
      );
  }

  deleteSchema(id) {
    this.device.schema = this.device.schema.filter(node => node.id !== id);
    this.save();
  }

}
