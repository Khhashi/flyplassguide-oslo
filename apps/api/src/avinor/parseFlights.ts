import { FlightSchema, type Flight, type FlightStatus } from '@flyplassguide/shared';
import { XMLParser } from 'fast-xml-parser';

/** Avinors statuskoder (https://asrv.avinor.no/flightStatuses/v1.0) oversatt til vårt format. */
const STATUS_CODES: Record<string, FlightStatus> = {
  N: 'scheduled', // Ny info
  E: 'new_time', // Ny tid
  D: 'departed', // Avreist
  C: 'cancelled', // Innstilt
};

interface AvinorFlight {
  airline?: string;
  flight_id?: string;
  schedule_time?: string;
  airport?: string;
  gate?: string | number;
  check_in?: string;
  status?: { code?: string; time?: string };
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  isArray: (name) => name === 'flight',
  parseTagValue: false,
});

function toIso(value: string | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Gjør Avinors XmlFeed om til en liste med fly. Fly som ikke kan tolkes sikkert hoppes over,
 * i stedet for å fylles ut med gjetninger.
 */
export function parseFlights(xml: string): Flight[] {
  const doc = parser.parse(xml) as {
    airport?: { flights?: { lastUpdate?: string; flight?: AvinorFlight[] } };
  };
  const flights = doc.airport?.flights;
  const lastUpdated = toIso(flights?.lastUpdate);
  if (!flights || !lastUpdated) return [];

  return (flights.flight ?? []).flatMap((raw) => {
    const code = raw.status?.code;
    const status: FlightStatus = code ? (STATUS_CODES[code] ?? 'unknown') : 'scheduled';
    const candidate = {
      flightNumber: raw.flight_id,
      airline: raw.airline ?? null,
      destination: raw.airport ?? null,
      scheduledDeparture: toIso(raw.schedule_time),
      updatedDeparture: status === 'new_time' ? toIso(raw.status?.time) : null,
      gate: raw.gate === undefined ? null : String(raw.gate),
      checkIn: raw.check_in ?? null,
      boardingTime: null, // Avinors åpne feed har ikke boardingtid.
      status,
      lastUpdated,
      source: 'verified',
    };
    const result = FlightSchema.safeParse(candidate);
    return result.success ? [result.data] : [];
  });
}
