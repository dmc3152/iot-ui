import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { DataSchema } from 'src/app/shared/models/data-schema';
import { ChooseDataSchemaDialogComponent } from 'src/app/data-schemas/choose-data-schema-dialog/choose-data-schema-dialog.component';
import { DeviceService } from '../device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.less']
})
export class AddDeviceComponent implements OnInit {
  addDeviceForm = new FormGroup({          
    name: new FormControl(null, Validators.required),
    schema: new FormControl(null)
  });
  step: number = 0;
  device = {
    name: '',
    schema: []
  };
  dataSchemas: Array<DataSchema>;

  constructor(
    public dialog: MatDialog,
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.step === 0 && this.addDeviceForm.invalid) return;

    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addNode(data) {
    console.log('top', this.device);
  }

  addSchema() {
    const dialogRef = this.dialog.open(ChooseDataSchemaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      
      console.log(result)
      this.device.schema.push(result.chosenSchema);
    });
  }

  save(form) {
    if (form.invalid) return;

    this.device.name = form.value.name;

    // const payload = {
    //   name: this.device.name,
    //   schema: this.device.schema.map(function (schema) {
    //     return schema.id;
    //   })
    // };

    console.log(this.device);
    this.deviceService.addDevice(this.device)
      .pipe(take(1))
      .subscribe(
        result => { this.router.navigate(['..']); },
        err => { console.error(err); }
      );
  }

}
