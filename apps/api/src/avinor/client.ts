export const AVINOR_BASE_URL = 'https://asrv.avinor.no';

export type AvinorErrorKind = 'timeout' | 'http' | 'network';

/** Feil fra Avinor, med en type som gjør det lett å svare riktig til appen. */
export class AvinorError extends Error {
  constructor(
    readonly kind: AvinorErrorKind,
    message: string,
  ) {
    super(message);
    this.name = 'AvinorError';
  }
}

interface FetchDeparturesOptions {
  fetchImpl?: typeof fetch;
  baseUrl?: string;
  airport?: string;
  /** Hvor mange timer bakover og fremover vi henter (Avinor runder ned til hele timer). */
  hoursBack?: number;
  hoursAhead?: number;
  timeoutMs?: number;
}

/** Henter avganger fra Avinors XmlFeed som tekst. Avinor svarer i ISO-8859-1. */
export async function fetchDepartures({
  fetchImpl = fetch,
  baseUrl = AVINOR_BASE_URL,
  airport = 'OSL',
  hoursBack = 1,
  hoursAhead = 7,
  timeoutMs = 10_000,
}: FetchDeparturesOptions = {}): Promise<string> {
  // Parametere er case-sensitive hos Avinor.
  const params = new URLSearchParams({
    airport,
    direction: 'D',
    TimeFrom: String(hoursBack),
    TimeTo: String(hoursAhead),
  });
  const url = `${baseUrl}/XmlFeed/v1.0?${params.toString()}`;

  let response: Response;
  try {
    response = await fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs) });
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      throw new AvinorError('timeout', `Avinor svarte ikke innen ${timeoutMs} ms`);
    }
    throw new AvinorError('network', 'Kunne ikke nå Avinor');
  }

  if (!response.ok) {
    throw new AvinorError('http', `Avinor svarte med status ${response.status}`);
  }

  return new TextDecoder('latin1').decode(await response.arrayBuffer());
}
