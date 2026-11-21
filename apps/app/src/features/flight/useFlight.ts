import { useEffect, useState } from 'react';

import { fetchFlight, type FlightResult } from './api';

/** Henter flyet når flynummeret endres. `null` betyr at vi venter på svar. */
export function useFlight(flightNumber: string | undefined): FlightResult | null {
  const [result, setResult] = useState<{ for: string; value: FlightResult } | null>(null);

  useEffect(() => {
    if (!flightNumber) return;
    let active = true;
    void fetchFlight(flightNumber).then((value) => {
      if (active) setResult({ for: flightNumber, value });
    });
    return () => {
      active = false;
    };
  }, [flightNumber]);

  return result && result.for === flightNumber ? result.value : null;
}
