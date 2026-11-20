import { describe, expect, it } from 'vitest';

import { loadConfig } from './config';

describe('loadConfig', () => {
  it('bruker fornuftige standardverdier', () => {
    expect(loadConfig({})).toEqual({
      NODE_ENV: 'development',
      HOST: '0.0.0.0',
      PORT: 3000,
      CORS_ORIGINS: 'http://localhost:8081',
    });
  });

  it('leser port som tall', () => {
    expect(loadConfig({ PORT: '4000' }).PORT).toBe(4000);
  });

  it('gir lesbar feil ved ugyldig port', () => {
    expect(() => loadConfig({ PORT: 'abc' })).toThrow(/Ugyldig konfigurasjon: PORT/);
  });
});
