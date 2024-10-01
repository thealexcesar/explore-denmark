import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { deactivateGuard } from '../app/core/guards/deactivate.guard';

describe('deactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => deactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
