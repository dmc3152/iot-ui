import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataSchemaService } from '../data-schema.service';
import { DataSchema } from 'src/app/shared/models/data-schema';
import { take } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    private dataSchemaService: DataSchemaService,
    @Inject(MAT_DIALOG_DATA) private data: Array<string>
  ) { }

  ngOnInit(): void {
    this.dataSchemaService.getDataSchemas()
      .pipe(take(1))
      .subscribe(
        schemas => {
          const idLookup = this.data.reduce((lookup, id) => {
            lookup[id] = true;
            return lookup;
          }, {});

          this.dataSchemas = schemas.reduce((dataSchemas, schema) => {
            if (!idLookup[schema.id])
              dataSchemas.push(new DataSchema(schema));

            return dataSchemas;
          }, []);
        }
      );
  }

}
