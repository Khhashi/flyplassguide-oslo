import type { Flight } from '@flyplassguide/shared';

/**
 * Bytter koder med navn, f.eks. «DY» med «Norwegian» og «TRD» med «Trondheim».
 * Finnes ikke navnet, beholdes koden, så vi aldri viser noe tomt eller gjettet.
 */
export function withNames(
  flights: Flight[],
  airlines: Map<string, string>,
  airports: Map<string, string>,
): Flight[] {
  return flights.map((flight) => ({
    ...flight,
    airline: flight.airline ? (airlines.get(flight.airline) ?? flight.airline) : null,
    destination: flight.destination
      ? (airports.get(flight.destination) ?? flight.destination)
      : null,
  }));
}
