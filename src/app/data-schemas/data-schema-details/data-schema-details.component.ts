import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSchemaService } from '../data-schema.service';
import { take } from 'rxjs/operators';
import { DataSchema } from 'src/app/shared/models/data-schema';

@Component({
  selector: 'app-data-schema-details',
  templateUrl: './data-schema-details.component.html',
  styleUrls: ['./data-schema-details.component.less']
})
export class DataSchemaDetailsComponent implements OnInit {
  dataSchema: DataSchema = new DataSchema();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataSchemaService: DataSchemaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataSchemaService.getDataSchemaById(id)
      .pipe(take(1))
      .subscribe( dataSchema => {
        this.dataSchema = new DataSchema(dataSchema);
      });
  }

  updateNode(data) {
    this.dataSchema = data;
  }

  deleteSchema(id) {
    this.dataSchemaService.deleteDataSchema(id)
      .pipe(take(1))
      .subscribe( success => {
        if (success) {
          this.router.navigate(['dataSchemas']);
        }
      });
  }

}
