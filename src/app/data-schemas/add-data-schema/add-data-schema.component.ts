import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSchemaDialogComponent } from '../data-schema-dialog/data-schema-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataSchemaService } from '../data-schema.service';
import { DataSchema } from 'src/app/shared/models/data-schema';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-data-schema',
  templateUrl: './add-data-schema.component.html',
  styleUrls: ['./add-data-schema.component.less']
})
export class AddDataSchemaComponent implements OnInit {
  schemaInfoForm = new FormGroup({          
    name: new FormControl(null, Validators.required),
    key: new FormControl(null, Validators.required),
    unit: new FormControl(null)
  });
  schema = {
    name: '',
    key: '',
    unit: '',
    schema: []
  };
  step: number = 0;

  constructor(
    public dialog: MatDialog,
    private dataSchemaService: DataSchemaService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.step === 0 && this.schemaInfoForm.invalid) return;
    
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addNode(data) {
    console.log('top', this.schema);
  }

  addSchema(node) {
    const dialogRef = this.dialog.open(DataSchemaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      
      result.schema = [];
      node.schema.push(result);
    });
  }

  save(form) {
    if (form.invalid) return;

    this.schema.name = form.value.name;
    this.schema.key = form.value.key;
    this.schema.unit = form.value.unit;

    console.log(this.schema);
    this.dataSchemaService.addDataSchema(this.schema)
      .pipe(take(1))
      .subscribe(
        result => { this.router.navigate(['dataSchemas']); },
        err => { console.error(err); }
      );
  }

}
