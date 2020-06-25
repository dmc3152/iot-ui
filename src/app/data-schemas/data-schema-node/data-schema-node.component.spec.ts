import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSchemaNodeComponent } from './data-schema-node.component';

describe('DataSchemaNodeComponent', () => {
  let component: DataSchemaNodeComponent;
  let fixture: ComponentFixture<DataSchemaNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSchemaNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSchemaNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
