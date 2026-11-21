import type { Flight } from '@flyplassguide/shared';
import { describe, expect, it } from 'vitest';

import { withNames } from './withNames';

const flight = { flightNumber: 'DY758', airline: 'DY', destination: 'TRD' } as Flight;

describe('withNames', () => {
  it('bytter koder med navn', () => {
    const [result] = withNames(
      [flight],
      new Map([['DY', 'Norwegian']]),
      new Map([['TRD', 'Trondheim']]),
    );
    expect(result).toMatchObject({ airline: 'Norwegian', destination: 'Trondheim' });
  });

  it('beholder koden når navnet mangler', () => {
    const [result] = withNames([flight], new Map(), new Map());
    expect(result).toMatchObject({ airline: 'DY', destination: 'TRD' });
  });
});
