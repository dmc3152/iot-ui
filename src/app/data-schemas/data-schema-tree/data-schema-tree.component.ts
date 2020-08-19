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
  @Input() dataSchema: Array<DataSchema>;
  @Input() mode: string;
  @Output() updateNode = new EventEmitter<any>();
  @Output() deleteSchema = new EventEmitter<any>();

  dataTypeLookup: any;
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
    if (changes.dataSchema) {
      this.nestedDataSource.data = changes.dataSchema.currentValue;
    }
  }

  ngOnInit(): void {
    this.dataTypeLookup = this.dataSchemaService.getDataTypes().reduce((lookup, option) => {
      lookup[option.value] = option.text;
      return lookup;
    }, {});
  }

  private _getChildren = (node: DataSchema) => {
    return of(node.schema);
  };

  hasNestedChild = (_: number, nodeData: DataSchema) => {
    return Array.isArray(nodeData.schema) && nodeData.schema.length > 0;
  };

  addSchema(node) {
    const dialogRef = this.dialog.open(DataSchemaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      result.schema = [];
      node.schema.push(result);

      const rootNode = this.findRootNode(node);
      this.updateSchema(rootNode);
    });
  }

  editSchema(node) {
    const dialogRef = this.dialog.open(DataSchemaDialogComponent, { data: node });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      
      node.name = result.name;
      node.key = result.key;
      node.unit = result.unit;
      node.type = result.type;

      const rootNode = this.findRootNode(node);
      this.updateSchema(rootNode);
    });
  }

  removeNode(node) {
    const isRootNode = this.dataSchema.some(schema => schema.id === node.id);

    if (isRootNode) {
      this.deleteSchema.emit(node.id);
      return;
    }

    const rootNode = this.findRootNode(node);
    if (!rootNode) return;

    const parentSchema = this.findParentSchema(node, this.dataSchema);
    if (!parentSchema) return;

    const nodeIndex = parentSchema.findIndex(schema => schema.id === node.id);
    if (nodeIndex === -1) return;

    parentSchema.splice(nodeIndex, 1);
    this.updateSchema(rootNode);
  }

  private findParentSchema(node, schema) {
    if (!Array.isArray(schema)) return false;

    for (let i in schema) {
      if (schema[i].id === node.id) {
        return schema;
      } else {
        const parent = this.findParentSchema(node, schema[i].schema);
        if (parent) return parent;
      }
    }

    return false;
  }

  private findRootNode(node) {
    return this.dataSchema.find(schemaNode => {
      return this.findNode(schemaNode, node);
    });
  }

  private findNode(node, nodeToFind) {
    if (node.id === nodeToFind.id) return true;
    if (!Array.isArray(node.schema) || !node.schema.length) return false;

    return node.schema.some(schemaNode => {
      return this.findNode(schemaNode, nodeToFind);
    });
  }

  private updateSchema(rootNode) {
    this.dataSchemaService
      .updateDataSchema(rootNode)
      .pipe(take(1))
      .subscribe(
        dataSchema => {
          this.updateNode.emit(dataSchema);
        },
        err => {
          console.error(err);
        }
      );
  }
}
