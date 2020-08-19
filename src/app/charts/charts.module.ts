import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsModule as ChartsJsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ChartsComponent, LineChartComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChartsRoutingModule,
    ChartsJsModule
  ]
})
export class ChartsModule { }
