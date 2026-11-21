import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import path from 'node:path';

const appDir = path.resolve(__dirname, '../app');

describe('Navigasjon', () => {
  it('viser hjemskjermen med hilsen og flysøk', async () => {
    await renderRouter(appDir, { initialUrl: '/' });

    expect(screen.getByText('FlyGuide')).toBeOnTheScreen();
    expect(screen.getByText('God tur!')).toBeOnTheScreen();
    expect(screen.getByText('Ditt neste fly')).toBeOnTheScreen();
    expect(screen.getByText('45 min')).toBeOnTheScreen();
    expect(screen.getByLabelText('Flynummer')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Trenger du hjelp?' })).toBeOnTheScreen();
  });

  it('søk etter flynummer åpner Mitt fly uten å vise oppdiktede data', async () => {
    await renderRouter(appDir, { initialUrl: '/' });

    await fireEvent.changeText(screen.getByLabelText('Flynummer'), 'dy 123');
    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));

    expect(screen).toHavePathname('/my-flight');
    expect(screen).toHaveSearchParams({ flight: 'DY123' });
    expect(screen.getByText('DY123')).toBeOnTheScreen();
    expect(screen.getByText(/ikke ekte flyinformasjon/)).toBeOnTheScreen();
  });

  it('har fire faner: Hjem, Kart, Fly og AI-guide', async () => {
    await renderRouter(appDir, { initialUrl: '/' });

    const tabNames = screen
      .getAllByRole('button')
      .map((element) => String(element.props.accessibilityLabel ?? ''))
      .filter((label) => label.includes('tab'));

    expect(tabNames).toHaveLength(4);
    ['Hjem', 'Kart', 'Fly', 'AI-guide'].forEach((name, index) => {
      expect(tabNames[index]).toMatch(new RegExp(`^${name},`));
    });
  });
});
