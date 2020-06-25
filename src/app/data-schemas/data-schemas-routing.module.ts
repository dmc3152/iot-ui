import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { DataSchemasComponent } from './data-schemas/data-schemas.component';
import { AddDataSchemaComponent } from './add-data-schema/add-data-schema.component';
import { DataSchemaComponent } from './data-schema/data-schema.component';
import { DataSchemaDetailsComponent } from './data-schema-details/data-schema-details.component';


const routes: Routes = [
  {
    path: 'dataSchemas',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: DataSchemasComponent,
      },
      {
        path: 'add',
        component: AddDataSchemaComponent
      },
      {
        path: ':id',
        component: DataSchemaDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSchemasRoutingModule { }
