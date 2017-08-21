import { TestBed, inject } from '@angular/core/testing';

import { DemostoreService } from './demostore.service';

describe('DemostoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemostoreService]
    });
  });

  it('should be created', inject([DemostoreService], (service: DemostoreService) => {
    expect(service).toBeTruthy();
  }));
});
