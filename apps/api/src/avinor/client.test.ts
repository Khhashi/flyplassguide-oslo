import { describe, expect, it, vi } from 'vitest';

import { AvinorError, fetchDepartures } from './client';

function latin1(text: string): ArrayBuffer {
  return Uint8Array.from(text, (char) => char.charCodeAt(0)).buffer;
}

describe('fetchDepartures', () => {
  it('spør etter avganger fra OSL med riktige parametere', async () => {
    const fetchImpl = vi.fn(async () => new Response(latin1('<airport/>')));

    await fetchDepartures({ fetchImpl, hoursBack: 1, hoursAhead: 7 });

    const [url] = fetchImpl.mock.calls[0] as unknown as [string];
    expect(url).toBe(
      'https://asrv.avinor.no/XmlFeed/v1.0?airport=OSL&direction=D&TimeFrom=1&TimeTo=7',
    );
  });

  it('leser norske tegn riktig fra ISO-8859-1', async () => {
    const fetchImpl = vi.fn(async () => new Response(latin1('<airport name="Tromsø"/>')));

    await expect(fetchDepartures({ fetchImpl })).resolves.toBe('<airport name="Tromsø"/>');
  });

  it('gir http-feil når Avinor svarer med feilstatus', async () => {
    const fetchImpl = vi.fn(async () => new Response('nede', { status: 503 }));

    await expect(fetchDepartures({ fetchImpl })).rejects.toMatchObject({
      kind: 'http',
      message: 'Avinor svarte med status 503',
    });
  });

  it('gir tidsavbrudd når Avinor bruker for lang tid', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new DOMException('timeout', 'TimeoutError');
    });

    await expect(fetchDepartures({ fetchImpl, timeoutMs: 50 })).rejects.toMatchObject({
      kind: 'timeout',
    });
  });

  it('gir nettverksfeil når Avinor ikke kan nås', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('fetch failed');
    });

    const error = await fetchDepartures({ fetchImpl }).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(AvinorError);
    expect(error).toMatchObject({ kind: 'network' });
  });
});
