import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsModule as ChartsJsModule } from 'ng2-charts';


@NgModule({
  declarations: [ChartsComponent, LineChartComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartsJsModule
  ]
})
export class ChartsModule { }
