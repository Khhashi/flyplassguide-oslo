import type { Flight } from '@flyplassguide/shared';

/** Avinor ber om at flytider ikke hentes oftere enn hvert 3. minutt. */
export const AVINOR_MAX_AGE_MS = 3 * 60 * 1000;

export interface FlightSnapshot {
  flights: Flight[];
  fetchedAt: number;
  /** Sann hvis Avinor feilet og vi svarer med forrige vellykkede henting. */
  stale: boolean;
}

interface FlightCacheOptions {
  load: () => Promise<Flight[]>;
  maxAgeMs?: number;
  now?: () => number;
}

/**
 * Mellomlager for flydata. Appen spør oss, aldri Avinor direkte.
 * Samtidige forespørsler deler én henting, og ved feil brukes forrige data hvis vi har dem.
 */
export function createFlightCache({
  load,
  maxAgeMs = AVINOR_MAX_AGE_MS,
  now = Date.now,
}: FlightCacheOptions) {
  let snapshot: FlightSnapshot | null = null;
  let inFlight: Promise<FlightSnapshot> | null = null;

  async function refresh(): Promise<FlightSnapshot> {
    try {
      const flights = await load();
      snapshot = { flights, fetchedAt: now(), stale: false };
      return snapshot;
    } catch (error) {
      if (snapshot) return { ...snapshot, stale: true };
      throw error;
    } finally {
      inFlight = null;
    }
  }

  async function getSnapshot(): Promise<FlightSnapshot> {
    if (snapshot && now() - snapshot.fetchedAt < maxAgeMs) return snapshot;
    inFlight ??= refresh();
    return inFlight;
  }

  async function findFlight(flightNumber: string) {
    const current = await getSnapshot();
    const flight = current.flights.find((f) => f.flightNumber === flightNumber) ?? null;
    return { flight, fetchedAt: current.fetchedAt, stale: current.stale };
  }

  return { getSnapshot, findFlight };
}
