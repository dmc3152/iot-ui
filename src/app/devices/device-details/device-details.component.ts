import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataSchemaService } from 'src/app/data-schemas/data-schema.service';

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
    private dataSchemaService: DataSchemaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.deviceService.getDeviceById(id)
      .pipe(take(1))
      .subscribe( device => {
        this.device = device;
        console.log(this.device);
      });
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
