import { render, screen } from '@testing-library/react-native';

import { DEMO_FLIGHT } from '@/data/demo-flight';

import { FlightStatus } from '../FlightStatus';
import * as hook from '../useFlight';

jest.mock('expo-speech', () => ({ speak: jest.fn(), stop: jest.fn() }));
const verified = { ...DEMO_FLIGHT, source: 'verified' as const };
const show = (value: ReturnType<typeof hook.useFlight>) =>
  jest.spyOn(hook, 'useFlight').mockReturnValue(value);

describe('FlightStatus', () => {
  it('viser at vi henter', async () => {
    show(null);
    await render(<FlightStatus flightNumber="XX123" />);
    expect(screen.getByText('Henter flyet ditt …')).toBeOnTheScreen();
  });

  it('viser steg, gate og kilde for et ekte fly', async () => {
    show({ kind: 'found', flight: verified, fetchedAt: '2026-11-21T12:00:00.000Z', stale: false });
    await render(<FlightStatus flightNumber="XX123" />);
    expect(screen.getByText('A12')).toBeOnTheScreen();
    expect(screen.getByRole('link', { name: 'Flydata fra Avinor' })).toBeOnTheScreen();
    expect(screen.queryByText(/Demodata/)).not.toBeOnTheScreen();
  });

  it('sier fra når data kan være utdatert', async () => {
    show({ kind: 'found', flight: verified, fetchedAt: '2026-11-21T12:00:00.000Z', stale: true });
    await render(<FlightStatus flightNumber="XX123" />);
    expect(screen.getByText(/kan være utdatert/)).toBeOnTheScreen();
  });

  it('sier fra når flyet ikke finnes eller serveren er nede', async () => {
    show({ kind: 'not_found' });
    await render(<FlightStatus flightNumber="XX999" />);
    expect(screen.getByText('Fant ikke XX999')).toBeOnTheScreen();

    show({ kind: 'error' });
    await render(<FlightStatus flightNumber="XX123" />);
    expect(screen.getByText('Får ikke hentet flydata nå')).toBeOnTheScreen();
  });
});
