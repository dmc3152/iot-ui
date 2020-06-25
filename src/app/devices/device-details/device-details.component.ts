import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.less']
})
export class DeviceDetailsComponent implements OnInit {
  device: any = {};

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService
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

  addNode(data) {
    
  }

}
