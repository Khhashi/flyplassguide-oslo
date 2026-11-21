import { FlightSchema, type Flight } from '@flyplassguide/shared';
import { z } from 'zod';

/** Adressen til vår egen server. Settes med EXPO_PUBLIC_API_URL, ellers serveren på egen maskin. */
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

const ResponseSchema = z.object({
  flight: FlightSchema,
  fetchedAt: z.iso.datetime(),
  stale: z.boolean(),
});

export type FlightResult =
  | { kind: 'found'; flight: Flight; fetchedAt: string; stale: boolean }
  | { kind: 'not_found' }
  | { kind: 'error' };

/** Henter ett fly fra serveren. Appen spør aldri Avinor direkte. */
export async function fetchFlight(
  flightNumber: string,
  fetchImpl: typeof fetch = fetch,
): Promise<FlightResult> {
  try {
    const response = await fetchImpl(`${API_URL}/flights/${encodeURIComponent(flightNumber)}`);
    if (response.status === 404) return { kind: 'not_found' };
    if (!response.ok) return { kind: 'error' };
    const parsed = ResponseSchema.safeParse(await response.json());
    return parsed.success ? { kind: 'found', ...parsed.data } : { kind: 'error' };
  } catch {
    return { kind: 'error' };
  }
}
