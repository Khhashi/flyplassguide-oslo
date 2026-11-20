import { afterEach, describe, expect, it } from 'vitest';

import { buildApp } from './app';

const testConfig = { NODE_ENV: 'test', CORS_ORIGINS: 'http://localhost:8081' } as const;

describe('API', () => {
  let app: ReturnType<typeof buildApp> | undefined;

  afterEach(async () => {
    await app?.close();
  });

  it('svarer ok på /health', async () => {
    app = buildApp(testConfig);
    const response = await app.inject({ method: 'GET', url: '/health' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ status: 'ok' });
  });

  it('gir lesbar 404 for ukjente adresser', async () => {
    app = buildApp(testConfig);
    const response = await app.inject({ method: 'GET', url: '/finnes-ikke' });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ error: 'not_found', message: 'Fant ikke /finnes-ikke' });
  });

  it('tillater CORS kun for godkjente origins', async () => {
    app = buildApp(testConfig);

    const allowed = await app.inject({
      method: 'GET',
      url: '/health',
      headers: { origin: 'http://localhost:8081' },
    });
    const blocked = await app.inject({
      method: 'GET',
      url: '/health',
      headers: { origin: 'https://ondsinnet.example' },
    });

    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:8081');
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined();
  });
});
