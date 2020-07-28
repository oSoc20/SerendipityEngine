import { TestBed } from '@angular/core/testing';

import { MapGuardService } from './map-guard.service';

describe('MapGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapGuardService = TestBed.get(MapGuardService);
    expect(service).toBeTruthy();
  });
});
