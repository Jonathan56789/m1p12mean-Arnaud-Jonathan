import { TestBed } from '@angular/core/testing';

import { MecanicienServiceService } from './mecanicien-service.service';

describe('MecanicienServiceService', () => {
  let service: MecanicienServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MecanicienServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
