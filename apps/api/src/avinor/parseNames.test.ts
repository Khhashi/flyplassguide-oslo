import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { parseNames } from './parseNames';

// Ekte oppføringer fra Avinor, hentet 21.11.2026.
const read = (file: string) => readFileSync(path.join(__dirname, '__fixtures__', file), 'utf8');

describe('parseNames', () => {
  it('leser navn på flyselskap', () => {
    const names = parseNames(read('flyselskap.xml'), 'airlineName');
    expect(names.get('DY')).toBe('Norwegian');
    expect(names.get('WF')).toBe('Widerøe');
  });

  it('leser navn på flyplasser', () => {
    const names = parseNames(read('flyplasser.xml'), 'airportName');
    expect(names.get('TRD')).toBe('Trondheim');
    expect(names.get('TOS')).toBe('Tromsø');
  });

  it('tåler tom liste og ugyldig XML', () => {
    expect(parseNames('<airlineNames/>', 'airlineName').size).toBe(0);
    expect(parseNames('', 'airportName').size).toBe(0);
  });
});
