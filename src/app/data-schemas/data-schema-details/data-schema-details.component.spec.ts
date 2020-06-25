import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSchemaDetailsComponent } from './data-schema-details.component';

describe('DataSchemaDetailsComponent', () => {
  let component: DataSchemaDetailsComponent;
  let fixture: ComponentFixture<DataSchemaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSchemaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSchemaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
