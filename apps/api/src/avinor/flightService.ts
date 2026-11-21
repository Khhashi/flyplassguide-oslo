import { fetchDepartures, fetchNames } from './client';
import { createFlightCache } from './flightCache';
import { parseFlights } from './parseFlights';
import { parseNames } from './parseNames';
import { withNames } from './withNames';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/** Setter sammen henting, tolking, navn og mellomlager til én tjeneste for serveren. */
export function createFlightService({ fetchImpl = fetch, now = Date.now } = {}) {
  let names = {
    airlines: new Map<string, string>(),
    airports: new Map<string, string>(),
    at: -Infinity,
  };

  async function getNames() {
    if (now() - names.at < ONE_DAY_MS) return names;
    try {
      const [airlines, airports] = await Promise.all([
        fetchNames('airlineNames', { fetchImpl }).then((xml) => parseNames(xml, 'airlineName')),
        fetchNames('airportNames', { fetchImpl }).then((xml) => parseNames(xml, 'airportName')),
      ]);
      names = { airlines, airports, at: now() };
    } catch {
      // Uten navn viser vi kodene, som før. Vi prøver igjen neste gang.
    }
    return names;
  }

  return createFlightCache({
    now,
    load: async () => {
      const flights = parseFlights(await fetchDepartures({ fetchImpl }));
      const { airlines, airports } = await getNames();
      return withNames(flights, airlines, airports);
    },
  });
}
