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
  boardingTime: null,
  status: 'new_time',
  lastUpdated: '2026-11-20T14:02:00Z',
  source: 'demo',
};
