import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import path from 'node:path';

const appDir = path.resolve(__dirname, '../app');

describe('Terminalkart', () => {
  it('merker stedene som demodata', async () => {
    await renderRouter(appDir, { initialUrl: '/map' });
    expect(screen.getByText(/Demodata/)).toBeOnTheScreen();
  });

  it('viser steder for valgt etasje', async () => {
    await renderRouter(appDir, { initialUrl: '/map' });

    expect(screen.getByText('Gate 1')).toBeOnTheScreen();
    expect(screen.queryByText('Bakeri')).not.toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('tab', { name: 'Etasje 1' }));

    expect(screen.getByText('Bakeri')).toBeOnTheScreen();
    expect(screen.queryByText('Gate 1')).not.toBeOnTheScreen();
    expect(screen.getByRole('tab', { name: 'Etasje 1' })).toBeSelected();
  });
});
