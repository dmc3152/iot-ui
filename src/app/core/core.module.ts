import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
