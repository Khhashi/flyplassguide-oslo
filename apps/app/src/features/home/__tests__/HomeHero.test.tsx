import { fireEvent, render, screen } from '@testing-library/react-native';

import { HomeHero } from '../HomeHero';

describe('HomeHero', () => {
  it('hilser og lar deg søke etter flyet ditt', async () => {
    const onSearch = jest.fn();
    await render(<HomeHero onSearch={onSearch} />);

    expect(screen.getByRole('header', { name: 'God tur!' })).toBeOnTheScreen();
    expect(screen.getByText('Oslo lufthavn · Gardermoen (OSL)')).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByLabelText('Flynummer'), 'dy 123');
    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));
    expect(onSearch).toHaveBeenCalledWith('DY123');
  });
});
