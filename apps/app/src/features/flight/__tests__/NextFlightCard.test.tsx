import { render, screen } from '@testing-library/react-native';

import { DEMO_FLIGHT } from '@/data/demo-flight';

import { NextFlightCard, minutesToDeparture } from '../NextFlightCard';

// DEMO_FLIGHT har ny avgangstid 15:50 UTC.
const now = new Date('2026-11-20T15:22:00Z');

describe('NextFlightCard', () => {
  it('teller ned til ny avgangstid', () => {
    expect(minutesToDeparture(DEMO_FLIGHT, now)).toBe(28);
    expect(minutesToDeparture(DEMO_FLIGHT, new Date('2026-11-20T18:00:00Z'))).toBe(0);
  });

  it('viser destinasjon, gate og minutter til avgang, merket som demodata', async () => {
    await render(<NextFlightCard flight={DEMO_FLIGHT} now={now} />);

    expect(screen.getByText('OSL → Bergen')).toBeOnTheScreen();
    expect(screen.getByText(/Gate A12/)).toBeOnTheScreen();
    expect(screen.getByText('28 min')).toBeOnTheScreen();
    expect(screen.getByText(/Demodata/)).toBeOnTheScreen();
  });
});
