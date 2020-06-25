import { TestBed } from '@angular/core/testing';

import { DataSchemaService } from './data-schema.service';

describe('DataSchemaService', () => {
  let service: DataSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
