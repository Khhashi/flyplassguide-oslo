import type { Flight, FlightStatus } from '@airportguide/shared';

const timeFormatter = new Intl.DateTimeFormat('nb-NO', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Oslo',
});

/** Klokkeslett i norsk tid, f.eks. «16:30». Returnerer `null` for manglende tid. */
export function formatTime(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return timeFormatter.format(date);
}

export type StatusTone = 'neutral' | 'info' | 'warning' | 'danger' | 'success';

const STATUS: Record<FlightStatus, { label: string; tone: StatusTone }> = {
  scheduled: { label: 'I rute', tone: 'neutral' },
  new_time: { label: 'Ny tid', tone: 'warning' },
  boarding: { label: 'Boarding', tone: 'info' },
  gate_closed: { label: 'Gate stengt', tone: 'danger' },
  departed: { label: 'Avreist', tone: 'success' },
  cancelled: { label: 'Kansellert', tone: 'danger' },
  unknown: { label: 'Status ukjent', tone: 'neutral' },
};

export function describeStatus(status: FlightStatus) {
  return STATUS[status];
}

/** Sann når avgangstiden er endret fra planlagt tid. */
export function hasNewDepartureTime(flight: Flight): boolean {
  return flight.updatedDeparture !== null && flight.updatedDeparture !== flight.scheduledDeparture;
}

export const NOT_AVAILABLE = 'Ikke tilgjengelig';
