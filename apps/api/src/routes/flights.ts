import { normalizeFlightNumber, type Flight } from '@flyplassguide/shared';
import type { FastifyInstance } from 'fastify';

export type FindFlight = (
  flightNumber: string,
) => Promise<{ flight: Flight | null; fetchedAt: number; stale: boolean }>;

/** GET /flights/:flightNumber gir ett fly fra mellomlageret. */
export function registerFlightRoutes(app: FastifyInstance, findFlight: FindFlight) {
  app.get<{ Params: { flightNumber: string } }>(
    '/flights/:flightNumber',
    async (request, reply) => {
      const flightNumber = normalizeFlightNumber(request.params.flightNumber);
      if (!flightNumber) {
        return reply
          .code(400)
          .send({ error: 'invalid_flight_number', message: 'Ugyldig flynummer' });
      }
      try {
        const { flight, fetchedAt, stale } = await findFlight(flightNumber);
        if (!flight) {
          return reply.code(404).send({ error: 'not_found', message: `Fant ikke ${flightNumber}` });
        }
        return { flight, fetchedAt: new Date(fetchedAt).toISOString(), stale };
      } catch {
        return reply
          .code(503)
          .send({ error: 'avinor_unavailable', message: 'Flydata er ikke tilgjengelig nå' });
      }
    },
  );
}
