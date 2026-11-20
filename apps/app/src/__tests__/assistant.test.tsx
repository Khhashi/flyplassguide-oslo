import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import path from 'node:path';

const appDir = path.resolve(__dirname, '../app');

describe('AI-assistent', () => {
  it('viser spørsmålet og svarer ærlig at den ikke er koblet til', async () => {
    await renderRouter(appDir, { initialUrl: '/assistant' });

    await fireEvent.changeText(screen.getByLabelText('Spørsmål'), 'Hvor er gate 12?');
    await fireEvent.press(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getByText('Hvor er gate 12?')).toBeOnTheScreen();
    expect(screen.getByText(/ikke koblet til fly- eller kartdata/)).toBeOnTheScreen();
    expect(screen.getByLabelText('Spørsmål')).toHaveDisplayValue('');
  });

  it('sender ikke tomme meldinger', async () => {
    await renderRouter(appDir, { initialUrl: '/assistant' });

    await fireEvent.press(screen.getByRole('button', { name: 'Send' }));

    expect(screen.queryByText(/ikke koblet til/)).not.toBeOnTheScreen();
  });
});
