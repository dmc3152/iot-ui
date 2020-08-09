import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSchemasRoutingModule } from './data-schemas-routing.module';
import { DataSchemaComponent } from './data-schema/data-schema.component';
import { SharedModule } from '../shared/shared.module';
import { DataSchemasComponent } from './data-schemas/data-schemas.component';
import { AddDataSchemaComponent } from './add-data-schema/add-data-schema.component';
import { DataSchemaNodeComponent } from './data-schema-node/data-schema-node.component';
import { DataSchemaDialogComponent } from './data-schema-dialog/data-schema-dialog.component';
import { DataSchemaDetailsComponent } from './data-schema-details/data-schema-details.component';
import { ChooseDataSchemaDialogComponent } from './choose-data-schema-dialog/choose-data-schema-dialog.component';
import { DataSchemaTreeComponent } from './data-schema-tree/data-schema-tree.component';



@NgModule({
  declarations: [DataSchemaComponent, DataSchemasComponent, AddDataSchemaComponent, DataSchemaNodeComponent, DataSchemaDialogComponent, DataSchemaDetailsComponent, ChooseDataSchemaDialogComponent, DataSchemaTreeComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataSchemasRoutingModule
  ],
  exports: [DataSchemaNodeComponent]
})
export class DataSchemasModule { }
