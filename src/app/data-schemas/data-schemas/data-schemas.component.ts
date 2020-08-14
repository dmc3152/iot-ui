import { Component, OnInit } from '@angular/core';
import { DataSchemaService } from '../data-schema.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataSchema } from 'src/app/shared/models/data-schema';

@Component({
  selector: 'app-data-schemas',
  templateUrl: './data-schemas.component.html',
  styleUrls: ['./data-schemas.component.less']
})
export class DataSchemasComponent implements OnInit {
  dataSchemas: any = [];

  constructor(
    private dataSchemaService: DataSchemaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSchemaService.getDataSchemas()
      .pipe(take(1))
      .subscribe(dataSchemas => {
        this.dataSchemas = dataSchemas.map(schema => new DataSchema(schema));
      });
  }

  // viewSchema(id) {
  //   id = id.replace(':', '');
  //   this.router.navigate([`/${id}`]);
  // }

}
