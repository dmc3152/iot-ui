import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/shared/models/device';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.less']
})
export class EditDeviceDialogComponent implements OnInit {
  editDeviceForm = new FormGroup({          
    name: new FormControl(null, Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: Device) {
    if (this.data) {
      this.editDeviceForm.setValue({
        name: this.data.name
      });
    }
  }

  ngOnInit(): void {
  }

}
