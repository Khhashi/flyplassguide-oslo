import { fireEvent, render, screen } from '@testing-library/react-native';

import * as Speech from 'expo-speech';

import { StepByStep } from '../StepByStep';

jest.mock('expo-speech', () => ({ speak: jest.fn(), stop: jest.fn() }));

const steps = ['Lever bagasjen.', 'Gå gjennom sikkerhetskontrollen.', 'Gå til gate A12.'];

describe('StepByStep', () => {
  it('viser ett steg om gangen og går frem og tilbake', async () => {
    await render(<StepByStep steps={steps} />);
    expect(screen.getByText('Steg 1 av 3')).toBeOnTheScreen();
    expect(screen.queryByText('Gå til gate A12.')).not.toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('button', { name: 'Neste steg' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Neste steg' }));
    expect(screen.getByText('Gå til gate A12.')).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Neste steg' })).not.toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('button', { name: 'Tilbake' }));
    expect(screen.getByText('Steg 2 av 3')).toBeOnTheScreen();
  });

  it('leser opp steget som vises', async () => {
    await render(<StepByStep steps={steps} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Neste steg' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Les opp' }));

    expect(Speech.speak).toHaveBeenCalledWith('Gå gjennom sikkerhetskontrollen.', {
      language: 'nb-NO',
    });
  });
});
