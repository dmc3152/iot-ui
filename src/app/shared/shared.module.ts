import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDialogModule
  ],
  exports: [
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDialogModule
  ]
})
export class SharedModule { }
