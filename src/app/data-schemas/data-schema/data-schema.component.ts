import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-schema',
  templateUrl: './data-schema.component.html',
  styleUrls: ['./data-schema.component.less']
})
export class DataSchemaComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
