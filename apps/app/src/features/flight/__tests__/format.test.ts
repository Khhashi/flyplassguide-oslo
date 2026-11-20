import type { Flight, FlightStatus } from '@airportguide/shared';

import { describeStatus, formatTime, hasNewDepartureTime } from '../format';

describe('formatTime', () => {
  it('viser klokkeslett i norsk tid (vintertid)', () => {
    expect(formatTime('2026-11-20T15:30:00Z')).toBe('16:30');
  });

  it('viser klokkeslett i norsk tid (sommertid)', () => {
    expect(formatTime('2026-07-01T15:30:00Z')).toBe('17:30');
  });

  it('returnerer null for manglende eller ugyldig tid', () => {
    expect(formatTime(null)).toBeNull();
    expect(formatTime('ikke en dato')).toBeNull();
  });
});

describe('describeStatus', () => {
  const statuses: FlightStatus[] = [
    'scheduled',
    'new_time',
    'boarding',
    'gate_closed',
    'departed',
    'cancelled',
    'unknown',
  ];

  it.each(statuses)('har norsk tekst for %s', (status) => {
    expect(describeStatus(status).label.length).toBeGreaterThan(0);
  });

  it('markerer kansellering som alvorlig', () => {
    expect(describeStatus('cancelled')).toEqual({ label: 'Kansellert', tone: 'danger' });
  });
});

describe('hasNewDepartureTime', () => {
  const base = {
    scheduledDeparture: '2026-11-20T15:30:00Z',
    updatedDeparture: null,
  } as Pick<Flight, 'scheduledDeparture' | 'updatedDeparture'> as Flight;

  it('er usann når det ikke finnes ny tid', () => {
    expect(hasNewDepartureTime(base)).toBe(false);
  });

  it('er usann når ny tid er lik planlagt tid', () => {
    expect(hasNewDepartureTime({ ...base, updatedDeparture: base.scheduledDeparture })).toBe(false);
  });

  it('er sann når avgangstiden er endret', () => {
    expect(hasNewDepartureTime({ ...base, updatedDeparture: '2026-11-20T15:50:00Z' })).toBe(true);
  });
});
