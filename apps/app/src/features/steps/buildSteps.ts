import type { Flight } from '@flyplassguide/shared';

/** Lager en enkel liste med steg fra døren til gaten. Ukjente steg sier rett ut at vi ikke vet. */
export function buildSteps(flight: Flight): string[] {
  if (flight.status === 'cancelled') {
    return ['Flyet ditt er innstilt. Kontakt flyselskapet.'];
  }
  return [
    // Mange har bare håndbagasje, så steget sier hva begge skal gjøre.
    // Flyselskapets navn er lettere å kjenne igjen på skiltene enn et nummer.
    flight.checkIn
      ? `Har du koffert? Følg skiltene mot innsjekking og lever den${flight.airline ? ` hos ${flight.airline}` : ''}, skranke ${flight.checkIn.replace('-', '–')}. Bare håndbagasje? Gå videre.`
      : 'Har du koffert? Følg skiltene mot innsjekking og se på skjermene hvor du leverer den. Bare håndbagasje? Gå videre.',
    'Gå gjennom sikkerhetskontrollen.',
    flight.gate ? `Gå til gate ${flight.gate}.` : 'Gaten er ikke klar ennå. Vent ved skjermene.',
  ];
}
