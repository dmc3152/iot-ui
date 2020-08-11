import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSchema } from 'src/app/shared/models/data-schema';

@Component({
  selector: 'app-data-schema-dialog',
  templateUrl: './data-schema-dialog.component.html',
  styleUrls: ['./data-schema-dialog.component.less']
})
export class DataSchemaDialogComponent implements OnInit {
  action: string;
  addSchemaForm = new FormGroup({          
    name: new FormControl(null, Validators.required),
    key: new FormControl(null, Validators.required),
    unit: new FormControl(null)
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: DataSchema) {
    if (this.data) {
      this.action = 'Save';
      this.addSchemaForm.setValue({
        name: this.data.name,
        key: this.data.key,
        unit: this.data.unit
      });
    } else {
      this.action = 'Add';
    }
  }

  ngOnInit(): void {
  }

}
