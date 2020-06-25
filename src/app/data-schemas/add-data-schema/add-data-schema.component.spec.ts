import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataSchemaComponent } from './add-data-schema.component';

describe('AddDataSchemaComponent', () => {
  let component: AddDataSchemaComponent;
  let fixture: ComponentFixture<AddDataSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
