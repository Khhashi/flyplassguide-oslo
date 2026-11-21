import { router } from 'expo-router';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';
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

describe('Terminalkart – søk og filter', () => {
  it('filtrerer på kategori og viser melding når ingenting passer', async () => {
    await renderRouter(appDir, { initialUrl: '/map' });

    await fireEvent.press(screen.getByRole('button', { name: 'Toaletter' }));
    expect(screen.getByText('Toalett ved gate 1')).toBeOnTheScreen();
    expect(screen.queryByText('Kafé')).not.toBeOnTheScreen();

    await fireEvent.changeText(screen.getByLabelText('Søk etter sted'), 'finnes ikke');
    expect(screen.getByText('Fant ingen steder som passer søket.')).toBeOnTheScreen();
  });
});

describe('Terminalkart – fra snarvei', () => {
  it('åpner med toaletter valgt', async () => {
    await renderRouter(appDir, { initialUrl: '/map?kategori=toilet' });

    expect(screen.getByRole('button', { name: 'Toaletter' })).toBeSelected();
    expect(screen.queryByText('Kafé')).not.toBeOnTheScreen();
  });
});

describe('Terminalkart – rute', () => {
  it('viser rute til gaten uten oppdiktet gangtid', async () => {
    await renderRouter(appDir, { initialUrl: '/map' });

    expect(screen.getByRole('header', { name: 'Til gate A12' })).toBeOnTheScreen();
    expect(screen.getByText(/kommer når vi har et verifisert kart/)).toBeOnTheScreen();
  });
});

describe('Terminalkart – snarvei etter besøk', () => {
  it('velger kategorien selv om kartet er åpnet før', async () => {
    await renderRouter(appDir, { initialUrl: '/map' });
    expect(screen.getByRole('button', { name: 'Toaletter' })).not.toBeSelected();

    await act(() => router.push('/map?kategori=toilet'));

    expect(screen.getByRole('button', { name: 'Toaletter' })).toBeSelected();
  });
});
