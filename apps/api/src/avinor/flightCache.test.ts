import type { Flight } from '@flyplassguide/shared';
import { describe, expect, it, vi } from 'vitest';

import { AVINOR_MAX_AGE_MS, createFlightCache } from './flightCache';

const flight = (flightNumber: string): Flight => ({
  flightNumber,
  airline: 'SK',
  destination: 'BGO',
  scheduledDeparture: '2026-11-20T15:00:00.000Z',
  updatedDeparture: null,
  gate: 'A10',
  checkIn: null,
  boardingTime: null,
  status: 'scheduled',
  lastUpdated: '2026-11-20T14:00:00.000Z',
  source: 'verified',
});

function setup() {
  let time = 0;
  const load = vi.fn(async () => [flight('SK123')]);
  const cache = createFlightCache({ load, now: () => time });
  return { cache, load, tick: (ms: number) => (time += ms) };
}

describe('createFlightCache', () => {
  it('spør ikke Avinor igjen før det har gått 3 minutter', async () => {
    const { cache, load, tick } = setup();

    await cache.getSnapshot();
    tick(AVINOR_MAX_AGE_MS - 1);
    await cache.getSnapshot();
    expect(load).toHaveBeenCalledTimes(1);

    tick(1);
    await cache.getSnapshot();
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('lar samtidige forespørsler dele én henting', async () => {
    const { cache, load } = setup();

    await Promise.all([cache.getSnapshot(), cache.getSnapshot(), cache.getSnapshot()]);

    expect(load).toHaveBeenCalledTimes(1);
  });

  it('svarer med forrige data, merket som utdatert, når Avinor feiler', async () => {
    const { cache, load, tick } = setup();
    await cache.getSnapshot();

    load.mockRejectedValueOnce(new Error('Avinor nede'));
    tick(AVINOR_MAX_AGE_MS);

    const snapshot = await cache.getSnapshot();
    expect(snapshot.stale).toBe(true);
    expect(snapshot.flights).toHaveLength(1);
  });

  it('sender feilen videre når vi ikke har noen data fra før', async () => {
    const { cache, load } = setup();
    load.mockRejectedValueOnce(new Error('Avinor nede'));

    await expect(cache.getSnapshot()).rejects.toThrow('Avinor nede');
  });

  it('finner ett fly, eller null hvis det ikke finnes', async () => {
    const { cache } = setup();

    expect((await cache.findFlight('SK123')).flight?.gate).toBe('A10');
    expect((await cache.findFlight('DY999')).flight).toBeNull();
  });
});
