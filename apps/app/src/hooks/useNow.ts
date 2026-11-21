import { useEffect, useState } from 'react';

/** Gir tiden nå, oppdatert hvert halve minutt, så nedtellinger holder seg riktige. */
export function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
