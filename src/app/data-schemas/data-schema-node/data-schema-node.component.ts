import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSchemaDialogComponent } from '../data-schema-dialog/data-schema-dialog.component';

@Component({
  selector: 'app-data-schema-node',
  templateUrl: './data-schema-node.component.html',
  styleUrls: ['./data-schema-node.component.less']
})
export class DataSchemaNodeComponent implements OnInit {
  @Input() node: any;
  @Input() addOnly: boolean;
  @Input() readOnly: boolean;
  @Output() addNode = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  passEvent(data) {
    this.addNode.emit(data);
  }

  addSchema(node) {
    const dialogRef = this.dialog.open(DataSchemaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      console.log(result);
      result.schema = [];
      node.schema.push(result);
    });

    this.addNode.emit(node);
  }
}
