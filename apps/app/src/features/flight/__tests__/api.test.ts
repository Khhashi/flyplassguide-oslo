import { DEMO_FLIGHT } from '@/data/demo-flight';

import { fetchFlight } from '../api';

const ok = (body: unknown, status = 200) =>
  jest.fn(async () => new Response(JSON.stringify(body), { status }));
const verified = { ...DEMO_FLIGHT, source: 'verified' as const };

describe('fetchFlight', () => {
  it('gir flyet når serveren finner det', async () => {
    const fetchImpl = ok({ flight: verified, fetchedAt: '2026-11-21T12:00:00.000Z', stale: false });
    await expect(fetchFlight('XX123', fetchImpl)).resolves.toMatchObject({
      kind: 'found',
      flight: { gate: 'A12' },
    });
    expect(fetchImpl).toHaveBeenCalledWith('http://localhost:3000/flights/XX123');
  });

  it('sier fra når flyet ikke finnes', async () => {
    await expect(fetchFlight('XX999', ok({}, 404))).resolves.toEqual({ kind: 'not_found' });
  });

  it('gir feil når serveren er nede eller svarer med noe ugyldig', async () => {
    await expect(fetchFlight('XX123', ok({}, 503))).resolves.toEqual({ kind: 'error' });
    await expect(fetchFlight('XX123', ok({ flight: { gate: 'A1' } }))).resolves.toEqual({
      kind: 'error',
    });
    const offline = jest.fn(async () => Promise.reject(new TypeError('Network request failed')));
    await expect(fetchFlight('XX123', offline)).resolves.toEqual({ kind: 'error' });
  });
});
