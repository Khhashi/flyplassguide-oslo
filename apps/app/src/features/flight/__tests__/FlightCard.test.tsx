import type { Flight } from '@airportguide/shared';
import { render, screen } from '@testing-library/react-native';

import { FlightCard } from '../FlightCard';

const flight: Flight = {
  flightNumber: 'XX123',
  airline: 'Eksempel Air',
  destination: 'Bergen',
  scheduledDeparture: '2026-11-20T15:30:00Z',
  updatedDeparture: '2026-11-20T15:50:00Z',
  gate: 'A12',
  boardingTime: null,
  status: 'new_time',
  lastUpdated: '2026-11-20T14:02:00Z',
  source: 'demo',
};

describe('FlightCard', () => {
  it('viser flyinformasjon og ny avgangstid', async () => {
    await render(<FlightCard flight={flight} />);

    expect(screen.getByText('XX123')).toBeOnTheScreen();
    expect(screen.getByText('Eksempel Air · til Bergen')).toBeOnTheScreen();
    expect(screen.getByText('A12')).toBeOnTheScreen();
    expect(screen.getByText('16:30')).toBeOnTheScreen();
    expect(screen.getByText('16:50')).toBeOnTheScreen();
    expect(screen.getByText('Ny tid')).toBeOnTheScreen();
  });

  it('viser «Ikke tilgjengelig» i stedet for å gjette', async () => {
    await render(<FlightCard flight={{ ...flight, gate: null }} />);

    expect(screen.getAllByText('Ikke tilgjengelig')).toHaveLength(2);
  });

  it('merker demodata tydelig', async () => {
    await render(<FlightCard flight={flight} />);
    expect(screen.getByText(/Demodata/)).toBeOnTheScreen();
  });

  it('viser ingen demomerking for verifiserte data', async () => {
    await render(<FlightCard flight={{ ...flight, source: 'verified' }} />);
    expect(screen.queryByText(/Demodata/)).not.toBeOnTheScreen();
  });
});
