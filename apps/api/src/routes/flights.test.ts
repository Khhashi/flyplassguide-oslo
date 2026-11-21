import type { Flight } from '@flyplassguide/shared';
import { describe, expect, it, vi } from 'vitest';

import { buildApp } from '../app';

const flight = { flightNumber: 'SK839', gate: 'E9', source: 'verified' } as Flight;
const config = { NODE_ENV: 'test', CORS_ORIGINS: '' } as const;

describe('GET /flights/:flightNumber', () => {
  it('gir flyet med tidspunkt for henting', async () => {
    const findFlight = vi.fn(async () => ({ flight, fetchedAt: 0, stale: false }));
    const res = await buildApp(config, { findFlight }).inject('/flights/sk%20839');

    expect(findFlight).toHaveBeenCalledWith('SK839');
    expect(res.json()).toEqual({ flight, fetchedAt: '1970-01-01T00:00:00.000Z', stale: false });
  });

  it('gir 404 når flyet ikke finnes', async () => {
    const findFlight = async () => ({ flight: null, fetchedAt: 0, stale: false });
    const res = await buildApp(config, { findFlight }).inject('/flights/DY999');
    expect(res.statusCode).toBe(404);
  });

  it('gir 400 for ugyldig flynummer', async () => {
    const res = await buildApp(config, { findFlight: vi.fn() }).inject('/flights/hei');
    expect(res.statusCode).toBe(400);
  });

  it('gir 503 når Avinor er nede', async () => {
    const findFlight = async () => Promise.reject(new Error('nede'));
    const res = await buildApp(config, { findFlight }).inject('/flights/SK839');
    expect(res.statusCode).toBe(503);
  });
});
