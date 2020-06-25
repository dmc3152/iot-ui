import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataSchemaService } from '../data-schema.service';
import { DataSchema } from 'src/app/shared/models/data-schema';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-choose-data-schema-dialog',
  templateUrl: './choose-data-schema-dialog.component.html',
  styleUrls: ['./choose-data-schema-dialog.component.less']
})
export class ChooseDataSchemaDialogComponent implements OnInit {
  addSchemaForm = new FormGroup({          
    chosenSchema: new FormControl(null, Validators.required)
  });
  dataSchemas: Array<DataSchema>;

  constructor(private dataSchemaService: DataSchemaService) { }

  ngOnInit(): void {
    this.dataSchemaService.getDataSchemas()
      .pipe(take(1))
      .subscribe(
        schemas => {
          this.dataSchemas = schemas;
          console.log(this.dataSchemas);
        }
      );
  }

}
