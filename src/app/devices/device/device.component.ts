import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.less']
})
export class DeviceComponent implements OnInit {
  @Input() name: string;
  @Input() status: string;

  constructor() { }

  ngOnInit(): void {
  }

}
