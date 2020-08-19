import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/devices/device.service';
import { DataSchemaService } from 'src/app/data-schemas/data-schema.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Device } from 'src/app/shared/models/device';
import { take } from 'rxjs/operators';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DataSchema } from 'src/app/shared/models/data-schema';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataPath } from 'src/app/shared/models/data-path';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.less']
})
export class ChartsComponent implements OnInit {
  chartDataSources: ChartDataSets[] = [];
  chartLabels: Label[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      type: 'linear',
      xAxes: [{
        type: 'time'
      }]
    },
    elements: {
      line: {
        tension: 0
      }
    }
  };
  dataPaths: any = {};
  dataTypeLookup: any;
  devices: Array<Device>;
  nestedTreeControl: NestedTreeControl<DataSchema>
  nestedDataSource: MatTreeNestedDataSource<DataSchema>;
  reportForm = this.fb.group({
    selectedDevice: this.fb.control(null, [Validators.required]),
    selectedSchema: this.fb.array([])
  });
  selectedDevice: Device;
  selectedUnit: string = null;
  showChart: Boolean = false;

  constructor(
    private deviceService: DeviceService,
    private dataSchemaService: DataSchemaService,
    private fb: FormBuilder
  ) {
    this.nestedTreeControl = new NestedTreeControl<DataSchema>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit(): void {
    this.deviceService.getDevices()
      .pipe(take(1))
      .subscribe(devices => {
        this.devices = devices.map(device => new Device(device));
      });

    this.dataTypeLookup = this.dataSchemaService.getDataTypes().reduce((lookup, option) => {
      lookup[option.value] = option.text;
      return lookup;
    }, {});

    this.reportForm.get('selectedDevice').valueChanges.subscribe(value => {
      this.deviceService.getDeviceById(value.id)
      .pipe(take(1))
      .subscribe(device => {
        console.log('device', device);
        this.selectedDevice = device;
        this.nestedDataSource.data = device.schema;
      });
    });
  }

  private _getChildren = (node: DataSchema) => {
    return of(node.schema);
  };

  hasNestedChild = (_: number, nodeData: DataSchema) => {
    return Array.isArray(nodeData.schema) && nodeData.schema.length > 0;
  };

  onCheckboxChange(e) {
    const selectedSchema: FormArray = this.reportForm.get('selectedSchema') as FormArray;
  
    if (e.checked) {
      selectedSchema.push(new FormControl(e.source.value));

      if (!this.selectedUnit)
        this.selectedUnit = e.source.value.unit;

      const foundPath = this.extractPathFromSchema(e.source.value, this.selectedDevice.schema, []);
      if (foundPath.success) {
        this.dataPaths[e.source.value.id] = {
          path: foundPath.path,
          schema: e.source.value
        };
        this.prepareData();
        this.showChart = true;
      }
    } else {
      selectedSchema.controls.forEach((item: FormControl, i: number) => {
        if (item.value.id === e.source.value.id) {
          selectedSchema.removeAt(i);
          return;
        }
      });

      if (!selectedSchema.controls.length) {
        this.selectedUnit = null;
        this.showChart = false;
      }
      
      this.dataPaths[e.source.value.id] = undefined;
    }
  }

  private extractPathFromSchema(node: DataSchema, dataSchema: Array<DataSchema>, currentPath: Array<string>) {
    const depth = node.level;

    for (let schema of dataSchema) {
      let key = schema.key;
      let path = [...currentPath, key];

      if (schema.id === node.id) {
        return {
          success: true,
          path: path
        };
      }

      const foundPath = this.extractPathFromSchema(node, schema.schema, path);
      if (foundPath.success)
        return foundPath;
    }

    return {
      success: false,
      path: currentPath
    }
  }

  canSelectSchema(node: DataSchema): Boolean {
    const isValidType = node.type === 'number' || !node.type;
    const isValidNesting = !this.hasNestedChild(null, node);
    const isValidUnit = !node.unit || !this.selectedUnit || node.unit === this.selectedUnit;
    return isValidType && isValidNesting && isValidUnit;
  }

  private prepareData() {
    this.chartDataSources = [];
    // let min = null;
    // let max = null;
    Object.values(this.dataPaths).forEach(node => {
      const { schema, path } = node as DataPath;
      console.log(path);
      const data = this.selectedDevice.data.map(record => {
        let value: any = record;
        for (let i = 0; i < path.length; i++) {
          value = value[path[i]];
        }

        // if (min === null || value < min)
        //   min = value;
          
        // if (max === null || value > max)
        //   max = value;

        return {
          y: value,
          x: record.createdAt
        };
      });

      // const range = max - min;
      // const interval = range / 7;

      // this.chartLabels = [];
      // for(let i = 0; i < 8; i++) {
      //   this.chartLabels.push(min + interval * i);
      // }

      this.chartDataSources.push({
        data: data,
        label: schema.name
      });

      console.log(this.chartDataSources);
    });
  }

}
