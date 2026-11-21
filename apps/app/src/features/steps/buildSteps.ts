import type { Flight } from '@flyplassguide/shared';

/** Lager en enkel liste med steg fra døren til gaten. Ukjente steg sier rett ut at vi ikke vet. */
export function buildSteps(flight: Flight): string[] {
  if (flight.status === 'cancelled') {
    return ['Flyet ditt er innstilt. Kontakt flyselskapet.'];
  }
  return [
    // Mange har bare håndbagasje, så steget sier hva begge skal gjøre.
    flight.checkIn
      ? `Har du koffert? Lever den ved skranke ${flight.checkIn.replace('-', '–')}. Bare håndbagasje? Gå videre.`
      : 'Har du koffert? Se på skjermene hvor du leverer den. Bare håndbagasje? Gå videre.',
    'Gå gjennom sikkerhetskontrollen.',
    flight.gate ? `Gå til gate ${flight.gate}.` : 'Gaten er ikke klar ennå. Vent ved skjermene.',
  ];
}
