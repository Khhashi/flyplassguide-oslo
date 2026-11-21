import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import { createFlightService } from './flightService';

const fixture = (file: string) => readFileSync(path.join(__dirname, '__fixtures__', file), 'utf8');

function fakeAvinor(namesFail = false) {
  return vi.fn(async (url: string | URL | Request) => {
    const u = String(url);
    if (u.includes('Names') && namesFail) return new Response('nede', { status: 503 });
    if (u.includes('airlineNames')) return new Response(fixture('flyselskap.xml'));
    if (u.includes('airportNames')) return new Response(fixture('flyplasser.xml'));
    return new Response(fixture('osl-avganger.xml'));
  });
}

describe('createFlightService', () => {
  it('gir ekte fly med navn på flyselskap og destinasjon', async () => {
    const { flight } = await createFlightService({ fetchImpl: fakeAvinor() }).findFlight('DY758');
    expect(flight).toMatchObject({
      airline: 'Norwegian',
      destination: 'Trondheim',
      source: 'verified',
    });
  });

  it('viser kodene når navnelistene ikke kan hentes', async () => {
    const { flight } = await createFlightService({ fetchImpl: fakeAvinor(true) }).findFlight(
      'DY758',
    );
    expect(flight).toMatchObject({ airline: 'DY', destination: 'TRD' });
  });
});
