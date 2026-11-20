import { DEMO_FLIGHT } from '@/data/demo-flight';

import { buildSteps } from '../buildSteps';

describe('buildSteps', () => {
  it('viser skranke, sikkerhetskontroll og gate', () => {
    expect(buildSteps(DEMO_FLIGHT)).toEqual([
      'Lever bagasjen ved skranke 1–3.',
      'Gå gjennom sikkerhetskontrollen.',
      'Gå til gate A12.',
    ]);
  });

  it('gjetter ikke når skranke og gate mangler', () => {
    const steps = buildSteps({ ...DEMO_FLIGHT, checkIn: null, gate: null });
    expect(steps[0]).toMatch(/Se på skjermene/);
    expect(steps[2]).toMatch(/ikke klar ennå/);
  });

  it('sier fra når flyet er innstilt', () => {
    expect(buildSteps({ ...DEMO_FLIGHT, status: 'cancelled' })).toHaveLength(1);
  });
});
