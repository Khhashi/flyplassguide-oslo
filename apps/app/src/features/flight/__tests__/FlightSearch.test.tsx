import { fireEvent, render, screen } from '@testing-library/react-native';

import { FlightSearch } from '../FlightSearch';

describe('FlightSearch', () => {
  it('ber om flynummer når feltet er tomt', async () => {
    const onSearch = jest.fn();
    await render(<FlightSearch onSearch={onSearch} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));

    expect(screen.getByText('Skriv inn flynummeret ditt først.')).toBeOnTheScreen();
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('viser feilmelding for ugyldig flynummer', async () => {
    const onSearch = jest.fn();
    await render(<FlightSearch onSearch={onSearch} />);

    await fireEvent.changeText(screen.getByLabelText('Flynummer'), 'hei');
    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));

    expect(screen.getByRole('alert')).toHaveTextContent(/gyldig flynummer/);
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('sender normalisert flynummer videre', async () => {
    const onSearch = jest.fn();
    await render(<FlightSearch onSearch={onSearch} />);

    await fireEvent.changeText(screen.getByLabelText('Flynummer'), ' dy 123 ');
    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));

    expect(onSearch).toHaveBeenCalledWith('DY123');
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });

  it('fjerner feilmeldingen når brukeren skriver på nytt', async () => {
    await render(<FlightSearch onSearch={jest.fn()} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));
    expect(screen.getByRole('alert')).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByLabelText('Flynummer'), 'S');
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });
});
