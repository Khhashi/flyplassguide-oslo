import { DEMO_FLIGHT } from '@/data/demo-flight';

import { buildSteps } from '../buildSteps';

describe('buildSteps', () => {
  it('viser skranke, sikkerhetskontroll og gate', () => {
    expect(buildSteps(DEMO_FLIGHT)).toEqual([
      'Har du koffert? Følg skiltene mot innsjekking og lever den hos Eksempel Air, skranke 1–3. Bare håndbagasje? Gå videre.',
      'Gå gjennom sikkerhetskontrollen.',
      'Gå til gate A12.',
    ]);
  });

  it('gjetter ikke når skranke og gate mangler', () => {
    const steps = buildSteps({ ...DEMO_FLIGHT, checkIn: null, gate: null });
    expect(steps[0]).toMatch(/se på skjermene/);
    expect(steps[2]).toMatch(/ikke klar ennå/);
  });

  it('fungerer uten navn på flyselskapet', () => {
    expect(buildSteps({ ...DEMO_FLIGHT, airline: null })[0]).toMatch(/lever den, skranke 1–3/);
  });

  it('sier fra når flyet er innstilt', () => {
    expect(buildSteps({ ...DEMO_FLIGHT, status: 'cancelled' })).toHaveLength(1);
  });
});
