import { TestBed } from '@angular/core/testing';

import { TresInterceptor } from './tres.interceptor';

describe('TresInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TresInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TresInterceptor = TestBed.inject(TresInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
