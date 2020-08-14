import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataSchemaService } from 'src/app/data-schemas/data-schema.service';
import { Device } from 'src/app/shared/models/device';
import { MatDialog } from '@angular/material/dialog';
import { ChooseDataSchemaDialogComponent } from 'src/app/data-schemas/choose-data-schema-dialog/choose-data-schema-dialog.component';

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
    private dataSchemaService: DataSchemaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.deviceService.getDeviceById(id)
      .pipe(take(1))
      .subscribe( device => {
        this.device = new Device(device);
      });
  }

  addSchema() {
    const dialogRef = this.dialog.open(ChooseDataSchemaDialogComponent, { data: this.device.schema.map(schema => schema.id) });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      
      this.device.schema = [result.chosenSchema, ...this.device.schema];
      this.device.schema.sort(this.sortByName);
    });
  }

  private sortByName = (a, b) => {
    const x = a.name.toLowerCase();
    const y = b.name.toLowerCase();
    return x < y ? -1 : (x > y ? 1 : 0);
  };

  save() {
    // this.deviceService.updateDevice(this.device)
    //   .pipe(take(1))
    //   .subscribe(
    //     result => { },
    //     err => { console.error(err); }
    //   );
  }

  updateNode(data) {
    let node = this.device.schema.find(node => { node.id === data.id; });
    
    if (node)
      node = data;
  }

  deleteSchema(id) {
    this.dataSchemaService.deleteDataSchema(id)
      .pipe(take(1))
      .subscribe( success => {
        const index = this.device.schema.findIndex(node => { node.id === id; });
        if (index !== -1)
          this.device.schema.splice(index, 1);
      });
  }

}
