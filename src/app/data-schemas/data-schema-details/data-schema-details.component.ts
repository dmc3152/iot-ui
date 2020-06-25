import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSchemaService } from '../data-schema.service';
import { take } from 'rxjs/operators';
import { DataSchema } from 'src/app/shared/models/data-schema';

@Component({
  selector: 'app-data-schema-details',
  templateUrl: './data-schema-details.component.html',
  styleUrls: ['./data-schema-details.component.less']
})
export class DataSchemaDetailsComponent implements OnInit {
  dataSchema: any = {};

  constructor(
    private route: ActivatedRoute,
    private dataSchemaService: DataSchemaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataSchemaService.getDataSchemaById(id)
      .pipe(take(1))
      .subscribe( dataSchema => {
        this.dataSchema = dataSchema;
        console.log(this.dataSchema);
      });
  }

  addNode(data) {

  }

}
