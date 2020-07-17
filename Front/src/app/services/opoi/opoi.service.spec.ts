import { TestBed } from '@angular/core/testing';

import { OpoiService } from './opoi.service';

describe('OpoiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpoiService = TestBed.get(OpoiService);
    expect(service).toBeTruthy();
  });
});
