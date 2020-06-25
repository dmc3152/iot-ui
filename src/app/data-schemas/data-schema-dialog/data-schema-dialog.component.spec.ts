import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSchemaDialogComponent } from './data-schema-dialog.component';

describe('DataSchemaDialogComponent', () => {
  let component: DataSchemaDialogComponent;
  let fixture: ComponentFixture<DataSchemaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSchemaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSchemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
