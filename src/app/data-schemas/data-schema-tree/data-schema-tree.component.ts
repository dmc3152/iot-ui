import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataSchema } from 'src/app/shared/models/data-schema';
import { of } from 'rxjs';
import { DataSchemaDialogComponent } from '../data-schema-dialog/data-schema-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataSchemaService } from '../data-schema.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-data-schema-tree',
  templateUrl: './data-schema-tree.component.html',
  styleUrls: ['./data-schema-tree.component.less']
})
export class DataSchemaTreeComponent implements OnInit, OnChanges {
  @Input() dataSchema: DataSchema;
  @Output() updateNode = new EventEmitter<any>();
  @Output() deleteSchema = new EventEmitter<any>();

  nestedTreeControl: NestedTreeControl<DataSchema>
  nestedDataSource: MatTreeNestedDataSource<DataSchema>;

  constructor(
    public dialog: MatDialog,
    private dataSchemaService: DataSchemaService
  ) {
    this.nestedTreeControl = new NestedTreeControl<DataSchema>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dataSchema) {
      this.nestedDataSource.data = [changes.dataSchema.currentValue];
    }
  }

  ngOnInit(): void {
    
  }

  private _getChildren = (node: DataSchema) => {
    return of(node.schema);
  };

  hasNestedChild = (_: number, nodeData: DataSchema) => {
    return Array.isArray(nodeData.schema) && nodeData.schema.length > 0;
  };

  addSchema(node) {
    const isRootNode = node.id === this.dataSchema.id;
    const dialogRef = this.dialog.open(DataSchemaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      result.schema = [];
      node.schema.push(result);

      this.updateSchema();
    });
  }

  removeNode(node) {
    const isRootNode = node.id === this.dataSchema.id;

    if (isRootNode) {
      this.deleteSchema.emit();
      return;
    }

    const parent = this.findParent(node, this.dataSchema);
    if (!parent) return;

    const nodeIndex = parent.schema.findIndex(schema => schema.id === node.id);
    if (nodeIndex === -1) return;

    parent.schema.splice(nodeIndex, 1);
    this.updateSchema();
  }

  private findParent(node, schema) {
    if (!Array.isArray(schema.schema)) return false;

    for (let i in schema.schema) {
      if (schema.schema[i].id === node.id) {
        return schema;
      } else {
        const parent = this.findParent(node, schema.schema[i]);
        if (parent) return parent;
      }
    }

    return false;
  }

  private updateSchema() {
    this.dataSchemaService
      .updateDataSchema(this.nestedDataSource.data.shift())
      .pipe(take(1))
      .subscribe(
        dataSchema => {
          this.updateNode.emit(dataSchema);
        },
        err => {
          console.log('error', err);
        }
      );
  }
}
