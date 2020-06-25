import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-schema-dialog',
  templateUrl: './data-schema-dialog.component.html',
  styleUrls: ['./data-schema-dialog.component.less']
})
export class DataSchemaDialogComponent implements OnInit {
  addSchemaForm = new FormGroup({          
    name: new FormControl(null, Validators.required),
    key: new FormControl(null, Validators.required),
    unit: new FormControl(null)
  });

  constructor() { }

  ngOnInit(): void {
  }

}
