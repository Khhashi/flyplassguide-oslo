import { describe, expect, it } from 'vitest';

import { FlightSchema, normalizeFlightNumber, requiresDemoLabel } from './index';

describe('normalizeFlightNumber', () => {
  it.each([
    ['dy 123', 'DY123'],
    ['SK4035', 'SK4035'],
    ['  wf 512 ', 'WF512'],
    ['d81234', 'D81234'],
  ])('normaliserer %s til %s', (input, expected) => {
    expect(normalizeFlightNumber(input)).toBe(expected);
  });

  it.each(['', 'DY', '123', 'hei på deg', 'DY12345'])('avviser ugyldig input %j', (input) => {
    expect(normalizeFlightNumber(input)).toBeNull();
  });
});

describe('requiresDemoLabel', () => {
  it('krever merking for demo- og illustrasjonsdata', () => {
    expect(requiresDemoLabel('demo')).toBe(true);
    expect(requiresDemoLabel('illustration')).toBe(true);
  });

  it('krever ikke merking for verifiserte data', () => {
    expect(requiresDemoLabel('verified')).toBe(false);
  });
});

describe('FlightSchema', () => {
  const base = {
    flightNumber: 'DY123',
    airline: 'Norwegian',
    destination: 'Bergen',
    scheduledDeparture: '2026-11-20T14:00:00Z',
    updatedDeparture: null,
    gate: null,
    boardingTime: null,
    status: 'scheduled',
    lastUpdated: '2026-11-20T13:00:00Z',
    source: 'demo',
  };

  it('godtar manglende gate og boardingtid som null', () => {
    expect(FlightSchema.parse(base)).toEqual({ ...base, checkIn: null });
  });

  it('tar med innsjekkingsskranke når den finnes', () => {
    expect(FlightSchema.parse({ ...base, checkIn: '1-3' }).checkIn).toBe('1-3');
  });

  it('avviser data uten kilde', () => {
    const { source: _source, ...withoutSource } = base;
    expect(FlightSchema.safeParse(withoutSource).success).toBe(false);
  });

  it('avviser ugyldige tidspunkt', () => {
    expect(FlightSchema.safeParse({ ...base, scheduledDeparture: 'i morgen' }).success).toBe(false);
  });
});
