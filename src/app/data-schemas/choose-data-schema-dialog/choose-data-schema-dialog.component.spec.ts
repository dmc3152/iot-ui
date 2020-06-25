import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDataSchemaDialogComponent } from './choose-data-schema-dialog.component';

describe('ChooseDataSchemaDialogComponent', () => {
  let component: ChooseDataSchemaDialogComponent;
  let fixture: ComponentFixture<ChooseDataSchemaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDataSchemaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDataSchemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
