import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
