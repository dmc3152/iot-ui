import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSchemasComponent } from './data-schemas.component';

describe('DataSchemasComponent', () => {
  let component: DataSchemasComponent;
  let fixture: ComponentFixture<DataSchemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSchemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSchemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
