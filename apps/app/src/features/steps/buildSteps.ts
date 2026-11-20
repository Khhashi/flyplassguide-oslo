import type { Flight } from '@flyplassguide/shared';

/** Lager en enkel liste med steg fra døren til gaten. Ukjente steg sier rett ut at vi ikke vet. */
export function buildSteps(flight: Flight): string[] {
  if (flight.status === 'cancelled') {
    return ['Flyet ditt er innstilt. Kontakt flyselskapet.'];
  }
  return [
    flight.checkIn
      ? `Lever bagasjen ved skranke ${flight.checkIn.replace('-', '–')}.`
      : 'Se på skjermene hvor du leverer bagasjen.',
    'Gå gjennom sikkerhetskontrollen.',
    flight.gate ? `Gå til gate ${flight.gate}.` : 'Gaten er ikke klar ennå. Vent ved skjermene.',
  ];
}
