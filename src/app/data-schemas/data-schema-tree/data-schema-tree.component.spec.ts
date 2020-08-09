import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSchemaTreeComponent } from './data-schema-tree.component';

describe('DataSchemaTreeComponent', () => {
  let component: DataSchemaTreeComponent;
  let fixture: ComponentFixture<DataSchemaTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSchemaTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSchemaTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
