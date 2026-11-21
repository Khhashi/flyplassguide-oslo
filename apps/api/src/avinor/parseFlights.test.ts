import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { parseFlights } from './parseFlights';

// Ekte avganger fra Gardermoen, hentet fra Avinor 20.11.2026.
const xml = readFileSync(path.join(__dirname, '__fixtures__/osl-avganger.xml'), 'utf8');

describe('parseFlights', () => {
  const flights = parseFlights(xml);
  const byNumber = (flightNumber: string) => flights.find((f) => f.flightNumber === flightNumber);

  it('leser alle avgangene', () => {
    expect(flights.map((f) => f.flightNumber)).toEqual([
      'DY758',
      'SK839',
      'DY538',
      'WF148',
      'DY1642',
    ]);
  });

  it('leser gate, destinasjon og ny tid', () => {
    expect(byNumber('SK839')).toMatchObject({
      airline: 'SK',
      destination: 'CDG',
      gate: 'E9',
      checkIn: '4-7',
      status: 'new_time',
      scheduledDeparture: '2026-11-20T14:55:00.000Z',
      updatedDeparture: '2026-11-20T15:35:00.000Z',
      source: 'verified',
    });
  });

  it('setter gate til null når Avinor ikke har gate, i stedet for å gjette', () => {
    expect(byNumber('DY758')?.gate).toBeNull();
  });

  it('har aldri boardingtid, fordi Avinor ikke leverer det', () => {
    expect(flights.every((f) => f.boardingTime === null)).toBe(true);
  });

  it('oversetter avreist og bruker tidspunktet for siste oppdatering', () => {
    expect(byNumber('DY538')).toMatchObject({ status: 'departed', updatedDeparture: null });
    expect(byNumber('DY538')?.lastUpdated).toBe('2026-11-20T15:22:50.953Z');
  });

  it('oversetter innstilte fly og fly uten status', () => {
    const constructed = `<airport name="OSL"><flights lastUpdate="2026-11-20T10:00:00Z">
      <flight><airline>SK</airline><flight_id>SK1</flight_id><schedule_time>2026-11-20T12:00:00Z</schedule_time><airport>BGO</airport><status code="C" time="2026-11-20T09:00:00Z"/></flight>
      <flight><airline>SK</airline><flight_id>SK2</flight_id><schedule_time>2026-11-20T12:00:00Z</schedule_time><airport>BGO</airport></flight>
    </flights></airport>`;
    expect(parseFlights(constructed).map((f) => f.status)).toEqual(['cancelled', 'scheduled']);
  });

  it('hopper over fly med ugyldige data og tåler tomt svar', () => {
    const broken = `<airport name="OSL"><flights lastUpdate="2026-11-20T10:00:00Z">
      <flight><flight_id>SK3</flight_id><schedule_time>ukjent</schedule_time></flight>
    </flights></airport>`;
    expect(parseFlights(broken)).toEqual([]);
    expect(parseFlights('')).toEqual([]);
  });
});
