import { z } from 'zod';

import { DataSourceSchema } from './data-source';

/**
 * Normalisert flystatus. Avinors egne koder oversettes hit i backend.
 * `unknown` brukes når vi ikke har en status, i stedet for å gjette.
 */
export const FlightStatusSchema = z.enum([
  'scheduled',
  'new_time',
  'boarding',
  'gate_closed',
  'departed',
  'cancelled',
  'unknown',
]);
export type FlightStatus = z.infer<typeof FlightStatusSchema>;

/**
 * Felt som Avinor ikke alltid leverer er `null`, aldri gjettet.
 * Tidspunkter er ISO 8601-strenger i UTC.
 */
export const FlightSchema = z.object({
  flightNumber: z.string().min(2),
  airline: z.string().nullable(),
  destination: z.string().nullable(),
  scheduledDeparture: z.iso.datetime(),
  updatedDeparture: z.iso.datetime().nullable(),
  gate: z.string().nullable(),
  boardingTime: z.iso.datetime().nullable(),
  status: FlightStatusSchema,
  lastUpdated: z.iso.datetime(),
  source: DataSourceSchema,
});
export type Flight = z.infer<typeof FlightSchema>;

/**
 * Normaliserer brukerens søk etter flynummer: fjerner mellomrom og gjør om til store bokstaver.
 * Returnerer `null` hvis det ikke ligner et flynummer: flyselskapskode (IATA med 2 tegn,
 * minst én bokstav, eller ICAO med 3 bokstaver) + 1–4 sifre + valgfri bokstav.
 */
const FLIGHT_NUMBER_PATTERN = /^(?:[A-Z]{3}|[A-Z][A-Z0-9]|[0-9][A-Z])\d{1,4}[A-Z]?$/;

export function normalizeFlightNumber(input: string): string | null {
  const cleaned = input.replace(/\s+/g, '').toUpperCase();
  return FLIGHT_NUMBER_PATTERN.test(cleaned) ? cleaned : null;
}
