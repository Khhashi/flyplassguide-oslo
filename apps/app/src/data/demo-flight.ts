import type { Flight } from '@flyplassguide/shared';

/**
 * Eksempelfly for å vise hvordan Mitt fly ser ut før Avinor-data er koblet til.
 * Flyselskapet og flynummeret er bevisst oppdiktet (XX finnes ikke) og merket som demo.
 */
export const DEMO_FLIGHT: Flight = {
  flightNumber: 'XX123',
  airline: 'Eksempel Air',
  destination: 'Bergen',
  scheduledDeparture: '2026-11-20T15:30:00Z',
  updatedDeparture: '2026-11-20T15:50:00Z',
  gate: 'A12',
  checkIn: '1-3',
  boardingTime: null,
  status: 'new_time',
  lastUpdated: '2026-11-20T14:02:00Z',
  source: 'demo',
};

/** Eksempelflyet med avgang litt frem i tid, så nedtellingen på Hjem gir mening. */
export function demoNextFlight(now: Date): Flight {
  const departure = new Date(now.getTime() + 45 * 60_000).toISOString();
  return {
    ...DEMO_FLIGHT,
    scheduledDeparture: departure,
    updatedDeparture: null,
    status: 'scheduled',
  };
}
