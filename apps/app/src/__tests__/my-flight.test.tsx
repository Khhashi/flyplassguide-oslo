import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import path from 'node:path';

const appDir = path.resolve(__dirname, '../app');

describe('Mitt fly', () => {
  it('viser ingen oppdiktet tid eller gate for et søkt fly', async () => {
    await renderRouter(appDir, { initialUrl: '/my-flight?flight=DY123' });

    expect(screen.getByText('DY123')).toBeOnTheScreen();
    expect(screen.getByText(/ikke ekte flyinformasjon/)).toBeOnTheScreen();
    expect(screen.queryByText('Gate')).not.toBeOnTheScreen();
  });

  it('viser et tydelig merket eksempel når brukeren ber om det', async () => {
    await renderRouter(appDir, { initialUrl: '/my-flight' });

    await fireEvent.press(screen.getByRole('button', { name: 'Se et eksempel' }));

    expect(screen.getByText('XX123')).toBeOnTheScreen();
    expect(screen.getAllByText(/Demodata/)).toHaveLength(2);
    expect(
      screen.getByText('Har du koffert? Lever den ved skranke 1–3. Bare håndbagasje? Gå videre.'),
    ).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('button', { name: 'Skjul eksempel' }));
    expect(screen.queryByText('XX123')).not.toBeOnTheScreen();
  });
});
