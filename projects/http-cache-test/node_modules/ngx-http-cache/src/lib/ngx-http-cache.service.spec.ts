import { TestBed } from '@angular/core/testing';

import { NgxHttpCacheService } from './ngx-http-cache.service';

describe('NgxHttpCacheService', () => {
  let service: NgxHttpCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxHttpCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
