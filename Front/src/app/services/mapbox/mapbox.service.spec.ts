import { TestBed } from '@angular/core/testing';

import { MapboxService } from './mapbox.service';

describe('MapboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapboxService = TestBed.get(MapboxService);
    expect(service).toBeTruthy();
  });
});
